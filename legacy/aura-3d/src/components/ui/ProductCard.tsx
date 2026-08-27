import React, { useState } from 'react';
import { Star, ShoppingBag, Eye, Check } from 'lucide-react';
import { Product, ColorOption } from '../../types';
import { useCartStore } from '../../store/cartStore';
import { useViewerStore } from '../../store/viewerStore';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const [selectedColor, setSelectedColor] = useState<ColorOption>(
    product.colors.find((c) => c.id === product.defaultColorId) || product.colors[0]
  );
  const [addedToast, setAddedToast] = useState(false);

  const { addItem } = useCartStore();
  const { openProductModal } = useViewerStore();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    addItem(product, selectedColor);
    setAddedToast(true);
    setTimeout(() => setAddedToast(false), 1800);
  };

  return (
    <div className="glass-panel group relative flex flex-col justify-between p-5 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-indigo-500/10">
      {/* Top Badges */}
      <div className="flex items-center justify-between z-10">
        <div className="flex items-center gap-2">
          {product.isNew && (
            <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-cyan-500/20 border border-cyan-500/40 text-cyan-300">
              NEW 3D
            </span>
          )}
          {product.originalPrice && (
            <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-rose-500/20 border border-rose-500/40 text-rose-300">
              SAVE ${product.originalPrice - product.price}
            </span>
          )}
        </div>
        <div className="flex items-center gap-1 text-amber-400 text-xs font-bold bg-slate-900/60 px-2 py-1 rounded-full border border-slate-700/60">
          <Star className="w-3.5 h-3.5 fill-amber-400" />
          <span>{product.rating}</span>
        </div>
      </div>

      {/* Center Visual Canvas Preview Trigger */}
      <div
        className="relative h-52 my-3 flex items-center justify-center cursor-pointer group/img overflow-hidden rounded-xl bg-gradient-to-b from-slate-800/20 to-slate-900/40 border border-slate-800/80"
        onClick={() => openProductModal(product, selectedColor)}
      >
        {/* Glow backdrop matching active color */}
        <div
          className="absolute w-32 h-32 rounded-full blur-2xl opacity-40 transition-colors duration-500 group-hover/img:scale-125"
          style={{ backgroundColor: selectedColor.hex }}
        />

        {/* 3D Inspect Hover Overlay */}
        <div className="absolute inset-0 bg-slate-950/40 backdrop-blur-[2px] opacity-0 group-hover/img:opacity-100 transition-opacity flex items-center justify-center z-10">
          <button className="btn-primary text-xs py-2 px-4 shadow-lg shadow-cyan-500/20">
            <Eye className="w-4 h-4" />
            <span>Launch 3D Viewer</span>
          </button>
        </div>

        {/* Product Visual Mock representation */}
        <div className="relative z-0 text-center flex flex-col items-center justify-center p-4">
          <div
            className="w-24 h-24 rounded-full border-4 shadow-2xl flex items-center justify-center transition-all duration-500"
            style={{
              borderColor: selectedColor.hex,
              boxShadow: `0 0 25px ${selectedColor.hex}40`,
              background: `radial-gradient(circle, ${selectedColor.hex}30 0%, rgba(15,23,42,0.9) 100%)`,
            }}
          >
            <span className="text-3xl font-extrabold uppercase tracking-widest text-slate-100 opacity-90">
              {product.category.substring(0, 2)}
            </span>
          </div>
          <span className="text-[11px] font-semibold text-slate-400 mt-3 tracking-wide">
            Click to rotate 3D mesh
          </span>
        </div>
      </div>

      {/* Info Breakdown */}
      <div>
        <span className="text-[11px] font-bold text-cyan-400 uppercase tracking-widest">
          {product.category}
        </span>
        <h3
          className="text-lg font-bold text-white tracking-tight cursor-pointer hover:text-cyan-300 transition-colors"
          onClick={() => openProductModal(product, selectedColor)}
        >
          {product.name}
        </h3>
        <p className="text-xs text-slate-400 line-clamp-1 mt-0.5">{product.tagline}</p>

        {/* Color Swatches */}
        <div className="flex items-center gap-2 my-3">
          <span className="text-[11px] font-medium text-slate-400">Finish:</span>
          <div className="flex items-center gap-1.5">
            {product.colors.map((color) => (
              <button
                key={color.id}
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedColor(color);
                }}
                className={`swatch ${selectedColor.id === color.id ? 'active' : ''}`}
                style={{ backgroundColor: color.hex }}
                title={color.name}
                aria-label={`Select ${color.name} finish`}
              />
            ))}
          </div>
        </div>

        {/* Pricing & Add to Cart */}
        <div className="flex items-center justify-between pt-2 border-t border-slate-800">
          <div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-xl font-extrabold text-white">${product.price}</span>
              {product.originalPrice && (
                <span className="text-xs text-slate-500 line-through">${product.originalPrice}</span>
              )}
            </div>
          </div>

          <button
            onClick={handleAddToCart}
            className={`btn-primary text-xs py-2 px-3.5 ${
              addedToast ? 'bg-emerald-600 shadow-emerald-500/30' : ''
            }`}
          >
            {addedToast ? (
              <>
                <Check className="w-4 h-4" />
                <span>Added!</span>
              </>
            ) : (
              <>
                <ShoppingBag className="w-4 h-4" />
                <span>Add to Cart</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
