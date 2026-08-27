import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface ModelProps {
  colorHex: string;
  accentHex?: string;
  wireframe?: boolean;
  explosionLevel?: number;
}

export const Perfume3D: React.FC<ModelProps> = ({
  colorHex,
  accentHex = '#d97706',
  wireframe = false,
  explosionLevel = 0,
}) => {
  const groupRef = useRef<THREE.Group>(null);
  const capRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.position.y = Math.sin(state.clock.getElapsedTime() * 1.4) * 0.04;
    }

    if (capRef.current) {
      const offset = explosionLevel * 0.45;
      capRef.current.position.y = 0.95 + offset;
    }
  });

  const crystalMaterial = new THREE.MeshPhysicalMaterial({
    color: '#ffffff',
    roughness: 0.05,
    transmission: 0.9,
    ior: 1.5,
    thickness: 0.4,
    transparent: true,
    opacity: 0.9,
    wireframe,
  });

  const liquidMaterial = new THREE.MeshPhysicalMaterial({
    color: colorHex,
    roughness: 0.1,
    transmission: 0.6,
    thickness: 0.2,
    wireframe,
  });

  const goldCapMaterial = new THREE.MeshStandardMaterial({
    color: accentHex,
    roughness: 0.1,
    metalness: 0.95,
    wireframe,
  });

  return (
    <group ref={groupRef} position={[0, 0, 0]} dispose={null}>
      {/* Outer Crystal Bottle */}
      <mesh position={[0, -0.05, 0]}>
        <boxGeometry args={[0.85, 1.2, 0.85]} />
        <primitive object={crystalMaterial} attach="material" />
      </mesh>

      {/* Inner Liquid Core */}
      <mesh position={[0, -0.15, 0]}>
        <boxGeometry args={[0.7, 0.9, 0.7]} />
        <primitive object={liquidMaterial} attach="material" />
      </mesh>

      {/* Gold Atomizer Neck Collar */}
      <mesh position={[0, 0.62, 0]}>
        <cylinderGeometry args={[0.18, 0.22, 0.15, 32]} />
        <primitive object={goldCapMaterial} attach="material" />
      </mesh>

      {/* Atomizer Crown Cap */}
      <mesh ref={capRef} position={[0, 0.95, 0]}>
        <cylinderGeometry args={[0.22, 0.22, 0.45, 32]} />
        <primitive object={goldCapMaterial} attach="material" />
      </mesh>
    </group>
  );
};
