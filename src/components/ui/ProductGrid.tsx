import React, { useState } from 'react';
import { Category, Product } from '../../types';
import { ProductCard } from './ProductCard';
import { Filter, SlidersHorizontal } from 'lucide-react';

interface ProductGridProps {
  products: Product[];
  searchQuery: string;
}

const CATEGORIES: Category[] = ['All', 'Audio', 'Footwear', 'Wearables', 'Lifestyle'];

export const ProductGrid: React.FC<ProductGridProps> = ({ products, searchQuery }) => {
  const [selectedCategory, setSelectedCategory] = useState<Category>('All');
  const [sortBy, setSortBy] = useState<'featured' | 'low-high' | 'high-low' | 'rating'>('featured');

  const filteredProducts = products.filter((product) => {
    const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
    const matchesSearch =
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.tagline.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === 'low-high') return a.price - b.price;
    if (sortBy === 'high-low') return b.price - a.price;
    if (sortBy === 'rating') return b.rating - a.rating;
    return 0; // featured
  });

  return (
    <section id="catalog" className="max-w-7xl mx-auto px-4 sm:px-8 py-12">
      {/* Category Bar & Controls */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 pb-6 border-b border-slate-800">
        <div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight flex items-center gap-2">
            <span>Spatial Products Catalog</span>
            <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-cyan-950 text-cyan-400 border border-cyan-800">
              {sortedProducts.length} Available
            </span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Filter by category or select any item to open the interactive 3D spatial studio.
          </p>
        </div>

        {/* Filter Badges */}
        <div className="flex flex-wrap items-center gap-2">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-full text-xs font-semibold transition-all ${
                selectedCategory === cat
                  ? 'bg-gradient-to-r from-cyan-500 to-indigo-500 text-white shadow-lg shadow-cyan-500/20'
                  : 'bg-slate-900/60 border border-slate-800 text-slate-300 hover:border-slate-700'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Grid Display */}
      {sortedProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {sortedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="glass-panel p-12 text-center max-w-lg mx-auto my-12">
          <Filter className="w-10 h-10 text-slate-500 mx-auto mb-3" />
          <h3 className="text-lg font-bold text-white mb-1">No 3D Products Found</h3>
          <p className="text-xs text-slate-400">
            No products matched your search or category filter. Try clearing your search query.
          </p>
        </div>
      )}
    </section>
  );
};
