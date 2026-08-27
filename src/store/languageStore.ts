import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Language } from '../types';

interface LanguageState {
  language: Language;
  setLanguage: (language: Language) => void;
  toggle: () => void;
}

/**
 * The chosen language is remembered between visits and mirrored onto
 * <html lang> so screen readers and font fallbacks follow the interface.
 */
export const useLanguageStore = create<LanguageState>()(
  persist(
    (set) => ({
      language: 'en',
      setLanguage: (language) => set({ language }),
      toggle: () => set((state) => ({ language: state.language === 'en' ? 'ta' : 'en' })),
    }),
    { name: 'soli-language' }
  )
);
