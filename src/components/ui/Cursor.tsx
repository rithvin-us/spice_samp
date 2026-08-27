import { useEffect, useRef } from 'react';
import { useIsTouch } from '../../hooks/useCapability';
import { prefersReducedMotion } from '../../lib/performance';

/**
 * A small trailing ring behind the native pointer. It never replaces the system
 * cursor and never grows large enough to obscure what is under it — it only
 * widens slightly over interactive elements.
 */
export default function Cursor() {
  const ringRef = useRef<HTMLDivElement>(null);
  const isTouch = useIsTouch();
  const enabled = !isTouch && !prefersReducedMotion();

  useEffect(() => {
    if (!enabled) return;
    const ring = ringRef.current;
    if (!ring) return;

    let x = window.innerWidth / 2;
    let y = window.innerHeight / 2;
    let rx = x;
    let ry = y;
    let rafId = 0;
    let visible = false;

    const onMove = (e: PointerEvent) => {
      x = e.clientX;
      y = e.clientY;
      if (!visible) {
        visible = true;
        ring.style.opacity = '1';
      }
      const target = e.target as HTMLElement | null;
      const interactive = target?.closest('a, button, input, [role="button"], .card');
      ring.classList.toggle('is-active', Boolean(interactive));
    };

    const onLeave = () => {
      visible = false;
      ring.style.opacity = '0';
    };

    const tick = () => {
      rafId = requestAnimationFrame(tick);
      rx += (x - rx) * 0.18;
      ry += (y - ry) * 0.18;
      ring.style.translate = `${rx.toFixed(1)}px ${ry.toFixed(1)}px`;
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
  return <div className="cursor" ref={ringRef} aria-hidden="true" />;
}
