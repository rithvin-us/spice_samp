import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { ContactShadows, Environment, OrbitControls, Stage, useGLTF } from '@react-three/drei';
import { dprCap } from '../../lib/performance';
import type { CapabilityTier } from '../../types';

/**
 * Real 3D packet rendering.
 *
 * Only mounted when a product actually declares a `modelPath`. Nothing here is
 * used to fake a 3D packet out of flat artwork — with no GLB present,
 * ProductViewer keeps showing the supplied packaging image instead.
 *
 * Drop a `.glb` into /public/models and point a product at it; no other file
 * needs to change.
 */

function Model({ path }: { path: string }) {
  const { scene } = useGLTF(path);
  return <primitive object={scene} />;
}

interface Props {
  path: string;
  tier: CapabilityTier;
  label: string;
}

export default function ModelViewer({ path, tier, label }: Props) {
  const detailed = tier === 'high';

  return (
    <Canvas
      dpr={dprCap(tier)}
      camera={{ position: [0, 0.2, 3.4], fov: 34 }}
      gl={{ antialias: detailed, powerPreference: 'high-performance' }}
      aria-label={label}
      role="img"
    >
      {/* Warm key light from the upper left, matching the packaging photography. */}
      <ambientLight intensity={0.7} />
      <directionalLight position={[-3, 4, 3]} intensity={1.5} color="#fff3e2" />
      <directionalLight position={[3, 1.5, -2]} intensity={0.5} color="#ffd9b0" />

      <Suspense fallback={null}>
        <Stage intensity={0.35} environment={null} adjustCamera={1.1} shadows={false}>
          <Model path={path} />
        </Stage>
        {detailed && <Environment preset="apartment" />}
      </Suspense>

      <ContactShadows
        position={[0, -1.05, 0]}
        opacity={0.32}
        scale={7}
        blur={2.6}
        far={2.2}
        color="#4a3123"
      />

      <OrbitControls
        makeDefault
        enablePan={false}
        minDistance={2.2}
        maxDistance={5}
        minPolarAngle={Math.PI / 3.4}
        maxPolarAngle={Math.PI / 1.85}
        autoRotate={detailed}
        autoRotateSpeed={0.5}
        enableDamping
        dampingFactor={0.08}
      />
    </Canvas>
  );
}
