import React from 'react';
import { ArrowRight, Rotate3d, ShieldCheck, Zap } from 'lucide-react';
import { HeroCanvas3D } from '../3d/HeroCanvas3D';
import { useViewerStore } from '../../store/viewerStore';
import { PRODUCTS } from '../../data/products';

export const Hero: React.FC = () => {
  const { openProductModal } = useViewerStore();

  return (
    <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden py-16 px-4 sm:px-8">
      {/* 3D Background Canvas */}
      <HeroCanvas3D />

      {/* Hero Content Overlay */}
      <div className="relative z-10 max-w-5xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900/80 border border-slate-700/80 text-xs text-slate-300 mb-6 backdrop-blur-md">
          <Rotate3d className="w-4 h-4 text-cyan-400 animate-spin" style={{ animationDuration: '6s' }} />
          <span>Next-Generation Spatial Product Configurator</span>
        </div>

        <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-white mb-6 leading-tight">
          Experience Products in <br />
          <span className="gradient-text-accent">Real-Time 3D & AR</span>
        </h1>

        <p className="text-base sm:text-xl text-slate-300 max-w-2xl mx-auto mb-8 leading-relaxed">
          Customize materials, inspect exploded sub-assemblies, and test lighting studio presets before you buy. Pure 60fps WebGL visual fidelity.
        </p>

        {/* CTA Actions */}
        <div className="flex flex-wrap items-center justify-center gap-4 mb-14">
          <button
            onClick={() => {
              const el = document.getElementById('catalog');
              el?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="btn-primary"
          >
            <span>Explore 3D Catalog</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            onClick={() => openProductModal(PRODUCTS[0])}
            className="btn-secondary"
          >
            <Rotate3d className="w-4 h-4 text-cyan-400" />
            <span>Customize Pulse Pro 3D</span>
          </button>
        </div>

        {/* Value Highlights */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl mx-auto text-left">
          <div className="glass-panel p-4 flex items-start gap-3">
            <div className="p-2 rounded-lg bg-cyan-500/10 text-cyan-400">
              <Rotate3d className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">360° Orbit View</h4>
              <p className="text-xs text-slate-400">Inspect every angle with high-precision camera orbit controls.</p>
            </div>
          </div>

          <div className="glass-panel p-4 flex items-start gap-3">
            <div className="p-2 rounded-lg bg-purple-500/10 text-purple-400">
              <Zap className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">Live Material Swaps</h4>
              <p className="text-xs text-slate-400">Switch colorways and metallic finishes instantly.</p>
            </div>
          </div>

          <div className="glass-panel p-4 flex items-start gap-3">
            <div className="p-2 rounded-lg bg-indigo-500/10 text-indigo-400">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">Exploded Specs</h4>
              <p className="text-xs text-slate-400">Separate internal components to inspect build quality.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
