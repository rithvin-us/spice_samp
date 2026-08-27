import { useEffect, useState } from 'react';
import { detectTier } from '../lib/performance';
import type { CapabilityTier } from '../types';

/**
 * Resolves the rendering tier after mount so the first paint is never blocked
 * on measuring the device, and so `prefers-reduced-motion` changes mid-session
 * are picked up.
 */
export function useCapability(): CapabilityTier {
  const [tier, setTier] = useState<CapabilityTier>(() => detectTier());

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setTier(media.matches ? 'reduced' : detectTier());
    update();
    media.addEventListener('change', update);
    return () => media.removeEventListener('change', update);
  }, []);

  return tier;
}

export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(
    () => typeof window !== 'undefined' && window.matchMedia(query).matches
  );

  useEffect(() => {
    const media = window.matchMedia(query);
    const update = () => setMatches(media.matches);
    update();
    media.addEventListener('change', update);
    return () => media.removeEventListener('change', update);
  }, [query]);

  return matches;
}

export const useIsMobile = (): boolean => useMediaQuery('(max-width: 47.99rem)');
export const useIsTouch = (): boolean => useMediaQuery('(pointer: coarse)');
