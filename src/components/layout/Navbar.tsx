import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, ShoppingBag } from 'lucide-react';
import LanguageToggle from './LanguageToggle';
import MobileMenu from './MobileMenu';
import { useT } from '../../hooks/useTranslation';
import { useCartCount, useCartStore } from '../../store/cartStore';

export default function Navbar() {
  const { copy } = useT();
  const location = useLocation();
  const count = useCartCount();
  const openCart = useCartStore((s) => s.open);
  const lastAdded = useCartStore((s) => s.lastAdded);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [bump, setBump] = useState(false);

  useEffect(() => {
    // The masthead sits transparently over the opening frames — which are the
    // dark wooden-table shots — and becomes a solid cream bar well before the
    // sequence resolves onto cream. On the panel (mobile) layout the stage is
    // already cream, so the transparent state is suppressed there in CSS.
    const onScroll = () => setScrolled(window.scrollY > window.innerHeight * 0.38);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => setMenuOpen(false), [location.pathname]);

  // Quiet acknowledgement that something landed in the cart.
  useEffect(() => {
    if (!lastAdded) return;
    setBump(true);
    const id = window.setTimeout(() => setBump(false), 620);
    return () => window.clearTimeout(id);
  }, [lastAdded]);

  const links = [
    { to: '/shop', label: copy.nav.shop },
    { to: '/#heritage', label: copy.nav.story },
    { to: '/#process', label: copy.nav.process },
    { to: '/about', label: copy.nav.about },
  ];

  return (
    <>
      <header
        className={`nav ${scrolled ? 'is-scrolled' : ''} ${
          location.pathname === '/' && !scrolled ? 'nav--over' : ''
        }`}
      >
        <div className="nav__inner">
          <Link to="/" className="nav__brand" aria-label={`${copy.brand.name} — ${copy.nav.home}`}>
            <img src="/img/soli-logo.png" alt="" width={560} height={366} />
            <span className="visually-hidden">{copy.brand.name}</span>
          </Link>

          <nav className="nav__links" aria-label="Main">
            {links.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`nav__link ${
                  location.pathname === link.to ? 'is-current' : ''
                }`}
                aria-current={location.pathname === link.to ? 'page' : undefined}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="nav__actions">
            <div className="nav__lang">
              <LanguageToggle />
            </div>

            <button
              type="button"
              className={`nav__cart ${bump ? 'is-bumped' : ''}`}
              onClick={openCart}
              aria-label={`${copy.cart.open}, ${count} ${
                count === 1 ? copy.cart.item : copy.cart.items
              }`}
            >
              <ShoppingBag size={19} strokeWidth={1.6} aria-hidden="true" />
              <span className={`nav__count ${count > 0 ? 'is-filled' : ''}`} aria-hidden="true">
                {count}
              </span>
            </button>

            <button
              type="button"
              className="nav__menu"
              onClick={() => setMenuOpen(true)}
              aria-label={copy.nav.openMenu}
              aria-expanded={menuOpen}
            >
              <Menu size={20} strokeWidth={1.6} aria-hidden="true" />
            </button>
          </div>
        </div>
      </header>

      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} links={links} />
    </>
  );
}
