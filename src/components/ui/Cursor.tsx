import { useEffect, useRef } from 'react';
import { useIsTouch } from '../../hooks/useCapability';
import { prefersReducedMotion } from '../../lib/performance';

/**
 * A small, quiet dot that trails just behind the native pointer. It never
 * replaces the system cursor and never grows large enough to cover what sits
 * under it — it only firms up a little over interactive controls.
 *
 * Deliberately minimal and steady:
 *   • one lerped `translate` per frame, nothing else touched in the loop;
 *   • the active state is a CSS `scale` — a property the loop never writes — so
 *     the dot changes size without ever re-centring or drifting;
 *   • it snaps straight to the pointer the first time it is seen (and again
 *     after the pointer leaves the window), so it never flies in from a corner.
 */
export default function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const isTouch = useIsTouch();
  const enabled = !isTouch && !prefersReducedMotion();

  useEffect(() => {
    if (!enabled) return;
    const dot = dotRef.current;
    if (!dot) return;

    let x = 0;
    let y = 0;
    let rx = 0;
    let ry = 0;
    let placed = false; // has the dot been positioned under the pointer yet?
    let rafId = 0;

    const onMove = (e: PointerEvent) => {
      x = e.clientX;
      y = e.clientY;

      // First sighting (or first move after re-entering the window): put the dot
      // exactly under the pointer instead of lerping across the screen to reach it.
      if (!placed) {
        rx = x;
        ry = y;
        placed = true;
        dot.style.translate = `${rx}px ${ry}px`;
        dot.style.opacity = '1';
      }

      const target = e.target as HTMLElement | null;
      const interactive = target?.closest(
        'a, button, input, textarea, select, label, [role="button"]'
      );
      dot.classList.toggle('is-active', Boolean(interactive));
    };

    // Leaving the window hides the dot and forces a fresh snap on return, so it
    // never slides in from wherever it happened to be.
    const onLeave = () => {
      placed = false;
      dot.style.opacity = '0';
      dot.classList.remove('is-active');
    };

    const tick = () => {
      rafId = requestAnimationFrame(tick);
      // A light trail — close enough to feel attached, soft enough to feel calm.
      rx += (x - rx) * 0.2;
      ry += (y - ry) * 0.2;
      dot.style.translate = `${rx.toFixed(2)}px ${ry.toFixed(2)}px`;
    };

    window.addEventListener('pointermove', onMove, { passive: true });
    document.addEventListener('pointerleave', onLeave);
    rafId = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener('pointermove', onMove);
      document.removeEventListener('pointerleave', onLeave);
      cancelAnimationFrame(rafId);
    };
  }, [enabled]);

  if (!enabled) return null;
  return <div className="cursor" ref={dotRef} aria-hidden="true" />;
}
