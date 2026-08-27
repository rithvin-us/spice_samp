import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { X } from 'lucide-react';
import LanguageToggle from './LanguageToggle';
import { useT } from '../../hooks/useTranslation';
import { trapFocus } from '../../lib/utils';

interface Props {
  open: boolean;
  onClose: () => void;
  links: { to: string; label: string }[];
}

export default function MobileMenu({ open, onClose, links }: Props) {
  const { copy } = useT();
  const panelRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const previous = document.activeElement as HTMLElement | null;
    closeRef.current?.focus();
    document.body.style.overflow = 'hidden';

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (panelRef.current) trapFocus(panelRef.current, e);
    };
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
      previous?.focus();
    };
  }, [open, onClose]);

  return (
    <div className={`menu ${open ? 'is-open' : ''}`} aria-hidden={!open}>
      <div
        className="menu__panel"
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label={copy.nav.menu}
      >
        <div className="menu__top">
          <img src="/img/soli-logo.png" alt={copy.brand.name} width={560} height={366} />
          <button
            type="button"
            className="menu__close"
            onClick={onClose}
            ref={closeRef}
            aria-label={copy.nav.close}
          >
            <X size={22} strokeWidth={1.5} aria-hidden="true" />
          </button>
        </div>

        <nav className="menu__links" aria-label={copy.nav.menu}>
          {links.map((link, i) => (
            <Link
              key={link.to}
              to={link.to}
              className="menu__link"
              onClick={onClose}
              style={{ '--i': i } as React.CSSProperties}
              tabIndex={open ? 0 : -1}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="menu__foot">
          <LanguageToggle size="large" />
          <p className="menu__tagline">
            {copy.brand.lineOne} {copy.brand.lineTwo}
          </p>
        </div>
      </div>
      <button
        type="button"
        className="menu__scrim"
        onClick={onClose}
        tabIndex={-1}
        aria-hidden="true"
      />
    </div>
  );
}
