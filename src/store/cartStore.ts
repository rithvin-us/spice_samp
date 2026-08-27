import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { CartLine, Product } from '../types';

interface CartState {
  lines: CartLine[];
  isOpen: boolean;
  /** Id of the product most recently added — drives the "added" feedback. */
  lastAdded: string | null;

  add: (product: Product, quantity?: number) => void;
  remove: (productId: string) => void;
  increment: (productId: string) => void;
  decrement: (productId: string) => void;
  setQuantity: (productId: string, quantity: number) => void;
  clear: () => void;

  open: () => void;
  close: () => void;
  toggle: () => void;
  clearLastAdded: () => void;
}

const MAX_PER_LINE = 20;

export const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      lines: [],
      isOpen: false,
      lastAdded: null,

      add: (product, quantity = 1) =>
        set((state) => {
          const existing = state.lines.find((l) => l.productId === product.id);
          const lines = existing
            ? state.lines.map((l) =>
                l.productId === product.id
                  ? { ...l, quantity: Math.min(MAX_PER_LINE, l.quantity + quantity) }
                  : l
              )
            : [
                ...state.lines,
                {
                  productId: product.id,
                  slug: product.slug,
                  name: product.name,
                  tamilName: product.tamilName,
                  price: product.price,
                  weight: product.weight,
                  image: product.image,
                  quantity: Math.min(MAX_PER_LINE, quantity),
                },
              ];
          // Adding never navigates and never force-opens the drawer; the count
          // badge and the inline confirmation carry the feedback instead.
          return { lines, lastAdded: product.id };
        }),

      remove: (productId) =>
        set((state) => ({ lines: state.lines.filter((l) => l.productId !== productId) })),

      increment: (productId) =>
        set((state) => ({
          lines: state.lines.map((l) =>
            l.productId === productId
              ? { ...l, quantity: Math.min(MAX_PER_LINE, l.quantity + 1) }
              : l
          ),
        })),

      decrement: (productId) =>
        set((state) => ({
          lines: state.lines
            .map((l) => (l.productId === productId ? { ...l, quantity: l.quantity - 1 } : l))
            .filter((l) => l.quantity > 0),
        })),

      setQuantity: (productId, quantity) =>
        set((state) => ({
          lines: state.lines
            .map((l) =>
              l.productId === productId
                ? { ...l, quantity: Math.max(0, Math.min(MAX_PER_LINE, quantity)) }
                : l
            )
            .filter((l) => l.quantity > 0),
        })),

      clear: () => set({ lines: [], lastAdded: null }),

      open: () => set({ isOpen: true }),
      close: () => set({ isOpen: false }),
      toggle: () => set((state) => ({ isOpen: !state.isOpen })),
      clearLastAdded: () => set({ lastAdded: null }),
    }),
    {
      name: 'soli-cart',
      // Only the contents survive a reload — never the open/closed drawer.
      partialize: (state) => ({ lines: state.lines }),
    }
  )
);

/* ------------------------------------------------------------- selectors */

export const selectCount = (state: CartState): number =>
  state.lines.reduce((sum, l) => sum + l.quantity, 0);

export const selectSubtotal = (state: CartState): number =>
  state.lines.reduce((sum, l) => sum + l.price * l.quantity, 0);

export const useCartCount = (): number => useCartStore(selectCount);
export const useCartSubtotal = (): number => useCartStore(selectSubtotal);
