import { create } from 'zustand';
import { ColorOption, LightingPreset, Product } from '../types';
import { PRODUCTS } from '../data/products';

interface ViewerState {
  activeProduct: Product | null;
  selectedColor: ColorOption | null;
  lightingPreset: LightingPreset;
  autoRotate: boolean;
  wireframe: boolean;
  explosionLevel: number; // 0 (normal) to 1 (exploded view)
  isModalOpen: boolean;
  isLowPowerMode: boolean;

  openProductModal: (product: Product, initialColor?: ColorOption) => void;
  closeProductModal: () => void;
  setSelectedColor: (color: ColorOption) => void;
  setLightingPreset: (preset: LightingPreset) => void;
  toggleAutoRotate: () => void;
  toggleWireframe: () => void;
  setExplosionLevel: (level: number) => void;
  toggleLowPowerMode: () => void;
  setLowPowerMode: (enabled: boolean) => void;
}

export const useViewerStore = create<ViewerState>((set) => ({
  activeProduct: PRODUCTS[0],
  selectedColor: PRODUCTS[0].colors[0],
  lightingPreset: 'studio',
  autoRotate: true,
  wireframe: false,
  explosionLevel: 0,
  isModalOpen: false,
  isLowPowerMode: typeof window !== 'undefined' && /Android|iPhone|iPod|Mobile/i.test(navigator.userAgent),


  openProductModal: (product, initialColor) => {
    const color = initialColor || product.colors.find((c) => c.id === product.defaultColorId) || product.colors[0];
    set({
      activeProduct: product,
      selectedColor: color,
      isModalOpen: true,
      explosionLevel: 0,
    });
  },

  closeProductModal: () => set({ isModalOpen: false }),

  setSelectedColor: (color) => set({ selectedColor: color }),

  setLightingPreset: (preset) => set({ lightingPreset: preset }),

  toggleAutoRotate: () => set((state) => ({ autoRotate: !state.autoRotate })),

  toggleWireframe: () => set((state) => ({ wireframe: !state.wireframe })),

  setExplosionLevel: (level) => set({ explosionLevel: level }),

  toggleLowPowerMode: () => set((state) => ({ isLowPowerMode: !state.isLowPowerMode })),

  setLowPowerMode: (enabled) => set({ isLowPowerMode: enabled }),
}));

