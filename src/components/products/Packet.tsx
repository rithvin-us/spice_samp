import { useRef } from 'react';
import type { Product } from '../../types';
import { useIsTouch } from '../../hooks/useCapability';
import { useT } from '../../hooks/useTranslation';

/**
 * The masala packet.
 *
 * The supplied artwork is a flat front-of-pack. Presenting it as a bare
 * rectangle reads as a picture of a product rather than the product, so it is
 * built here into the packet it actually is: a front face carrying the real
 * artwork, a side gusset in the pack's own colour, the foil crimp along the top
 * and bottom seals, and the soft cylindrical shading a filled pouch has.
 *
 * Nothing about the artwork is altered — no recolouring, no cropping, no
 * regenerated label. The dimensionality is presentation around the supplied
 * image, matching the packet as it appears in the hero footage.
 */
export default function Packet({
  product,
  onError,
  eager = false,
  compact = false,
}: {
  product: Product;
  onError?: () => void;
  eager?: boolean;
  /** Grid variant: smaller, turned less, and it never chases the pointer. */
  compact?: boolean;
}) {
  const { copy, tr } = useT();
  const stageRef = useRef<HTMLDivElement>(null);
  const isTouch = useIsTouch();

  /** Desktop parallax: the packet turns a few degrees toward the pointer. */
  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const stage = stageRef.current;
    if (!stage || isTouch || compact) return;
    const rect = stage.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    stage.style.setProperty('--turn', `${(-14 + x * 16).toFixed(2)}deg`);
    stage.style.setProperty('--pitch', `${(-y * 7).toFixed(2)}deg`);
    stage.style.setProperty('--sheen-x', `${(50 + x * 90).toFixed(1)}%`);
  };

  const reset = () => {
    const stage = stageRef.current;
    if (!stage) return;
    stage.style.setProperty('--turn', '-14deg');
    stage.style.setProperty('--pitch', '0deg');
    stage.style.setProperty('--sheen-x', '50%');
  };

  return (
    <div
      className={`packet ${compact ? 'packet--compact' : ''}`}
      ref={stageRef}
      onPointerMove={onPointerMove}
      onPointerLeave={reset}
      style={{ '--accent': product.accent } as React.CSSProperties}
    >
      <div className="packet__body">
        <span className="packet__gusset" aria-hidden="true" />

        <div className="packet__face">
          <img
            src={product.image}
            alt={`${tr(product.name)} — ${product.weight}${copy.common.grams} packet`}
            onError={onError}
            loading={eager ? 'eager' : 'lazy'}
            decoding="async"
          />
          {/* Film curving away at both edges, and the highlight running down it. */}
          <span className="packet__curve" aria-hidden="true" />
          <span className="packet__sheen" aria-hidden="true" />
        </div>

        <span className="packet__crimp packet__crimp--top" aria-hidden="true" />
        <span className="packet__crimp packet__crimp--bottom" aria-hidden="true" />
      </div>

      <span className="packet__shadow" aria-hidden="true" />
    </div>
  );
}
