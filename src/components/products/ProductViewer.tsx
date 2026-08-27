import { Suspense, lazy, useRef, useState } from 'react';
import type { Product } from '../../types';
import { useCapability, useIsTouch } from '../../hooks/useCapability';
import { allowsWebGL } from '../../lib/performance';
import { useT } from '../../hooks/useTranslation';

const ModelViewer = lazy(() => import('../three/ModelViewer'));

/**
 * Product presentation.
 *
 *   modelPath present + WebGL available  →  real 3D model
 *   otherwise                            →  the supplied packaging artwork
 *
 * No product currently ships a GLB, so every product renders the second branch.
 * That branch is a considered presentation of the real pack — a warm ground, a
 * cast shadow and a slight pointer-led parallax — rather than a fabricated 3D
 * packet, which would look worse than the artwork it replaced.
 */
export default function ProductViewer({ product }: { product: Product }) {
  const { copy, tr } = useT();
  const tier = useCapability();
  const isTouch = useIsTouch();
  const stageRef = useRef<HTMLDivElement>(null);
  const [failed, setFailed] = useState(false);

  const use3D = Boolean(product.modelPath) && allowsWebGL(tier);

  const packShot = (
    <div className="viewer__packshot">
      <img
        src={failed && product.fallbackImage ? product.fallbackImage : product.image}
        alt={`${tr(product.name)} — ${product.weight}${copy.common.grams} packet`}
        onError={() => setFailed(true)}
      />
    </div>
  );

  /** Desktop-only parallax: a couple of degrees, tied to pointer position. */
  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (isTouch || tier === 'reduced' || !stageRef.current) return;
    const rect = stageRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    stageRef.current.style.setProperty('--tilt-x', `${(-y * 5).toFixed(2)}deg`);
    stageRef.current.style.setProperty('--tilt-y', `${(x * 7).toFixed(2)}deg`);
    stageRef.current.style.setProperty('--shift', `${(x * 8).toFixed(1)}px`);
  };

  const resetTilt = () => {
    const stage = stageRef.current;
    if (!stage) return;
    stage.style.setProperty('--tilt-x', '0deg');
    stage.style.setProperty('--tilt-y', '0deg');
    stage.style.setProperty('--shift', '0px');
  };

  return (
    <div
      className={`viewer ${use3D ? 'viewer--3d' : ''}`}
      ref={stageRef}
      onPointerMove={onPointerMove}
      onPointerLeave={resetTilt}
      style={{ '--accent': product.accent } as React.CSSProperties}
    >
      <div className="viewer__ground" aria-hidden="true" />

      {use3D ? (
        <Suspense fallback={packShot}>
          <ModelViewer
            path={product.modelPath as string}
            tier={tier}
            label={tr(product.name)}
          />
        </Suspense>
      ) : (
        packShot
      )}

      {use3D && !isTouch && <span className="viewer__hint">{copy.product.dragHint}</span>}
    </div>
  );
}
