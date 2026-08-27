import { useCallback, useEffect, useMemo } from 'react';
import { dictionaries } from '../data/translations';
import { useLanguageStore } from '../store/languageStore';
import type { Bilingual, Language } from '../types';
import { formatPrice } from '../lib/utils';

interface Translation {
  lang: Language;
  /** Interface dictionary for the active language. */
  copy: (typeof dictionaries)['en'];
  /** Resolve a bilingual data value (product names, narrative copy, …). */
  tr: (value: Bilingual) => string;
  /** Currency string in the active locale. */
  price: (amount: number) => string;
  /** `lang` attribute to place on Tamil text while the UI is in English. */
  langAttr: Language;
  isTamil: boolean;
}

export function useT(): Translation {
  const lang = useLanguageStore((s) => s.language);
  const copy = dictionaries[lang];
  const tr = useCallback((value: Bilingual) => value[lang] ?? value.en, [lang]);
  const price = useCallback((amount: number) => formatPrice(amount, lang), [lang]);

  return useMemo(
    () => ({ lang, copy, tr, price, langAttr: lang, isTamil: lang === 'ta' }),
    [lang, copy, tr, price]
  );
}

/** Keeps <html lang> in sync with the toggle. */
export function useHtmlLang(): void {
  const lang = useLanguageStore((s) => s.language);
  useEffect(() => {
    document.documentElement.lang = lang === 'ta' ? 'ta' : 'en';
  }, [lang]);
}
