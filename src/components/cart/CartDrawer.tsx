import { useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { X } from 'lucide-react';
import CartItem from './CartItem';
import CartSummary from './CartSummary';
import { useT } from '../../hooks/useTranslation';
import { useCartStore, useCartCount, useCartSubtotal } from '../../store/cartStore';
import { trapFocus } from '../../lib/utils';

export default function CartDrawer() {
  const { copy } = useT();
  const navigate = useNavigate();
  const lines = useCartStore((s) => s.lines);
  const isOpen = useCartStore((s) => s.isOpen);
  const close = useCartStore((s) => s.close);
  const count = useCartCount();
  const subtotal = useCartSubtotal();
  const panelRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!isOpen) return;
    const previous = document.activeElement as HTMLElement | null;
    closeRef.current?.focus();
    document.body.style.overflow = 'hidden';

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
      if (panelRef.current) trapFocus(panelRef.current, e);
    };
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
      previous?.focus();
    };
  }, [isOpen, close]);

  return (
    <div className={`drawer ${isOpen ? 'is-open' : ''}`} aria-hidden={!isOpen}>
      <button
        type="button"
        className="drawer__scrim"
        onClick={close}
        tabIndex={-1}
        aria-hidden="true"
      />

      <div
        className="drawer__panel"
        role="dialog"
        aria-modal="true"
        aria-label={copy.cart.title}
        ref={panelRef}
      >
        <header className="drawer__head">
          <h2>
            {copy.cart.title}
            {count > 0 && (
              <span className="drawer__count">
                {count} {count === 1 ? copy.cart.item : copy.cart.items}
              </span>
            )}
          </h2>
          <button
            type="button"
            onClick={close}
            ref={closeRef}
            aria-label={copy.cart.close}
            className="drawer__close"
          >
            <X size={20} strokeWidth={1.6} aria-hidden="true" />
          </button>
        </header>

        {lines.length === 0 ? (
          <div className="drawer__empty">
            <p className="drawer__empty-title">{copy.cart.empty}</p>
            <p className="drawer__empty-body">{copy.cart.emptyBody}</p>
            <Link to="/shop" className="btn btn--primary" onClick={close} tabIndex={isOpen ? 0 : -1}>
              {copy.cart.startShopping}
            </Link>
          </div>
        ) : (
          <>
            <ul className="drawer__lines">
              {lines.map((line) => (
                <CartItem key={line.productId} line={line} onNavigate={close} />
              ))}
            </ul>

            <footer className="drawer__foot">
              <CartSummary subtotal={subtotal} />
              <button
                type="button"
                className="btn btn--primary btn--block"
                onClick={() => {
                  close();
                  navigate('/checkout');
                }}
                tabIndex={isOpen ? 0 : -1}
              >
                {copy.cart.checkout}
              </button>
              <button type="button" className="drawer__continue" onClick={close}>
                {copy.cart.continue}
              </button>
            </footer>
          </>
        )}
      </div>
    </div>
  );
}
