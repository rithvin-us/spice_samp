import type { Bilingual, Language } from '../types';

/** Resolve a bilingual value for the active language. */
export const t = (value: Bilingual, lang: Language): string => value[lang] ?? value.en;

export const clamp = (value: number, min = 0, max = 1): number =>
  Math.min(max, Math.max(min, value));

/** Map a value from one range to another, clamped to the output range. */
export const mapRange = (
  value: number,
  inMin: number,
  inMax: number,
  outMin: number,
  outMax: number
): number => {
  if (inMax === inMin) return outMin;
  const p = clamp((value - inMin) / (inMax - inMin));
  return outMin + p * (outMax - outMin);
};

/** Indian rupee formatting, no fractional paise on whole amounts. */
export const formatPrice = (amount: number, lang: Language = 'en'): string =>
  new Intl.NumberFormat(lang === 'ta' ? 'ta-IN' : 'en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: amount % 1 === 0 ? 0 : 2,
  }).format(amount);

export const formatWeight = (grams: number, suffix: string): string => `${grams} ${suffix}`;

export const cx = (...parts: Array<string | false | null | undefined>): string =>
  parts.filter(Boolean).join(' ');

export const pad4 = (n: number): string => String(n).padStart(4, '0');

/** Trap focus inside an element — used by the cart drawer and mobile menu. */
export function trapFocus(container: HTMLElement, event: KeyboardEvent): void {
  if (event.key !== 'Tab') return;
  const focusable = container.querySelectorAll<HTMLElement>(
    'a[href], button:not([disabled]), input, select, textarea, [tabindex]:not([tabindex="-1"])'
  );
  if (!focusable.length) return;
  const first = focusable[0];
  const last = focusable[focusable.length - 1];
  if (event.shiftKey && document.activeElement === first) {
    event.preventDefault();
    last.focus();
  } else if (!event.shiftKey && document.activeElement === last) {
    event.preventDefault();
    first.focus();
  }
}
