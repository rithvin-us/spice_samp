import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Check, Info } from 'lucide-react';
import CartSummary from '../components/cart/CartSummary';
import { useT } from '../hooks/useTranslation';
import { useCartStore, useCartSubtotal } from '../store/cartStore';
import { useMeta } from '../hooks/useMeta';

/**
 * Demonstration checkout.
 *
 * There is no payment integration and no form that asks for a card, an address
 * or any other personal detail — nothing is collected and nothing is sent
 * anywhere. The page exists to complete the purchase path honestly.
 */
export default function CheckoutPage() {
  const { copy, tr, price } = useT();
  const lines = useCartStore((s) => s.lines);
  const clear = useCartStore((s) => s.clear);
  const subtotal = useCartSubtotal();
  const [placed, setPlaced] = useState(false);

  useMeta({
    title: `${copy.checkout.title} — ${copy.brand.name}`,
    description: copy.checkout.demoBody,
  });

  if (placed) {
    return (
      <div className="page shell shell--narrow checkout checkout--done">
        <span className="checkout__tick" aria-hidden="true">
          <Check size={22} strokeWidth={2} />
        </span>
        <h1 className="checkout__title">{copy.checkout.placed}</h1>
        <p className="lede">{copy.checkout.placedBody}</p>
        <Link to="/shop" className="btn btn--primary">
          {copy.checkout.backToShop}
        </Link>
      </div>
    );
  }

  if (lines.length === 0) {
    return (
      <div className="page shell shell--narrow checkout empty empty--page">
        <h1 className="empty__title">{copy.checkout.emptyTitle}</h1>
        <p className="empty__body">{copy.cart.emptyBody}</p>
        <Link to="/shop" className="btn btn--primary">
          {copy.cart.startShopping}
        </Link>
      </div>
    );
  }

  return (
    <div className="page shell shell--narrow checkout">
      <p className="checkout__badge">
        <Info size={14} strokeWidth={2} aria-hidden="true" />
        {copy.checkout.demoBadge}
      </p>

      <h1 className="checkout__title">{copy.checkout.demoTitle}</h1>
      <p className="lede checkout__note">{copy.checkout.demoBody}</p>

      <section className="checkout__summary" aria-labelledby="order-summary">
        <h2 id="order-summary">{copy.checkout.orderSummary}</h2>
        <ul className="checkout__lines">
          {lines.map((line) => (
            <li key={line.productId}>
              <img src={line.image} alt="" loading="lazy" />
              <div>
                <p className="checkout__name">{tr(line.name)}</p>
                <p className="checkout__meta">
                  {line.weight} {copy.common.grams} · ×{line.quantity}
                </p>
              </div>
              <span className="checkout__amount">{price(line.price * line.quantity)}</span>
            </li>
          ))}
        </ul>

        <CartSummary subtotal={subtotal} showTotal />

        <button
          type="button"
          className="btn btn--primary btn--block"
          onClick={() => {
            clear();
            setPlaced(true);
          }}
        >
          {copy.checkout.placeOrder}
        </button>
        <Link to="/shop" className="checkout__back link-underline link-underline--static">
          {copy.cart.continue}
        </Link>
      </section>
    </div>
  );
}
