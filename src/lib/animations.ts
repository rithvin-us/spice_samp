import Lenis from 'lenis';
import { prefersReducedMotion } from './performance';

let lenis: Lenis | null = null;
let rafId = 0;

/**
 * Smooth scrolling, kept deliberately light: a short lerp that takes the edge
 * off wheel stepping so the pinned hero scrubs cleanly. No inertia physics and
 * no scroll hijacking — a flick still lands roughly where the reader expects.
 *
 * Disabled entirely for reduced motion and for touch, where native scrolling is
 * already smooth and the momentum belongs to the OS.
 */
export function initSmoothScroll(): () => void {
  if (typeof window === 'undefined') return () => {};
  if (prefersReducedMotion() || window.matchMedia('(pointer: coarse)').matches) {
    return () => {};
  }

  lenis = new Lenis({ duration: 0.9, smoothWheel: true, touchMultiplier: 1.6 });

  const raf = (time: number) => {
    lenis?.raf(time);
    rafId = requestAnimationFrame(raf);
  };
  rafId = requestAnimationFrame(raf);

  return () => {
    cancelAnimationFrame(rafId);
    lenis?.destroy();
    lenis = null;
  };
}

export const scrollTo = (target: string | HTMLElement, offset = 0): void => {
  if (lenis) {
    lenis.scrollTo(target, { offset });
    return;
  }
  const el = typeof target === 'string' ? document.querySelector(target) : target;
  if (!el) return;
  const top = el.getBoundingClientRect().top + window.scrollY + offset;
  window.scrollTo({ top, behavior: prefersReducedMotion() ? 'auto' : 'smooth' });
};

/**
 * Shared observer that adds `.is-visible` to `.reveal` elements once.
 *
 * The cinematic sections are scrubbed with `position: sticky` plus a single
 * requestAnimationFrame loop that reads its own section's rect, rather than
 * with a scroll-animation library. That keeps the page's own scrolling intact,
 * avoids the layout takeover that pinning brings, and keeps roughly 70 KB of
 * animation runtime out of the bundle — the reveals below are the only other
 * scroll behaviour on the site, and one IntersectionObserver covers them.
 */
let revealObserver: IntersectionObserver | null = null;

function getRevealObserver(): IntersectionObserver {
  if (!revealObserver) {
    revealObserver = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            revealObserver?.unobserve(entry.target);
          }
        }
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.08 }
    );
  }
  return revealObserver;
}

export function observeReveals(root: ParentNode = document): () => void {
  const observer = getRevealObserver();
  const targets = Array.from(root.querySelectorAll('.reveal:not(.is-visible)'));
  targets.forEach((el) => observer.observe(el));
  return () => targets.forEach((el) => observer.unobserve(el));
}
