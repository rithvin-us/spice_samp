import { useRef } from 'react';
import { useIsTouch } from '../../hooks/useCapability';
import { prefersReducedMotion } from '../../lib/performance';

/**
 * A very small magnetic pull — at most a few pixels, so the control feels
 * responsive under the cursor without turning into a toy. Inert on touch and
 * when motion is reduced.
 */
export default function MagneticButton({
  children,
  strength = 0.18,
  max = 5,
}: {
  children: React.ReactNode;
  strength?: number;
  max?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const isTouch = useIsTouch();
  const active = !isTouch && !prefersReducedMotion();

  const onMove = (e: React.PointerEvent<HTMLSpanElement>) => {
    const el = ref.current;
    if (!el || !active) return;
    const rect = el.getBoundingClientRect();
    const dx = e.clientX - (rect.left + rect.width / 2);
    const dy = e.clientY - (rect.top + rect.height / 2);
    el.style.translate = `${Math.max(-max, Math.min(max, dx * strength)).toFixed(1)}px ${Math.max(
      -max,
      Math.min(max, dy * strength)
    ).toFixed(1)}px`;
  };

  const reset = () => {
    if (ref.current) ref.current.style.translate = '0 0';
  };

  return (
    <span
      className="magnetic"
      ref={ref}
      onPointerMove={onMove}
      onPointerLeave={reset}
      onPointerUp={reset}
    >
      {children}
    </span>
  );
}
