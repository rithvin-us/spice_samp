import React from 'react';
import { LightingPreset } from '../../types';

interface EnvironmentStudioProps {
  preset: LightingPreset;
}

export const EnvironmentStudio: React.FC<EnvironmentStudioProps> = ({ preset }) => {
  switch (preset) {
    case 'cyber':
      return (
        <>
          <ambientLight intensity={0.3} />
          <directionalLight position={[5, 8, 5]} intensity={1.5} color="#06b6d4" />
          <pointLight position={[-5, 2, -3]} intensity={2.5} color="#a855f7" />
          <pointLight position={[3, -4, 2]} intensity={1.2} color="#ec4899" />
        </>
      );

    case 'sunset':
      return (
        <>
          <ambientLight intensity={0.4} />
          <directionalLight position={[6, 5, 4]} intensity={2.0} color="#f59e0b" />
          <pointLight position={[-4, 3, -2]} intensity={1.5} color="#f43f5e" />
          <directionalLight position={[0, -5, 0]} intensity={0.5} color="#8b5cf6" />
        </>
      );

    case 'minimal':
      return (
        <>
          <ambientLight intensity={0.8} />
          <directionalLight position={[0, 10, 5]} intensity={1.2} color="#ffffff" />
          <directionalLight position={[0, -5, -5]} intensity={0.3} color="#94a3b8" />
        </>
      );

    case 'studio':
    default:
      return (
        <>
          <ambientLight intensity={0.5} />
          <directionalLight position={[5, 10, 7]} intensity={1.8} color="#ffffff" castShadow />
          <pointLight position={[-6, 3, -4]} intensity={1.2} color="#6366f1" />
          <pointLight position={[6, -2, 4]} intensity={0.8} color="#38bdf8" />
        </>
      );
  }
};
