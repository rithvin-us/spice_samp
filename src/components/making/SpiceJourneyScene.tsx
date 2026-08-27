import { useLayoutEffect, useMemo, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { buildFormations, STAGE_COUNT } from './stageFormations';
import { buildSpiceTypes, radialShadowTexture, type SpiceType } from './spiceGeometry';
import { dprCap } from '../../lib/performance';
import type { CapabilityTier } from '../../types';

/**
 * One continuous body of spice, changing state across the seven stages.
 *
 * This is the only WebGL scene on the homepage. It earns the place because the
 * thing being described — separate ingredients gradually stopping being
 * separate — is a transformation, and a transformation is the one thing a row
 * of static images cannot show.
 *
 * Every spice is a real lit mesh rather than a flat sprite: instanced geometry
 * with its own silhouette, tumbling on its own axis, shaded by a warm key light
 * over a soft ground shadow. Flat coloured dots read as confetti no matter how
 * carefully they are placed.
 *
 * Progress arrives through a ref and is read inside useFrame, so scrolling
 * never re-renders React.
 */

/** Instances of each of the six spices. */
const PER_TYPE = { high: 150, low: 68 };

interface BodyProps {
  count: number;
  progressRef: React.MutableRefObject<number>;
  detailed: boolean;
}

function SpiceBody({ count, progressRef, detailed }: BodyProps) {
  const types = useMemo<SpiceType[]>(() => buildSpiceTypes(), []);
  const formations = useMemo(() => buildFormations(count), [count]);
  const meshRefs = useRef<(THREE.InstancedMesh | null)[]>([]);

  /**
   * Which global particles belong to each spice, plus a stable resting rotation
   * and tumble rate per instance. Computed once — the render loop only reads.
   */
  const groups = useMemo(() => {
    return types.map((_, t) => {
      const indices: number[] = [];
      for (let i = t; i < count; i += types.length) indices.push(i);
      const rotation = new Float32Array(indices.length * 3);
      const spin = new Float32Array(indices.length);
      for (let j = 0; j < indices.length; j++) {
        const seed = indices[j] * 0.7351;
        rotation[j * 3] = Math.sin(seed) * Math.PI;
        rotation[j * 3 + 1] = Math.cos(seed * 1.7) * Math.PI;
        rotation[j * 3 + 2] = Math.sin(seed * 2.3) * Math.PI;
        spin[j] = 0.08 + Math.abs(Math.sin(seed * 3.1)) * 0.22;
      }
      return { indices: Int32Array.from(indices), rotation, spin };
    });
  }, [types, count]);

  // Scratch objects, reused every frame so the loop allocates nothing.
  const scratch = useMemo(
    () => ({
      dummy: new THREE.Object3D(),
      from: new THREE.Color(),
      to: new THREE.Color(),
    }),
    []
  );

  /** Colours only change with progress, so seed them once up front. */
  useLayoutEffect(() => {
    meshRefs.current.forEach((mesh, t) => {
      if (!mesh) return;
      const { indices } = groups[t];
      const base = new THREE.Color(types[t].colour);
      for (let j = 0; j < indices.length; j++) mesh.setColorAt(j, base);
      if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true;
    });
  }, [groups, types]);

  useFrame((state) => {
    const span = STAGE_COUNT - 1;
    const raw = THREE.MathUtils.clamp(progressRef.current, 0, 1) * span;
    const index = Math.min(span - 1, Math.floor(raw));
    const local = raw - index;
    // Smoothstep so each stage settles before giving way to the next.
    const t = local * local * (3 - 2 * local);

    const from = formations[index];
    const to = formations[index + 1];
    const time = state.clock.elapsedTime;
    const { dummy } = scratch;

    for (let ti = 0; ti < types.length; ti++) {
      const mesh = meshRefs.current[ti];
      if (!mesh) continue;
      const { indices, rotation, spin } = groups[ti];
      const ratio = types[ti].ratio;

      for (let j = 0; j < indices.length; j++) {
        const gi = indices[j];
        const g3 = gi * 3;

        // Position: lerp between the two neighbouring stage formations, with a
        // slow uneven drift so the body stays alive while the page is still.
        const drift = Math.sin(time * 0.4 + gi * 0.37) * 0.016;
        dummy.position.set(
          from.positions[g3] + (to.positions[g3] - from.positions[g3]) * t,
          from.positions[g3 + 1] + (to.positions[g3 + 1] - from.positions[g3 + 1]) * t + drift,
          from.positions[g3 + 2] + (to.positions[g3 + 2] - from.positions[g3 + 2]) * t
        );

        // Each seed tumbles on its own axis, slowly.
        const turn = time * spin[j] * 0.35;
        dummy.rotation.set(
          rotation[j * 3] + turn,
          rotation[j * 3 + 1] + turn * 0.7,
          rotation[j * 3 + 2]
        );

        const s = (from.scales[gi] + (to.scales[gi] - from.scales[gi]) * t) * 0.115;
        dummy.scale.set(ratio.x * s, ratio.y * s, ratio.z * s);

        dummy.updateMatrix();
        mesh.setMatrixAt(j, dummy.matrix);

        // Colour: raw spice → roasted → blended masala, carried by the
        // formations rather than by the material.
        scratch.from.setRGB(from.colours[g3], from.colours[g3 + 1], from.colours[g3 + 2]);
        scratch.to.setRGB(to.colours[g3], to.colours[g3 + 1], to.colours[g3 + 2]);
        scratch.from.lerp(scratch.to, t);
        mesh.setColorAt(j, scratch.from);
      }

      mesh.instanceMatrix.needsUpdate = true;
      if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true;
      // A very slight turn with progress reads as depth, not as a spinning demo.
      mesh.rotation.y = -0.3 + progressRef.current * 0.6;
    }
  });

  return (
    <group>
      {types.map((type, i) => (
        <instancedMesh
          key={type.id}
          ref={(el) => {
            meshRefs.current[i] = el;
          }}
          args={[type.geometry, undefined, groups[i].indices.length]}
          frustumCulled={false}
        >
          <meshStandardMaterial
            roughness={type.roughness}
            metalness={0.04}
            flatShading={!detailed ? false : type.id === 'pepper' || type.id === 'coriander'}
            side={type.doubleSided ? THREE.DoubleSide : THREE.FrontSide}
          />
        </instancedMesh>
      ))}
    </group>
  );
}

/**
 * Soft contact shadow so the spices sit on something rather than float.
 * Kept well inside the frame — a shadow plane wide enough to reach the canvas
 * edge gets clipped there and reads as a hard rectangular band.
 */
function Ground() {
  const texture = useMemo(() => radialShadowTexture(), []);
  return (
    <mesh position={[0, -1.3, 0.2]} rotation={[-Math.PI / 2, 0, 0]}>
      <planeGeometry args={[4.6, 2.7]} />
      <meshBasicMaterial map={texture} transparent depthWrite={false} />
    </mesh>
  );
}

interface Props {
  progressRef: React.MutableRefObject<number>;
  tier: CapabilityTier;
}

export default function SpiceJourneyScene({ progressRef, tier }: Props) {
  const detailed = tier === 'high';
  const count = (detailed ? PER_TYPE.high : PER_TYPE.low) * 6;

  return (
    <Canvas
      className="journey__canvas"
      dpr={dprCap(tier)}
      camera={{ position: [0, 0.12, 4.25], fov: 40 }}
      gl={{ antialias: detailed, alpha: true, powerPreference: 'high-performance' }}
      // The page background shows through; the scene never paints its own dark
      // surface, which is what keeps the section light.
      style={{ background: 'transparent' }}
    >
      {/* Warm morning key from the upper left, matching the hero footage. */}
      <hemisphereLight args={['#fff4e4', '#c9a98c', 1.1]} />
      <directionalLight position={[-3.4, 4.2, 3]} intensity={2.1} color="#fff1dc" />
      <directionalLight position={[3, 1.2, -2.4]} intensity={0.55} color="#e8b98a" />

      {/* Lifted so the body sits on the optical centre of the frame. */}
      <group position={[0, 0.42, 0]}>
        <Ground />
        <SpiceBody count={count} progressRef={progressRef} detailed={detailed} />
      </group>
    </Canvas>
  );
}
