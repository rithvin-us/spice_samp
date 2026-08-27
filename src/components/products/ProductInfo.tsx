import { useEffect, useState } from 'react';
import { Check, ShoppingBag } from 'lucide-react';
import QuantitySelector from './QuantitySelector';
import type { Product } from '../../types';
import { useT } from '../../hooks/useTranslation';
import { useCartStore } from '../../store/cartStore';

/**
 * Everything a purchase decision needs, above any storytelling: what it is,
 * what it costs, how much is in the packet, and how to buy it. None of it is
 * behind an animation or a hover.
 */
export default function ProductInfo({ product }: { product: Product }) {
  const { copy, tr, price } = useT();
  const add = useCartStore((s) => s.add);
  const openCart = useCartStore((s) => s.open);
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  useEffect(() => {
    if (!added) return;
    const id = window.setTimeout(() => setAdded(false), 2200);
    return () => window.clearTimeout(id);
  }, [added]);

  const soldOut = product.availability === 'sold-out';
  const availability =
    product.availability === 'in-stock'
      ? copy.product.inStock
      : product.availability === 'low-stock'
        ? copy.product.lowStock
        : copy.product.soldOut;

  return (
    <div className="pinfo">
      <p className="pinfo__eyebrow">
        {product.category === 'veg' ? copy.product.forVeg : copy.product.forNonVeg}
        {product.signature && <span className="pinfo__badge">{copy.product.signature}</span>}
      </p>

      <h1 className="pinfo__name">{tr(product.name)}</h1>
      <p className="pinfo__tamil is-tamil-display" lang="ta">
        {product.tamilName}
      </p>

      <p className="pinfo__tagline">{tr(product.tagline)}</p>

      <div className="pinfo__facts">
        <div>
          <dt>{copy.product.price}</dt>
          <dd className="pinfo__price">{price(product.price)}</dd>
        </div>
        <div>
          <dt>{copy.product.net}</dt>
          <dd>
            {product.weight} {copy.common.grams}
          </dd>
        </div>
        <div>
          <dt>&nbsp;</dt>
          <dd className={`pinfo__stock pinfo__stock--${product.availability}`}>
            <span aria-hidden="true" />
            {availability}
          </dd>
        </div>
      </div>

      <div className="pinfo__buy">
        <QuantitySelector value={quantity} onChange={setQuantity} />
        <button
          type="button"
          className={`btn btn--primary pinfo__add ${added ? 'is-added' : ''}`}
          disabled={soldOut}
          onClick={() => {
            add(product, quantity);
            setAdded(true);
          }}
        >
          {added ? (
            <Check size={16} strokeWidth={2.4} aria-hidden="true" />
          ) : (
            <ShoppingBag size={16} strokeWidth={1.8} aria-hidden="true" />
          )}
          {soldOut ? copy.product.soldOut : added ? copy.cart.added : copy.product.add}
        </button>
      </div>

      {/* Adding never navigates away — the cart stays one click from here. */}
      <p className="pinfo__after" aria-live="polite">
        {added && (
          <button type="button" className="link-underline link-underline--static" onClick={openCart}>
            {copy.cart.title}
          </button>
        )}
      </p>

      <div className="pinfo__story">
        <h2>{copy.product.aboutBlend}</h2>
        <p>{tr(product.story)}</p>
      </div>

      <div className="pinfo__usage">
        <h2>{copy.product.howToUse}</h2>
        <ul>
          {product.usage.map((use) => (
            <li key={use.en}>{tr(use)}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
