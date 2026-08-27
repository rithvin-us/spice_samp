import { useEffect } from 'react';
import ProductCard from './ProductCard';
import type { Product } from '../../types';
import { observeReveals } from '../../lib/animations';

interface Props {
  products: Product[];
  priorityCount?: number;
}

export default function ProductGrid({ products, priorityCount = 2 }: Props) {
  // Re-observe whenever the visible set changes (filtering, search, language).
  useEffect(() => observeReveals(), [products]);

  return (
    <div className="grid">
      {products.map((product, i) => (
        <ProductCard key={product.id} product={product} priority={i < priorityCount} />
      ))}
    </div>
  );
}
