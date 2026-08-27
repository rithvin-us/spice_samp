import { Suspense, lazy, useState } from 'react';
import Packet from './Packet';
import type { Product } from '../../types';
import { useCapability, useIsTouch } from '../../hooks/useCapability';
import { allowsWebGL } from '../../lib/performance';
import { useT } from '../../hooks/useTranslation';

const ModelViewer = lazy(() => import('../three/ModelViewer'));

/**
 * Product presentation.
 *
 *   modelPath present + WebGL available  →  real 3D model
 *   otherwise                            →  the supplied packaging artwork,
 *                                           built into a dimensional packet
 *
 * No product currently ships a GLB, so every product takes the second branch.
 * That branch is deliberately not a fabricated 3D packet mesh — it is the real
 * artwork presented as the pouch it is. Drop a `.glb` into /public/models and
 * set `modelPath`, and the first branch takes over with no other change.
 */
export default function ProductViewer({
  product,
  eager = false,
}: {
  product: Product;
  eager?: boolean;
}) {
  const { copy, tr } = useT();
  const tier = useCapability();
  const isTouch = useIsTouch();
  const [failed, setFailed] = useState(false);

  const use3D = Boolean(product.modelPath) && allowsWebGL(tier);

  const packet = (
    <Packet
      product={
        failed && product.fallbackImage ? { ...product, image: product.fallbackImage } : product
      }
      onError={() => setFailed(true)}
      eager={eager}
    />
  );

  return (
    <div
      className={`viewer ${use3D ? 'viewer--3d' : ''}`}
      style={{ '--accent': product.accent } as React.CSSProperties}
    >
      <div className="viewer__ground" aria-hidden="true" />

      {use3D ? (
        <Suspense fallback={packet}>
          <ModelViewer path={product.modelPath as string} tier={tier} label={tr(product.name)} />
        </Suspense>
      ) : (
        packet
      )}

      {use3D && !isTouch && <span className="viewer__hint">{copy.product.dragHint}</span>}
    </div>
  );
}
