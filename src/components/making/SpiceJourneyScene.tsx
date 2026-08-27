import { useMemo, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { buildFormations, STAGE_COUNT } from './stageFormations';
import { dprCap } from '../../lib/performance';
import type { CapabilityTier } from '../../types';

/**
 * One continuous body of spice, changing state across the seven stages.
 *
 * This is the only WebGL scene on the homepage. It exists because the thing
 * being described — separate ingredients gradually stopping being separate — is
 * a transformation, and a transformation is the one thing a sequence of static
 * images cannot show. Everything else on the page is HTML.
 *
 * Progress is passed in through a ref and read inside useFrame, so scrolling
 * never re-renders React.
 */

/** Soft round sprite, generated once — avoids shipping a texture file. */
function makeSprite(): THREE.Texture {
  const size = 64;
  const canvas = document.createElement('canvas');
  canvas.width = canvas.height = size;
  const ctx = canvas.getContext('2d');
  if (ctx) {
    const g = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
    g.addColorStop(0, 'rgba(255,255,255,1)');
    g.addColorStop(0.45, 'rgba(255,255,255,0.85)');
    g.addColorStop(1, 'rgba(255,255,255,0)');
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, size, size);
  }
  const texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;
  return texture;
}

function SpiceBody({ count, progressRef }: { count: number; progressRef: React.MutableRefObject<number> }) {
  const pointsRef = useRef<THREE.Points>(null);
  const formations = useMemo(() => buildFormations(count), [count]);
  const sprite = useMemo(() => makeSprite(), []);

  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(formations[0].positions.slice(), 3));
    geo.setAttribute('color', new THREE.BufferAttribute(formations[0].colours.slice(), 3));
    return geo;
  }, [formations]);

  // Scratch colours reused every frame so the loop allocates nothing.
  const scratch = useMemo(() => ({ a: new THREE.Color(), b: new THREE.Color() }), []);

  useFrame((state) => {
    const points = pointsRef.current;
    if (!points) return;

    const span = STAGE_COUNT - 1;
    const raw = THREE.MathUtils.clamp(progressRef.current, 0, 1) * span;
    const index = Math.min(span - 1, Math.floor(raw));
    const local = raw - index;
    // Ease the crossfade so each stage holds before giving way to the next.
    const t = local * local * (3 - 2 * local);

    const from = formations[index];
    const to = formations[index + 1];
    const position = points.geometry.getAttribute('position') as THREE.BufferAttribute;
    const colour = points.geometry.getAttribute('color') as THREE.BufferAttribute;
    const pos = position.array as Float32Array;
    const col = colour.array as Float32Array;
    const time = state.clock.elapsedTime;

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      // A slow, uneven drift keeps the body alive while the page is still.
      const drift = Math.sin(time * 0.45 + i * 0.35) * 0.018;
      pos[i3] = from.positions[i3] + (to.positions[i3] - from.positions[i3]) * t;
      pos[i3 + 1] =
        from.positions[i3 + 1] + (to.positions[i3 + 1] - from.positions[i3 + 1]) * t + drift;
      pos[i3 + 2] = from.positions[i3 + 2] + (to.positions[i3 + 2] - from.positions[i3 + 2]) * t;

      scratch.a.setRGB(from.colours[i3], from.colours[i3 + 1], from.colours[i3 + 2]);
      scratch.b.setRGB(to.colours[i3], to.colours[i3 + 1], to.colours[i3 + 2]);
      scratch.a.lerp(scratch.b, t);
      col[i3] = scratch.a.r;
      col[i3 + 1] = scratch.a.g;
      col[i3 + 2] = scratch.a.b;
    }

    position.needsUpdate = true;
    colour.needsUpdate = true;

    // The whole body turns very slightly with progress — enough to read as
    // depth, not enough to look like a spinning demo.
    points.rotation.y = -0.35 + progressRef.current * 0.7;
  });

  return (
    <points ref={pointsRef} geometry={geometry}>
      <pointsMaterial
        vertexColors
        size={0.075}
        sizeAttenuation
        map={sprite}
        transparent
        alphaTest={0.02}
        depthWrite={false}
      />
    </points>
  );
}

interface Props {
  progressRef: React.MutableRefObject<number>;
  tier: CapabilityTier;
}

export default function SpiceJourneyScene({ progressRef, tier }: Props) {
  const count = tier === 'high' ? 2600 : 1100;

  return (
    <Canvas
      className="journey__canvas"
      dpr={dprCap(tier)}
      camera={{ position: [0, 0.35, 5.6], fov: 40 }}
      gl={{ antialias: false, alpha: true, powerPreference: 'high-performance' }}
      // The page background shows through; the scene never paints its own dark
      // surface, which is what keeps the section light.
      style={{ background: 'transparent' }}
      frameloop="always"
    >
      <ambientLight intensity={1} />
      <SpiceBody count={count} progressRef={progressRef} />
    </Canvas>
  );
}
