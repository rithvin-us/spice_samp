import { create } from 'zustand';
import { CartItem, ColorOption, Product } from '../types';

interface CartState {
  items: CartItem[];
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
  addItem: (product: Product, selectedColor: ColorOption) => void;
  removeItem: (productId: string, colorId: string) => void;
  updateQuantity: (productId: string, colorId: string, quantity: number) => void;
  clearCart: () => void;
  getTotalItems: () => number;
  getSubtotal: () => number;
}

export const useCartStore = create<CartState>((set, get) => ({
  items: [],
  isOpen: false,
  openCart: () => set({ isOpen: true }),
  closeCart: () => set({ isOpen: false }),
  toggleCart: () => set((state) => ({ isOpen: !state.isOpen })),

  addItem: (product, selectedColor) => {
    set((state) => {
      const existingIndex = state.items.findIndex(
        (item) => item.product.id === product.id && item.selectedColor.id === selectedColor.id
      );

      if (existingIndex > -1) {
        const updated = [...state.items];
        updated[existingIndex].quantity += 1;
        return { items: updated, isOpen: true };
      }

      return {
        items: [...state.items, { product, selectedColor, quantity: 1 }],
        isOpen: true,
      };
    });
  },

  removeItem: (productId, colorId) => {
    set((state) => ({
      items: state.items.filter(
        (item) => !(item.product.id === productId && item.selectedColor.id === colorId)
      ),
    }));
  },

  updateQuantity: (productId, colorId, quantity) => {
    if (quantity <= 0) {
      get().removeItem(productId, colorId);
      return;
    }
    set((state) => ({
      items: state.items.map((item) => {
        if (item.product.id === productId && item.selectedColor.id === colorId) {
          return { ...item, quantity };
        }
        return item;
      }),
    }));
  },

  clearCart: () => set({ items: [] }),

  getTotalItems: () => get().items.reduce((total, item) => total + item.quantity, 0),

  getSubtotal: () =>
    get().items.reduce((total, item) => total + item.product.price * item.quantity, 0),
}));
