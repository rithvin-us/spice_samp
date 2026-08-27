import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface ModelProps {
  colorHex: string;
  accentHex?: string;
  wireframe?: boolean;
  explosionLevel?: number;
}

export const Smartwatch3D: React.FC<ModelProps> = ({
  colorHex,
  accentHex = '#ca8a04',
  wireframe = false,
  explosionLevel = 0,
}) => {
  const groupRef = useRef<THREE.Group>(null);
  const screenRef = useRef<THREE.Mesh>(null);
  const strapTopRef = useRef<THREE.Mesh>(null);
  const strapBottomRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.position.y = Math.sin(state.clock.getElapsedTime() * 2) * 0.03;
    }

    if (screenRef.current && strapTopRef.current && strapBottomRef.current) {
      const offset = explosionLevel * 0.35;
      screenRef.current.position.z = 0.25 + offset;
      strapTopRef.current.position.y = 0.9 + offset;
      strapBottomRef.current.position.y = -0.9 - offset;
    }
  });

  const caseMaterial = new THREE.MeshStandardMaterial({
    color: colorHex,
    roughness: 0.15,
    metalness: 0.9,
    wireframe,
  });

  const glassMaterial = new THREE.MeshPhysicalMaterial({
    color: '#020617',
    roughness: 0.05,
    transmission: 0.6,
    thickness: 0.2,
    wireframe,
  });

  const screenDisplayMaterial = new THREE.MeshBasicMaterial({
    color: accentHex,
    wireframe,
  });

  const strapMaterial = new THREE.MeshStandardMaterial({
    color: '#1e293b',
    roughness: 0.7,
    metalness: 0.1,
    wireframe,
  });

  return (
    <group ref={groupRef} position={[0, 0, 0]} dispose={null}>
      {/* Titanium Body Case */}
      <mesh scale={[0.9, 1.1, 0.35]}>
        <boxGeometry args={[1, 1, 1]} />
        <primitive object={caseMaterial} attach="material" />
      </mesh>

      {/* Screen Curved Glass */}
      <mesh ref={screenRef} position={[0, 0, 0.19]} scale={[0.82, 1.02, 0.05]}>
        <boxGeometry args={[1, 1, 1]} />
        <primitive object={glassMaterial} attach="material" />
      </mesh>

      {/* Inner Screen Hologram Graphics */}
      <mesh position={[0, 0, 0.17]} scale={[0.75, 0.95, 0.01]}>
        <planeGeometry args={[1, 1]} />
        <primitive object={screenDisplayMaterial} attach="material" />
      </mesh>

      {/* Digital Crown Knob */}
      <mesh position={[0.48, 0.25, 0]} rotation={[0, Math.PI / 2, 0]}>
        <cylinderGeometry args={[0.08, 0.08, 0.15, 24]} />
        <primitive object={caseMaterial} attach="material" />
      </mesh>

      {/* Top Strap */}
      <mesh ref={strapTopRef} position={[0, 0.9, 0]}>
        <boxGeometry args={[0.65, 0.7, 0.1]} />
        <primitive object={strapMaterial} attach="material" />
      </mesh>

      {/* Bottom Strap */}
      <mesh ref={strapBottomRef} position={[0, -0.9, 0]}>
        <boxGeometry args={[0.65, 0.7, 0.1]} />
        <primitive object={strapMaterial} attach="material" />
      </mesh>
    </group>
  );
};
