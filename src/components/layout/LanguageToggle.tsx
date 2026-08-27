import { LANGUAGE_LABELS } from '../../data/translations';
import { useLanguageStore } from '../../store/languageStore';
import { useT } from '../../hooks/useTranslation';
import type { Language } from '../../types';

const ORDER: Language[] = ['en', 'ta'];

/**
 * EN | தமிழ்
 *
 * A two-state group rather than a dropdown: with exactly two languages, one tap
 * should switch, and both options should always be legible in their own script.
 */
export default function LanguageToggle({ size = 'default' }: { size?: 'default' | 'large' }) {
  const language = useLanguageStore((s) => s.language);
  const setLanguage = useLanguageStore((s) => s.setLanguage);
  const { copy } = useT();

  return (
    <div
      className={`lang lang--${size}`}
      role="group"
      aria-label={copy.footer.language}
    >
      {ORDER.map((code, i) => (
        <span key={code} className="lang__slot">
          {i > 0 && <span className="lang__divider" aria-hidden="true" />}
          <button
            type="button"
            className={`lang__btn ${language === code ? 'is-active' : ''} ${
              code === 'ta' ? 'is-tamil' : ''
            }`}
            lang={code}
            aria-pressed={language === code}
            onClick={() => setLanguage(code)}
          >
            {LANGUAGE_LABELS[code]}
          </button>
        </span>
      ))}
    </div>
  );
}
