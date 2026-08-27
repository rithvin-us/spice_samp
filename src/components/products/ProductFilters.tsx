import { Search, X } from 'lucide-react';
import { FILTERS, type ProductFilter } from '../../data/products';
import { useT } from '../../hooks/useTranslation';

interface Props {
  filter: ProductFilter;
  onFilter: (filter: ProductFilter) => void;
  search: string;
  onSearch: (search: string) => void;
  resultCount: number;
}

export default function ProductFilters({
  filter,
  onFilter,
  search,
  onSearch,
  resultCount,
}: Props) {
  const { copy } = useT();

  const labels: Record<ProductFilter, string> = {
    all: copy.shop.filterAll,
    veg: copy.shop.filterVeg,
    'non-veg': copy.shop.filterNonVeg,
    signature: copy.shop.filterSignature,
  };

  return (
    <div className="filters">
      <div className="filters__row">
        <div className="filters__group" role="group" aria-label={copy.shop.filterHint}>
          {FILTERS.map((value) => (
            <button
              key={value}
              type="button"
              className={`chip ${filter === value ? 'is-active' : ''}`}
              onClick={() => onFilter(value)}
              aria-pressed={filter === value}
            >
              {labels[value]}
            </button>
          ))}
        </div>

        <div className="filters__search">
          <Search size={16} strokeWidth={1.7} aria-hidden="true" />
          <input
            type="search"
            value={search}
            onChange={(e) => onSearch(e.target.value)}
            placeholder={copy.shop.searchPlaceholder}
            aria-label={copy.shop.search}
          />
          {search && (
            <button type="button" onClick={() => onSearch('')} aria-label={copy.shop.clear}>
              <X size={15} strokeWidth={1.8} aria-hidden="true" />
            </button>
          )}
        </div>
      </div>

      <p className="filters__count" aria-live="polite">
        {resultCount} {resultCount === 1 ? copy.shop.resultsOne : copy.shop.resultsMany}
        <span className="filters__hint">{copy.shop.filterHint}</span>
      </p>
    </div>
  );
}
