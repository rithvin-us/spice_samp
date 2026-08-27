import { Suspense, lazy, useEffect } from 'react';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
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

/** Route changes start at the top; in-page hashes scroll to their section.
 *  Scrolling UP from the top of sub-pages seamlessly transitions back to Home hero animation.
 */
function ScrollManager() {
  const { pathname, hash } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (hash) {
      // Give a lazily loaded route a frame to mount its target.
      const id = window.setTimeout(() => scrollTo(hash, -80), 60);
      return () => window.clearTimeout(id);
    }
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, [pathname, hash]);

  // Handle scrolling UP at the top of subpages (e.g. /shop) to navigate to Home
  useEffect(() => {
    if (pathname === '/') return;

    let touchStartY = 0;
    let wheelAccumulator = 0;

    const handleWheel = (e: WheelEvent) => {
      if (window.scrollY <= 10 && e.deltaY < -15) {
        wheelAccumulator += Math.abs(e.deltaY);
        if (wheelAccumulator > 30) {
          wheelAccumulator = 0;
          navigate('/');
        }
      } else {
        wheelAccumulator = 0;
      }
    };

    const handleTouchStart = (e: TouchEvent) => {
      if (window.scrollY <= 10 && e.touches.length === 1) {
        touchStartY = e.touches[0].clientY;
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (window.scrollY <= 10 && touchStartY > 0) {
        const deltaY = e.touches[0].clientY - touchStartY;
        if (deltaY > 45) {
          touchStartY = 0;
          navigate('/');
        }
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: true });
    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });

    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
    };
  }, [pathname, navigate]);

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
