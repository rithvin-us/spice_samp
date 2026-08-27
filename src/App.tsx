import { Suspense, lazy, useEffect } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import CartDrawer from './components/cart/CartDrawer';
import Cursor from './components/ui/Cursor';
import LoadingScreen from './components/ui/LoadingScreen';
import HomePage from './pages/HomePage';
import { initSmoothScroll, scrollTo } from './lib/animations';
import { useHtmlLang, useT } from './hooks/useTranslation';

const ShopPage = lazy(() => import('./pages/ShopPage'));
const ProductPage = lazy(() => import('./pages/ProductPage'));
const AboutPage = lazy(() => import('./pages/AboutPage'));
const CheckoutPage = lazy(() => import('./pages/CheckoutPage'));

/** Route changes start at the top; in-page hashes scroll to their section. */
function ScrollManager() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      // Give a lazily loaded route a frame to mount its target.
      const id = window.setTimeout(() => scrollTo(hash, -80), 60);
      return () => window.clearTimeout(id);
    }
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, [pathname, hash]);

  return null;
}

export default function App() {
  const { copy } = useT();
  useHtmlLang();

  useEffect(() => initSmoothScroll(), []);

  return (
    <>
      <a className="skip-link" href="#main">
        {copy.common.skipToContent}
      </a>

      <Cursor />
      <Navbar />
      <ScrollManager />

      <main id="main">
        <Suspense fallback={<LoadingScreen />}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/shop" element={<ShopPage />} />
            <Route path="/products/:slug" element={<ProductPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="*" element={<HomePage />} />
          </Routes>
        </Suspense>
      </main>

      <Footer />
      <CartDrawer />
    </>
  );
}
