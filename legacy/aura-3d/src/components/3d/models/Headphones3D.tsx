import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface ModelProps {
  colorHex: string;
  accentHex?: string;
  wireframe?: boolean;
  explosionLevel?: number;
}

export const Headphones3D: React.FC<ModelProps> = ({
  colorHex,
  accentHex = '#0891b2',
  wireframe = false,
  explosionLevel = 0,
}) => {
  const groupRef = useRef<THREE.Group>(null);
  const leftCupRef = useRef<THREE.Group>(null);
  const rightCupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.position.y = Math.sin(state.clock.getElapsedTime() * 1.5) * 0.05;
    }

    // Animate exploded view
    if (leftCupRef.current && rightCupRef.current) {
      const offset = explosionLevel * 0.4;
      leftCupRef.current.position.x = -0.9 - offset;
      rightCupRef.current.position.x = 0.9 + offset;
    }
  });

  const mainMaterial = new THREE.MeshStandardMaterial({
    color: colorHex,
    roughness: 0.2,
    metalness: 0.8,
    wireframe,
  });

  const cushionMaterial = new THREE.MeshStandardMaterial({
    color: '#0f172a',
    roughness: 0.9,
    metalness: 0.1,
    wireframe,
  });

  const accentMaterial = new THREE.MeshStandardMaterial({
    color: accentHex,
    roughness: 0.1,
    metalness: 0.9,
    emissive: accentHex,
    emissiveIntensity: 0.3,
    wireframe,
  });

  return (
    <group ref={groupRef} dispose={null}>
      {/* Headband Arc */}
      <mesh position={[0, 0.45, 0]} rotation={[0, 0, Math.PI / 2]}>
        <torusGeometry args={[0.9, 0.07, 16, 64, Math.PI]} />
        <primitive object={mainMaterial} attach="material" />
      </mesh>

      {/* Headband Cushion Pad */}
      <mesh position={[0, 1.25, 0]} rotation={[0, 0, Math.PI / 2]}>
        <torusGeometry args={[0.86, 0.05, 12, 32, Math.PI * 0.6]} />
        <primitive object={cushionMaterial} attach="material" />
      </mesh>

      {/* Left Earcup Assembly */}
      <group ref={leftCupRef} position={[-0.9, -0.1, 0]}>
        {/* Outer Shell */}
        <mesh rotation={[0, Math.PI / 2, 0]}>
          <cylinderGeometry args={[0.42, 0.42, 0.2, 32]} />
          <primitive object={mainMaterial} attach="material" />
        </mesh>
        {/* Accent Glow Ring */}
        <mesh position={[-0.11, 0, 0]} rotation={[0, Math.PI / 2, 0]}>
          <ringGeometry args={[0.3, 0.38, 32]} />
          <primitive object={accentMaterial} attach="material" />
        </mesh>
        {/* Ear Cushion */}
        <mesh position={[0.12, 0, 0]} rotation={[0, Math.PI / 2, 0]}>
          <torusGeometry args={[0.35, 0.1, 16, 32]} />
          <primitive object={cushionMaterial} attach="material" />
        </mesh>
        {/* Hanger Bracket */}
        <mesh position={[0, 0.3, 0]}>
          <boxGeometry args={[0.08, 0.35, 0.08]} />
          <primitive object={accentMaterial} attach="material" />
        </mesh>
      </group>

      {/* Right Earcup Assembly */}
      <group ref={rightCupRef} position={[0.9, -0.1, 0]}>
        {/* Outer Shell */}
        <mesh rotation={[0, Math.PI / 2, 0]}>
          <cylinderGeometry args={[0.42, 0.42, 0.2, 32]} />
          <primitive object={mainMaterial} attach="material" />
        </mesh>
        {/* Accent Glow Ring */}
        <mesh position={[0.11, 0, 0]} rotation={[0, Math.PI / 2, 0]}>
          <ringGeometry args={[0.3, 0.38, 32]} />
          <primitive object={accentMaterial} attach="material" />
        </mesh>
        {/* Ear Cushion */}
        <mesh position={[-0.12, 0, 0]} rotation={[0, Math.PI / 2, 0]}>
          <torusGeometry args={[0.35, 0.1, 16, 32]} />
          <primitive object={cushionMaterial} attach="material" />
        </mesh>
        {/* Hanger Bracket */}
        <mesh position={[0, 0.3, 0]}>
          <boxGeometry args={[0.08, 0.35, 0.08]} />
          <primitive object={accentMaterial} attach="material" />
        </mesh>
      </group>
    </group>
  );
};
