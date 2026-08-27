import React, { Suspense, useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, ContactShadows, Float, PerformanceMonitor } from '@react-three/drei';
import { Headphones3D } from './models/Headphones3D';
import { Sneaker3D } from './models/Sneaker3D';
import { Smartwatch3D } from './models/Smartwatch3D';
import { Perfume3D } from './models/Perfume3D';
import { EnvironmentStudio } from './EnvironmentStudio';
import { useViewerStore } from '../../store/viewerStore';
import { detectHardwareCapabilities } from '../../utils/webglDetect';
import { ShieldAlert, ZapOff } from 'lucide-react';

interface ProductViewer3DProps {
  interactive?: boolean;
  floating?: boolean;
  customScale?: number;
}

export const ProductViewer3D: React.FC<ProductViewer3DProps> = ({
  interactive = true,
  floating = true,
  customScale,
}) => {
  const {
    activeProduct,
    selectedColor,
    lightingPreset,
    autoRotate,
    wireframe,
    explosionLevel,
    isLowPowerMode,
    setLowPowerMode,
  } = useViewerStore();

  const [hasWebGL, setHasWebGL] = useState(true);
  const [dpr, setDpr] = useState<number>(isLowPowerMode ? 1 : 1.25);

  useEffect(() => {
    const hw = detectHardwareCapabilities();
    setHasWebGL(hw.hasWebGL);
    if (hw.isLowEndDevice && !isLowPowerMode) {
      setLowPowerMode(true);
    }
  }, []);

  if (!hasWebGL) {
    return (
      <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center bg-slate-900/90 rounded-2xl border border-amber-500/30">
        <ShieldAlert className="w-12 h-12 text-amber-400 mb-3" />
        <h3 className="text-base font-bold text-white mb-1">WebGL 3D Acceleration Unavailable</h3>
        <p className="text-xs text-slate-400 max-w-sm">
          Your browser or device GPU driver does not support WebGL 3D graphics rendering. A static visual preview is shown instead.
        </p>
      </div>
    );
  }

  if (!activeProduct) return null;

  const colorHex = selectedColor?.hex || activeProduct.colors[0].hex;
  const accentHex = selectedColor?.accentHex || activeProduct.colors[0].accentHex;
  const scale = customScale || activeProduct.config3D.scale || 1;

  const renderMesh = () => {
    switch (activeProduct.config3D.meshType) {
      case 'sneaker':
        return (
          <Sneaker3D
            colorHex={colorHex}
            accentHex={accentHex}
            wireframe={wireframe}
            explosionLevel={explosionLevel}
          />
        );
      case 'smartwatch':
        return (
          <Smartwatch3D
            colorHex={colorHex}
            accentHex={accentHex}
            wireframe={wireframe}
            explosionLevel={explosionLevel}
          />
        );
      case 'perfume':
        return (
          <Perfume3D
            colorHex={colorHex}
            accentHex={accentHex}
            wireframe={wireframe}
            explosionLevel={explosionLevel}
          />
        );
      case 'headphones':
      default:
        return (
          <Headphones3D
            colorHex={colorHex}
            accentHex={accentHex}
            wireframe={wireframe}
            explosionLevel={explosionLevel}
          />
        );
    }
  };

  return (
    <div style={{ width: '100%', height: '100%', position: 'relative' }}>
      <Canvas
        camera={{ position: [0, 0, 3.5], fov: 45 }}
        dpr={isLowPowerMode ? 1 : dpr}
        gl={{
          antialias: !isLowPowerMode,
          powerPreference: 'high-performance',
          precision: isLowPowerMode ? 'mediump' : 'highp',
          alpha: true,
        }}
      >
        {/* Dynamic Performance Monitor — automatically throttles DPR if frame rate drops */}
        <PerformanceMonitor
          onDecline={() => {
            setDpr(1);
            if (!isLowPowerMode) setLowPowerMode(true);
          }}
          onIncline={() => {
            if (!isLowPowerMode) setDpr(1.25);
          }}
        >
          <Suspense fallback={null}>
            <EnvironmentStudio preset={lightingPreset} />
            
            <group scale={scale}>
              {floating && !isLowPowerMode ? (
                <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.4}>
                  {renderMesh()}
                </Float>
              ) : (
                renderMesh()
              )}
            </group>

            {!isLowPowerMode && (
              <ContactShadows
                position={[0, -1.4, 0]}
                opacity={0.5}
                scale={6}
                blur={2}
                far={3}
              />
            )}

            {interactive && (
              <OrbitControls
                enableZoom={true}
                maxDistance={6}
                minDistance={1.8}
                autoRotate={autoRotate}
                autoRotateSpeed={isLowPowerMode ? 1.2 : 2}
                enablePan={false}
              />
            )}
          </Suspense>
        </PerformanceMonitor>
      </Canvas>
    </div>
  );
};
