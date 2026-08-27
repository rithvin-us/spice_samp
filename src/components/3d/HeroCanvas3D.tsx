import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Sparkles, MeshWobbleMaterial } from '@react-three/drei';
import * as THREE from 'three';
import { Headphones3D } from './models/Headphones3D';

const FloatingShapes = () => {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.getElapsedTime() * 0.1;
      groupRef.current.rotation.x = Math.sin(state.clock.getElapsedTime() * 0.15) * 0.1;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Floating Ring 1 */}
      <mesh position={[-2.2, 1.2, -1]} rotation={[0.4, 0.2, 0]}>
        <torusGeometry args={[0.5, 0.08, 16, 32]} />
        <MeshWobbleMaterial color="#06b6d4" factor={0.2} speed={1.5} roughness={0.1} metalness={0.9} />
      </mesh>

      {/* Floating Octahedron */}
      <mesh position={[2.4, -0.8, -1.2]} rotation={[0.2, 0.5, 0]}>
        <octahedronGeometry args={[0.6]} />
        <MeshWobbleMaterial color="#a855f7" factor={0.3} speed={2} roughness={0.2} metalness={0.8} />
      </mesh>

      {/* Floating Icosahedron */}
      <mesh position={[-1.8, -1.2, -0.5]}>
        <icosahedronGeometry args={[0.4]} />
        <MeshWobbleMaterial color="#6366f1" factor={0.15} speed={1} roughness={0.2} metalness={0.9} />
      </mesh>
    </group>
  );
};

export const HeroCanvas3D: React.FC = () => {
  return (
    <div style={{ width: '100%', height: '100%', position: 'absolute', inset: 0, pointerEvents: 'none' }}>
      <Canvas camera={{ position: [0, 0, 4.2], fov: 45 }}>
        <ambientLight intensity={0.6} />
        <directionalLight position={[5, 8, 5]} intensity={1.8} color="#06b6d4" />
        <pointLight position={[-5, -2, 2]} intensity={1.5} color="#a855f7" />
        
        <Sparkles count={60} scale={6} size={3} speed={0.4} color="#38bdf8" />
        <FloatingShapes />

        <Float speed={2.5} rotationIntensity={0.4} floatIntensity={0.6}>
          <group position={[0, -0.1, 0]} scale={1.2}>
            <Headphones3D colorHex="#06b6d4" accentHex="#a855f7" />
          </group>
        </Float>
      </Canvas>
    </div>
  );
};
