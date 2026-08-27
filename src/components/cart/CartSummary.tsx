import { useT } from '../../hooks/useTranslation';

interface Props {
  subtotal: number;
  showTotal?: boolean;
}

export default function CartSummary({ subtotal, showTotal = false }: Props) {
  const { copy, price } = useT();

  return (
    <dl className="csum">
      <div className="csum__row">
        <dt>{copy.cart.subtotal}</dt>
        <dd>{price(subtotal)}</dd>
      </div>
      <div className="csum__row csum__row--muted">
        <dt>{copy.cart.shipping}</dt>
        <dd>{copy.cart.shippingNote}</dd>
      </div>
      {showTotal && (
        <div className="csum__row csum__row--total">
          <dt>{copy.cart.total}</dt>
          <dd>{price(subtotal)}</dd>
        </div>
      )}
    </dl>
  );
}
