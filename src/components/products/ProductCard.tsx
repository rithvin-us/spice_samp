import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Check, Plus } from 'lucide-react';
import type { Product } from '../../types';
import { useT } from '../../hooks/useTranslation';
import { useCartStore } from '../../store/cartStore';

interface Props {
  product: Product;
  /** Cards above the fold skip lazy loading. */
  priority?: boolean;
}

export default function ProductCard({ product, priority = false }: Props) {
  const { copy, tr, price } = useT();
  const add = useCartStore((s) => s.add);
  const [added, setAdded] = useState(false);

  useEffect(() => {
    if (!added) return;
    const id = window.setTimeout(() => setAdded(false), 1800);
    return () => window.clearTimeout(id);
  }, [added]);

  const soldOut = product.availability === 'sold-out';

  return (
    <article className="card reveal" style={{ '--accent': product.accent } as React.CSSProperties}>
      <Link to={`/products/${product.slug}`} className="card__media" tabIndex={-1} aria-hidden="true">
        <img
          src={product.image}
          alt=""
          loading={priority ? 'eager' : 'lazy'}
          decoding="async"
        />
      </Link>

      <div className="card__body">
        <div className="card__heading">
          <h3 className="card__name">
            <Link to={`/products/${product.slug}`}>{tr(product.name)}</Link>
          </h3>
          <p className="card__tamil is-tamil" lang="ta">
            {product.tamilName}
          </p>
        </div>

        <p className="card__desc">{tr(product.description)}</p>

        <div className="card__meta">
          <span className="card__price">{price(product.price)}</span>
          <span className="card__dot" aria-hidden="true" />
          <span className="card__weight">
            {product.weight} {copy.common.grams}
          </span>
          {/* The slot is always rendered so the meta row is the same height on
              every card and the price baselines line up across the grid. */}
          <span className={`card__badge ${product.signature ? '' : 'is-empty'}`} aria-hidden={!product.signature}>
            {product.signature ? copy.product.signature : ''}
          </span>
        </div>

        <div className="card__actions">
          <Link to={`/products/${product.slug}`} className="btn btn--ghost card__view">
            {copy.product.view}
          </Link>
          <button
            type="button"
            className={`btn btn--primary card__add ${added ? 'is-added' : ''}`}
            onClick={() => {
              add(product, 1);
              setAdded(true);
            }}
            disabled={soldOut}
          >
            {added ? (
              <Check size={15} strokeWidth={2.4} aria-hidden="true" />
            ) : (
              <Plus size={15} strokeWidth={2.4} aria-hidden="true" />
            )}
            <span>
              {soldOut
                ? copy.product.soldOut
                : added
                  ? copy.product.adding
                  : copy.product.add}
            </span>
          </button>
        </div>
      </div>
    </article>
  );
}
