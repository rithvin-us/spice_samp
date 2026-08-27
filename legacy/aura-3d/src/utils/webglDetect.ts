import WebGL from 'three/examples/jsm/capabilities/WebGL.js';

export interface HardwareInfo {
  hasWebGL: boolean;
  isMobile: boolean;
  isLowEndDevice: boolean;
  devicePixelRatio: number;
}

export const detectHardwareCapabilities = (): HardwareInfo => {
  const hasWebGL = WebGL.isWebGLAvailable();
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  );

  // Check hardware concurrency (CPU cores) and device memory if available
  const nav = navigator as unknown as { hardwareConcurrency?: number; deviceMemory?: number };
  const cpuCores = nav.hardwareConcurrency || 4;
  const memoryGb = nav.deviceMemory || 4;

  const isLowEndDevice = isMobile || cpuCores <= 4 || memoryGb <= 4;
  const devicePixelRatio = Math.min(window.devicePixelRatio || 1, isLowEndDevice ? 1.25 : 2);

  return {
    hasWebGL,
    isMobile,
    isLowEndDevice,
    devicePixelRatio,
  };
};
