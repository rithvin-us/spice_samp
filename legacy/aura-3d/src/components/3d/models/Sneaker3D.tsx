import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface ModelProps {
  colorHex: string;
  accentHex?: string;
  wireframe?: boolean;
  explosionLevel?: number;
}

export const Sneaker3D: React.FC<ModelProps> = ({
  colorHex,
  accentHex = '#ea580c',
  wireframe = false,
  explosionLevel = 0,
}) => {
  const groupRef = useRef<THREE.Group>(null);
  const soleRef = useRef<THREE.Group>(null);
  const upperRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.position.y = Math.sin(state.clock.getElapsedTime() * 1.8) * 0.04;
    }

    if (soleRef.current && upperRef.current) {
      const offset = explosionLevel * 0.35;
      soleRef.current.position.y = -0.35 - offset;
      upperRef.current.position.y = 0.15 + offset;
    }
  });

  const upperMaterial = new THREE.MeshStandardMaterial({
    color: colorHex,
    roughness: 0.5,
    metalness: 0.2,
    wireframe,
  });

  const soleMaterial = new THREE.MeshStandardMaterial({
    color: '#f8fafc',
    roughness: 0.3,
    metalness: 0.1,
    wireframe,
  });

  const accentMaterial = new THREE.MeshStandardMaterial({
    color: accentHex,
    roughness: 0.1,
    metalness: 0.8,
    emissive: accentHex,
    emissiveIntensity: 0.4,
    wireframe,
  });

  return (
    <group ref={groupRef} position={[0, 0, 0]} dispose={null}>
      {/* Upper Mesh Assembly */}
      <group ref={upperRef} position={[0, 0.15, 0]}>
        {/* Main Body Shoe Upper */}
        <mesh position={[0.2, 0.1, 0]} scale={[1.8, 0.65, 0.8]}>
          <boxGeometry args={[1, 1, 1]} />
          <primitive object={upperMaterial} attach="material" />
        </mesh>
        {/* Toe Box Curve */}
        <mesh position={[0.95, -0.05, 0]} scale={[0.6, 0.45, 0.78]}>
          <sphereGeometry args={[0.5, 32, 16]} />
          <primitive object={upperMaterial} attach="material" />
        </mesh>
        {/* Ankle Collar */}
        <mesh position={[-0.4, 0.4, 0]} scale={[0.5, 0.4, 0.7]}>
          <cylinderGeometry args={[0.5, 0.4, 0.6, 32]} />
          <primitive object={upperMaterial} attach="material" />
        </mesh>
        {/* Kinetic Side Stripe */}
        <mesh position={[0.1, 0.12, 0.41]} rotation={[0, 0, -0.2]}>
          <boxGeometry args={[1.1, 0.12, 0.02]} />
          <primitive object={accentMaterial} attach="material" />
        </mesh>
        <mesh position={[0.1, 0.12, -0.41]} rotation={[0, 0, -0.2]}>
          <boxGeometry args={[1.1, 0.12, 0.02]} />
          <primitive object={accentMaterial} attach="material" />
        </mesh>
      </group>

      {/* 3D-Printed Lattice Sole */}
      <group ref={soleRef} position={[0, -0.35, 0]}>
        {/* Midsole */}
        <mesh position={[0.2, 0, 0]} scale={[2.0, 0.25, 0.9]}>
          <boxGeometry args={[1, 1, 1]} />
          <primitive object={soleMaterial} attach="material" />
        </mesh>
        {/* Outsole Grip Lattice Accents */}
        <mesh position={[0.2, -0.15, 0]} scale={[2.05, 0.08, 0.92]}>
          <boxGeometry args={[1, 1, 1]} />
          <primitive object={accentMaterial} attach="material" />
        </mesh>
      </group>
    </group>
  );
};
