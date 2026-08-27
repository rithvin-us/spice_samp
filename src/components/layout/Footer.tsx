import { Link } from 'react-router-dom';
import LanguageToggle from './LanguageToggle';
import { useT } from '../../hooks/useTranslation';
import { products } from '../../data/products';

export default function Footer() {
  const { copy, tr } = useT();
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="shell footer__inner">
        <div className="footer__brand">
          <img
            src="/img/soli-logo.png"
            alt={copy.brand.name}
            width={560}
            height={366}
            loading="lazy"
          />
          <p className="footer__tagline">{copy.footer.tagline}</p>
          <p className="footer__line">
            {copy.brand.lineOne} {copy.brand.lineTwo}
          </p>
        </div>

        <nav className="footer__col" aria-label={copy.footer.shop}>
          <h2 className="footer__heading">{copy.footer.shop}</h2>
          <ul>
            {products.map((product) => (
              <li key={product.id}>
                <Link to={`/products/${product.slug}`} className="link-underline">
                  {tr(product.name)}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav className="footer__col" aria-label={copy.footer.explore}>
          <h2 className="footer__heading">{copy.footer.explore}</h2>
          <ul>
            <li>
              <Link to="/shop" className="link-underline">
                {copy.nav.shop}
              </Link>
            </li>
            <li>
              <Link to="/#process" className="link-underline">
                {copy.nav.process}
              </Link>
            </li>
            <li>
              <Link to="/#heritage" className="link-underline">
                {copy.nav.story}
              </Link>
            </li>
            <li>
              <Link to="/about" className="link-underline">
                {copy.nav.about}
              </Link>
            </li>
          </ul>
        </nav>

        <div className="footer__col footer__col--note">
          <h2 className="footer__heading">{copy.footer.prototype}</h2>
          <p className="footer__note">{copy.footer.prototypeNote}</p>
          <LanguageToggle />
        </div>
      </div>

      <div className="shell footer__base">
        <p>
          © {year} {copy.footer.rights}
        </p>
        <p className="footer__base-tamil is-tamil" lang="ta">
          பாரம்பரியத்தில் அரைத்தது.
        </p>
      </div>
    </footer>
  );
}
