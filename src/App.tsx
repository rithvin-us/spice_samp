import React, { useState } from 'react';
import { Header } from './components/ui/Header';
import { Hero } from './components/ui/Hero';
import { ProductGrid } from './components/ui/ProductGrid';
import { ProductModal } from './components/ui/ProductModal';
import { CartDrawer } from './components/ui/CartDrawer';
import { PRODUCTS } from './data/products';
import { Box, Heart, ShieldCheck, Truck, Rotate3d } from 'lucide-react';

export const App: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="min-h-screen bg-[#090b10] text-slate-100 flex flex-col selection:bg-cyan-500 selection:text-white">
      {/* Top Navbar */}
      <Header searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

      {/* Main Content */}
      <main className="flex-1">
        <Hero />
        <ProductGrid products={PRODUCTS} searchQuery={searchQuery} />
      </main>

      {/* Interactive Product Customizer Modal */}
      <ProductModal />

      {/* Slide-out Cart Drawer */}
      <CartDrawer />

      {/* Modern Footer */}
      <footer className="bg-slate-950 border-t border-slate-800/80 py-12 px-4 sm:px-8 mt-16">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-cyan-500 to-purple-500 flex items-center justify-center">
                <Box className="w-5 h-5 text-white" />
              </div>
              <span className="font-extrabold text-white text-lg">AURA 3D</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed mb-4">
              Next-generation spatial commerce engine. Built with WebGL, React Three Fiber, and real-time material customizers.
            </p>
            <div className="flex items-center gap-3 text-slate-400 text-xs">
              <span className="flex items-center gap-1"><Truck className="w-4 h-4 text-cyan-400" /> Fast Delivery</span>
              <span className="flex items-center gap-1"><ShieldCheck className="w-4 h-4 text-purple-400" /> 2-Yr Warranty</span>
            </div>
          </div>

          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4">3D Catalog</h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li><a href="#catalog" className="hover:text-cyan-400">Cyber Headphones</a></li>
              <li><a href="#catalog" className="hover:text-cyan-400">Velocity Sneakers</a></li>
              <li><a href="#catalog" className="hover:text-cyan-400">Matrix Smartwatch</a></li>
              <li><a href="#catalog" className="hover:text-cyan-400">Lumina Parfum</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4">Spatial Tech</h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li className="flex items-center gap-1.5"><Rotate3d className="w-3.5 h-3.5 text-cyan-400" /> WebGL 2.0 Engine</li>
              <li className="flex items-center gap-1.5"><Rotate3d className="w-3.5 h-3.5 text-indigo-400" /> PBR Material Shaders</li>
              <li className="flex items-center gap-1.5"><Rotate3d className="w-3.5 h-3.5 text-purple-400" /> Realtime Orbit Controls</li>
              <li className="flex items-center gap-1.5"><Rotate3d className="w-3.5 h-3.5 text-pink-400" /> Exploded Sub-Assemblies</li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4">Newsletter</h4>
            <p className="text-xs text-slate-400 mb-3">Subscribe for 3D product drops and exclusive release configurations.</p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="Enter email..."
                className="bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-cyan-500 flex-1"
              />
              <button className="btn-primary text-xs py-2 px-3">Join</button>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto pt-6 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© 2026 AURA 3D Commerce Inc. All rights reserved.</p>
          <p className="flex items-center gap-1">
            Engineered with <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" /> for 3D Web Developers
          </p>
        </div>
      </footer>
    </div>
  );
};
