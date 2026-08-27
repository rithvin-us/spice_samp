import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import ProductFilters from '../components/products/ProductFilters';
import ProductGrid from '../components/products/ProductGrid';
import SectionLabel from '../components/ui/SectionLabel';
import { queryProducts, type ProductFilter, FILTERS } from '../data/products';
import { useT } from '../hooks/useTranslation';
import { useMeta } from '../hooks/useMeta';

export default function ShopPage() {
  const { copy } = useT();
  const [params, setParams] = useSearchParams();

  const initialFilter = (params.get('filter') ?? 'all') as ProductFilter;
  const [filter, setFilter] = useState<ProductFilter>(
    FILTERS.includes(initialFilter) ? initialFilter : 'all'
  );
  const [search, setSearch] = useState(params.get('q') ?? '');

  useMeta({
    title: `${copy.shop.title} — ${copy.brand.name}`,
    description: copy.shop.subtitle,
  });

  // Filter state lives in the URL so a filtered pantry can be linked and shared.
  useEffect(() => {
    const next = new URLSearchParams();
    if (filter !== 'all') next.set('filter', filter);
    if (search.trim()) next.set('q', search.trim());
    setParams(next, { replace: true });
  }, [filter, search, setParams]);

  const results = useMemo(() => queryProducts(filter, search), [filter, search]);

  return (
    <div className="page shop">
      <header className="shell shop__head">
        <SectionLabel label={copy.nav.shop} />
        <h1 className="shop__title">{copy.shop.title}</h1>
        <p className="lede shop__subtitle">{copy.shop.subtitle}</p>
      </header>

      <div className="shell">
        <ProductFilters
          filter={filter}
          onFilter={setFilter}
          search={search}
          onSearch={setSearch}
          resultCount={results.length}
        />

        {results.length > 0 ? (
          <ProductGrid products={results} priorityCount={3} />
        ) : (
          <div className="empty">
            <p className="empty__title">{copy.shop.empty}</p>
            <p className="empty__body">{copy.shop.emptyBody}</p>
            <button
              type="button"
              className="btn btn--ghost"
              onClick={() => {
                setFilter('all');
                setSearch('');
              }}
            >
              {copy.shop.reset}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
