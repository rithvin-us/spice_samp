import { Minus, Plus } from 'lucide-react';
import { useT } from '../../hooks/useTranslation';

interface Props {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  label?: string;
}

export default function QuantitySelector({
  value,
  onChange,
  min = 1,
  max = 20,
  label,
}: Props) {
  const { copy } = useT();

  return (
    <div className="qty" role="group" aria-label={label ?? copy.product.quantity}>
      <button
        type="button"
        className="qty__btn"
        onClick={() => onChange(Math.max(min, value - 1))}
        disabled={value <= min}
        aria-label={copy.product.decrease}
      >
        <Minus size={15} strokeWidth={2} aria-hidden="true" />
      </button>
      <output className="qty__value" aria-live="polite">
        {value}
      </output>
      <button
        type="button"
        className="qty__btn"
        onClick={() => onChange(Math.min(max, value + 1))}
        disabled={value >= max}
        aria-label={copy.product.increase}
      >
        <Plus size={15} strokeWidth={2} aria-hidden="true" />
      </button>
    </div>
  );
}
