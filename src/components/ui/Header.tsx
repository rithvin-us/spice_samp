import React from 'react';
import { ShoppingBag, Box, Search, Sparkles, ZapOff } from 'lucide-react';
import { useCartStore } from '../../store/cartStore';
import { useViewerStore } from '../../store/viewerStore';

interface HeaderProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ searchQuery, setSearchQuery }) => {
  const { toggleCart, getTotalItems } = useCartStore();
  const { isLowPowerMode, toggleLowPowerMode } = useViewerStore();
  const totalItems = getTotalItems();


  return (
    <header className="glass-nav sticky top-0 z-40 w-full px-4 sm:px-8 py-4 transition-all">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        {/* Brand Logo */}
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 via-indigo-500 to-purple-500 flex items-center justify-center shadow-lg shadow-cyan-500/20">
            <Box className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-tight text-white flex items-center gap-1.5">
              AURA <span className="text-cyan-400 font-extrabold">3D</span>
            </h1>
            <p className="text-[10px] text-slate-400 tracking-wider uppercase font-semibold">Spatial Commerce</p>
          </div>
        </div>

        {/* Search Input */}
        <div className="hidden md:flex items-center relative flex-1 max-w-md mx-6">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search 3D headphones, footwear, wearables..."
            className="w-full bg-slate-900/60 border border-slate-700/60 rounded-full pl-10 pr-4 py-2 text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-500/80 focus:ring-1 focus:ring-cyan-500/80 transition-all"
          />
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-3">
          {/* Low Power / Performance Mode Toggle */}
          <button
            onClick={toggleLowPowerMode}
            className={`hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold border transition-all ${
              isLowPowerMode
                ? 'bg-amber-950/50 border-amber-500/50 text-amber-400'
                : 'bg-cyan-950/40 border-cyan-500/30 text-cyan-400'
            }`}
            title="Toggle WebGL Performance Mode for low-end mobile/PC devices"
          >
            {isLowPowerMode ? (
              <>
                <ZapOff className="w-3.5 h-3.5" />
                <span>Low Power Mode</span>
              </>
            ) : (
              <>
                <Sparkles className="w-3.5 h-3.5 animate-pulse" />
                <span>60FPS WebGL</span>
              </>
            )}
          </button>

          <button
            onClick={toggleCart}
            className="relative btn-icon"
            aria-label="Open Shopping Cart"
          >

            <ShoppingBag className="w-5 h-5 text-slate-200" />
            {totalItems > 0 && (
              <span className="absolute -top-1.5 -right-1.5 bg-gradient-to-r from-cyan-500 to-indigo-500 text-white font-extrabold text-[11px] w-5 h-5 rounded-full flex items-center justify-center shadow-md animate-bounce">
                {totalItems}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};
