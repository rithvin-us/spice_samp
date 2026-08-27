import type { CapabilityTier } from '../types';

/**
 * Capability strategy
 * -------------------------------------------------------------
 *  high     full frame sequence + interactive 3D
 *  medium   reduced frame sequence + simplified 3D
 *  low      static hero poster + minimal animation, no WebGL
 *  reduced  static hero poster, no scroll-driven motion (user preference)
 *
 * The tier only ever removes motion and rendering cost. Every product, price,
 * ingredient and purchase control is present at all four tiers.
 */

interface NavigatorWithHints extends Navigator {
  deviceMemory?: number;
  connection?: { saveData?: boolean; effectiveType?: string };
}

export const prefersReducedMotion = (): boolean =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

let webglSupport: boolean | null = null;

export function supportsWebGL(): boolean {
  if (webglSupport !== null) return webglSupport;
  if (typeof window === 'undefined') return false;
  try {
    const canvas = document.createElement('canvas');
    const gl =
      canvas.getContext('webgl2') ||
      canvas.getContext('webgl') ||
      canvas.getContext('experimental-webgl');
    webglSupport = Boolean(gl);
  } catch {
    webglSupport = false;
  }
  return webglSupport;
}

let cachedTier: CapabilityTier | null = null;

export function detectTier(): CapabilityTier {
  if (cachedTier) return cachedTier;
  if (typeof window === 'undefined') return 'medium';

  if (prefersReducedMotion()) {
    cachedTier = 'reduced';
    return cachedTier;
  }

  const nav = navigator as NavigatorWithHints;
  const memory = nav.deviceMemory ?? 8;
  const cores = nav.hardwareConcurrency ?? 8;
  const saveData = nav.connection?.saveData === true;
  const slowNetwork = /(^|\b)(slow-)?2g$/.test(nav.connection?.effectiveType ?? '');
  const coarse = window.matchMedia('(pointer: coarse)').matches;
  const narrow = window.innerWidth < 768;

  if (saveData || slowNetwork || !supportsWebGL() || memory <= 2 || cores <= 2) {
    cachedTier = 'low';
  } else if (memory <= 4 || cores <= 4 || (coarse && narrow)) {
    cachedTier = 'medium';
  } else {
    cachedTier = 'high';
  }
  return cachedTier;
}

/** True when scroll-driven frame playback should run at all. */
export const allowsSequence = (tier: CapabilityTier): boolean =>
  tier === 'high' || tier === 'medium';

/** True when a WebGL canvas may be mounted. */
export const allowsWebGL = (tier: CapabilityTier): boolean =>
  (tier === 'high' || tier === 'medium') && supportsWebGL();

/** Device pixel ratio ceiling — the single biggest GPU cost lever. */
export const dprCap = (tier: CapabilityTier): [number, number] =>
  tier === 'high' ? [1, 1.75] : [1, 1.25];

/** How many frames of the hero sequence to actually decode. */
export const frameStride = (tier: CapabilityTier): number => (tier === 'high' ? 1 : 2);
