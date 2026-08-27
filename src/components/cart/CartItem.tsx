import { Link } from 'react-router-dom';
import { Trash2 } from 'lucide-react';
import QuantitySelector from '../products/QuantitySelector';
import type { CartLine } from '../../types';
import { useT } from '../../hooks/useTranslation';
import { useCartStore } from '../../store/cartStore';

export default function CartItem({ line, onNavigate }: { line: CartLine; onNavigate: () => void }) {
  const { copy, tr, price } = useT();
  const setQuantity = useCartStore((s) => s.setQuantity);
  const remove = useCartStore((s) => s.remove);

  return (
    <li className="cline">
      <Link to={`/products/${line.slug}`} className="cline__media" onClick={onNavigate}>
        <img src={line.image} alt="" loading="lazy" />
      </Link>

      <div className="cline__body">
        <Link to={`/products/${line.slug}`} className="cline__name" onClick={onNavigate}>
          {tr(line.name)}
        </Link>
        <p className="cline__tamil is-tamil" lang="ta">
          {line.tamilName}
        </p>
        <p className="cline__meta">
          {line.weight} {copy.common.grams} · {price(line.price)}
        </p>

        <div className="cline__controls">
          <QuantitySelector
            value={line.quantity}
            onChange={(q) => setQuantity(line.productId, q)}
            label={`${copy.product.quantity} — ${tr(line.name)}`}
          />
          <button
            type="button"
            className="cline__remove"
            onClick={() => remove(line.productId)}
            aria-label={`${copy.cart.remove} — ${tr(line.name)}`}
          >
            <Trash2 size={15} strokeWidth={1.6} aria-hidden="true" />
          </button>
        </div>
      </div>

      <p className="cline__total">{price(line.price * line.quantity)}</p>
    </li>
  );
}
