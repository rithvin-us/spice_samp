import { useEffect } from 'react';
import HeroSection from '../components/hero/HeroSection';
import BrandStatement from '../components/home/BrandStatement';
import PantrySection from '../components/home/PantrySection';
import ProductSpotlight from '../components/home/ProductSpotlight';
import MakingOfSection from '../components/making/MakingOfSection';
import HeritageSection from '../components/heritage/HeritageSection';
import AboutTeaser from '../components/home/AboutTeaser';
import { observeReveals } from '../lib/animations';
import { useMeta } from '../hooks/useMeta';
import { useT } from '../hooks/useTranslation';

export default function HomePage() {
  const { copy } = useT();

  useMeta({
    title: `${copy.brand.name} — ${copy.brand.lineOne} ${copy.brand.lineTwo}`,
    description: copy.hero.supporting,
  });

  useEffect(() => observeReveals(), []);

  return (
    <>
      {/* 01 */} <HeroSection />
      {/* 02 */} <BrandStatement />
      {/* 03 */} <PantrySection />
      {/* 04 */} <ProductSpotlight />
      {/* 05 */} <MakingOfSection />
      {/* 06 */} <HeritageSection />
      {/* 07 */} <AboutTeaser />
    </>
  );
}
