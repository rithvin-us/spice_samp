import React from 'react';
import { X, RotateCcw, Box, Sparkles, Sun, Moon, Zap, Layers, ShoppingBag, Check, Star } from 'lucide-react';
import { useViewerStore } from '../../store/viewerStore';
import { useCartStore } from '../../store/cartStore';
import { ProductViewer3D } from '../3d/ProductViewer3D';
import { LightingPreset } from '../../types';

export const ProductModal: React.FC = () => {
  const {
    activeProduct,
    selectedColor,
    isModalOpen,
    closeProductModal,
    setSelectedColor,
    lightingPreset,
    setLightingPreset,
    autoRotate,
    toggleAutoRotate,
    wireframe,
    toggleWireframe,
    explosionLevel,
    setExplosionLevel,
  } = useViewerStore();

  const { addItem } = useCartStore();
  const [added, setAdded] = React.useState(false);

  if (!isModalOpen || !activeProduct) return null;

  const currentColor = selectedColor || activeProduct.colors[0];

  const handleAddToCart = () => {
    addItem(activeProduct, currentColor);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const lightingOptions: { id: LightingPreset; label: string; icon: React.ReactNode }[] = [
    { id: 'studio', label: 'Studio', icon: <Sun className="w-3.5 h-3.5" /> },
    { id: 'cyber', label: 'Cyber Neon', icon: <Zap className="w-3.5 h-3.5" /> },
    { id: 'sunset', label: 'Warm Sunset', icon: <Sparkles className="w-3.5 h-3.5" /> },
    { id: 'minimal', label: 'Minimal', icon: <Moon className="w-3.5 h-3.5" /> },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-6 bg-slate-950/85 backdrop-blur-xl">
      <div className="relative w-full max-w-6xl h-[92vh] glass-panel overflow-hidden flex flex-col lg:flex-row border border-slate-700/80 shadow-2xl">
        
        {/* Close Button */}
        <button
          onClick={closeProductModal}
          className="absolute top-4 right-4 z-20 btn-icon bg-slate-900/80 hover:bg-slate-800"
          aria-label="Close 3D Customizer"
        >
          <X className="w-5 h-5 text-slate-200" />
        </button>

        {/* Left Column: Interactive 3D Viewport & Toolbar */}
        <div className="relative flex-1 h-[45vh] lg:h-full bg-gradient-to-b from-slate-950 via-slate-900/60 to-slate-950 flex flex-col">
          
          {/* Top Viewport Header overlay */}
          <div className="absolute top-4 left-4 z-10 flex items-center gap-2">
            <div className="px-3 py-1.5 rounded-full bg-slate-900/80 border border-slate-700/80 text-cyan-400 text-xs font-semibold flex items-center gap-1.5">
              <Box className="w-3.5 h-3.5" />
              <span>Real-Time Spatial Studio</span>
            </div>
          </div>

          {/* Interactive R3F 3D Canvas */}
          <div className="w-full h-full">
            <ProductViewer3D interactive={true} floating={true} />
          </div>

          {/* Bottom 3D Control Bar Overlay */}
          <div className="absolute bottom-4 left-4 right-4 z-10 flex flex-wrap items-center justify-between gap-3 p-3 rounded-2xl bg-slate-900/80 border border-slate-800 backdrop-blur-md">
            
            {/* Lighting Studio Presets */}
            <div className="flex items-center gap-1.5">
              <span className="text-[11px] font-bold text-slate-400 mr-1 hidden sm:inline">Lighting:</span>
              {lightingOptions.map((opt) => (
                <button
                  key={opt.id}
                  onClick={() => setLightingPreset(opt.id)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-medium flex items-center gap-1 transition-all ${
                    lightingPreset === opt.id
                      ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/50'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {opt.icon}
                  <span className="hidden sm:inline">{opt.label}</span>
                </button>
              ))}
            </div>

            {/* Viewport Toggles */}
            <div className="flex items-center gap-2">
              {/* Auto Rotate Toggle */}
              <button
                onClick={toggleAutoRotate}
                className={`p-2 rounded-lg text-xs flex items-center gap-1 transition-all ${
                  autoRotate ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/50' : 'text-slate-400'
                }`}
                title="Toggle Auto Rotation"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span className="hidden md:inline">Auto Rotate</span>
              </button>

              {/* Wireframe Toggle */}
              <button
                onClick={toggleWireframe}
                className={`p-2 rounded-lg text-xs flex items-center gap-1 transition-all ${
                  wireframe ? 'bg-purple-500/20 text-purple-300 border border-purple-500/50' : 'text-slate-400'
                }`}
                title="Toggle Wireframe Mesh"
              >
                <Layers className="w-3.5 h-3.5" />
                <span className="hidden md:inline">Wireframe</span>
              </button>

              {/* Exploded View Slider */}
              <div className="hidden sm:flex items-center gap-2 pl-2 border-l border-slate-800">
                <span className="text-[11px] font-bold text-slate-400">Explode:</span>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.05"
                  value={explosionLevel}
                  onChange={(e) => setExplosionLevel(parseFloat(e.target.value))}
                  className="w-20 accent-cyan-500 cursor-pointer"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Product Details & Customizer Panel */}
        <div className="w-full lg:w-[420px] h-[47vh] lg:h-full p-6 overflow-y-auto bg-slate-900/90 border-t lg:border-t-0 lg:border-l border-slate-800 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold uppercase tracking-widest text-cyan-400">
                {activeProduct.category}
              </span>
              <div className="flex items-center gap-1 text-amber-400 text-xs font-bold">
                <Star className="w-3.5 h-3.5 fill-amber-400" />
                <span>{activeProduct.rating} ({activeProduct.reviewsCount} reviews)</span>
              </div>
            </div>

            <h2 className="text-2xl font-extrabold text-white tracking-tight mb-1">
              {activeProduct.name}
            </h2>
            <p className="text-xs text-slate-400 mb-4">{activeProduct.tagline}</p>

            <div className="flex items-baseline gap-2 mb-6">
              <span className="text-3xl font-black text-white">${activeProduct.price}</span>
              {activeProduct.originalPrice && (
                <span className="text-sm text-slate-500 line-through">${activeProduct.originalPrice}</span>
              )}
            </div>

            {/* Custom Color Selector */}
            <div className="mb-6">
              <label className="block text-xs font-bold text-slate-300 mb-2">
                Select Finish: <span className="text-cyan-400 font-semibold">{currentColor.name}</span>
              </label>
              <div className="flex items-center gap-3">
                {activeProduct.colors.map((color) => (
                  <button
                    key={color.id}
                    onClick={() => setSelectedColor(color)}
                    className={`swatch ${currentColor.id === color.id ? 'active' : ''}`}
                    style={{ backgroundColor: color.hex, width: '32px', height: '32px' }}
                    title={color.name}
                  />
                ))}
              </div>
            </div>

            {/* Features Breakdown */}
            <div className="mb-6">
              <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-2.5">
                Key Features & Engineering
              </h4>
              <ul className="space-y-2">
                {activeProduct.features.map((feat, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-xs text-slate-300">
                    <Check className="w-4 h-4 text-cyan-400 flex-shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Specifications Table */}
            <div className="mb-6 bg-slate-950/60 rounded-xl p-3.5 border border-slate-800/80">
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                Technical Specifications
              </h4>
              <div className="space-y-1.5 text-xs">
                {Object.entries(activeProduct.specs).map(([key, val]) => (
                  <div key={key} className="flex items-center justify-between border-b border-slate-800/60 pb-1 last:border-0">
                    <span className="text-slate-400 font-medium">{key}</span>
                    <span className="text-slate-200 font-semibold">{val}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom Purchase Bar */}
          <div className="pt-4 border-t border-slate-800">
            <button
              onClick={handleAddToCart}
              className={`w-full btn-primary text-base py-3.5 ${
                added ? 'bg-emerald-600 shadow-emerald-500/30' : ''
              }`}
            >
              {added ? (
                <>
                  <Check className="w-5 h-5" />
                  <span>Added to Cart!</span>
                </>
              ) : (
                <>
                  <ShoppingBag className="w-5 h-5" />
                  <span>Add to Cart (${activeProduct.price})</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
