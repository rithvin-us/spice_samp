import { useCallback, useRef } from 'react';
import { Link } from 'react-router-dom';
import HeroFrameSequence from './HeroFrameSequence';
import { useT } from '../../hooks/useTranslation';
import { useCapability, useMediaQuery } from '../../hooks/useCapability';
import { allowsSequence } from '../../lib/performance';
import manifest from '../../data/heroManifest.json';
import { clamp, mapRange } from '../../lib/utils';

/**
 * The cinematic opening.
 *
 * The sequence is pinned with `position: sticky` rather than a scroll-jacking
 * pin, so the page never fights the reader and nothing shifts on load. The
 * headline, supporting line and both calls to action are ordinary HTML — they
 * are selectable, translated, indexed and reachable by keyboard.
 *
 * There is deliberately no scroll instruction anywhere in this section. The
 * opening frame is composed to be looked at, and the movement of the sequence
 * is what invites the reader onward.
 */
export default function HeroSection() {
  const { copy } = useT();
  const tier = useCapability();
  const scrollerRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);

  /**
   * The mobile composition is a cinematic panel with the wordmark and copy
   * below it, not a cropped version of the desktop frame — a 16:9 sequence
   * covering a tall phone screen would cut the closing lockup in half.
   */
  const panelLayout = !useMediaQuery('(min-width: 48rem) and (min-aspect-ratio: 4/3)');
  const sequenceOn = allowsSequence(tier);

  /**
   * Progress drives the overlay directly through the DOM. Fading the headline
   * through React state would re-render the section on every frame.
   */
  const handleProgress = useCallback(
    (progress: number) => {
      if (panelLayout) return;

      const overlay = overlayRef.current;
      if (overlay) {
        // Copy holds for the opening beat, then clears the frame before the
        // sequence resolves into the SOLI lockup.
        const fade = 1 - clamp(mapRange(progress, 0.05, 0.3, 0, 1));
        overlay.style.opacity = String(fade);
        overlay.style.translate = `0 ${(1 - fade) * -1.5}rem`;
        overlay.style.pointerEvents = fade < 0.15 ? 'none' : 'auto';
      }
      const stage = stageRef.current;
      if (stage) {
        // The closing frames sit on cream; softening the scrim lets the hero hand
        // over to the page instead of ending on a hard edge.
        stage.style.setProperty('--scrim', String(1 - clamp(mapRange(progress, 0.6, 0.92, 0, 1))));
      }
    },
    [panelLayout]
  );


  const overlay = (
    <div className="hero__overlay" ref={overlayRef}>
      <img
        src="/img/soli-logo.png"
        alt={copy.hero.logoAlt}
        className="hero__logo"
        width={560}
        height={366}
      />
      <h1 className="hero__title">
        <span>{copy.brand.lineOne}</span>
        <span>{copy.brand.lineTwo}</span>
      </h1>
      <p className="hero__supporting">{copy.hero.supporting}</p>
      <div className="hero__actions">
        <Link className="btn btn--primary" to="/shop">
          {copy.hero.primaryCta}
        </Link>
        <a className="btn btn--ghost" href="#heritage">
          {copy.hero.secondaryCta}
        </a>
      </div>
    </div>
  );

  /* Static presentation: reduced motion, low-capability devices, or any
     session where the sequence is not going to run. Everything readable and
     every link reachable — only the movement is gone. */
  if (!sequenceOn) {
    return (
      <section className="hero hero--static" aria-label={copy.brand.name}>
        <div className={`hero__stage ${panelLayout ? 'hero__stage--panel' : ''}`} ref={stageRef}>
          <img
            src={manifest.poster}
            alt="Whole cardamom, dried chillies and cinnamon on a wooden kitchen surface"
            className="hero__poster hero__poster--static"
            width={manifest.desktop.width}
            height={manifest.desktop.height}
          />
          {overlay}
        </div>
      </section>
    );
  }

  return (
    <section
      className={`hero ${panelLayout ? 'hero--panel' : ''}`}
      ref={scrollerRef}
      aria-label={copy.brand.name}
    >
      <div className={`hero__stage ${panelLayout ? 'hero__stage--panel' : ''}`} ref={stageRef}>
        <div className="hero__frame">
          <HeroFrameSequence
            progressRef={scrollerRef}
            tier={tier}
            useMobileSet={panelLayout}
            onProgress={handleProgress}
          />
        </div>
        {overlay}
      </div>
    </section>
  );
}
