import { Suspense, lazy, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { processStages } from '../../data/heritage';
import { useT } from '../../hooks/useTranslation';
import { useCapability } from '../../hooks/useCapability';
import { allowsWebGL } from '../../lib/performance';
import { clamp } from '../../lib/utils';
import SectionLabel from '../ui/SectionLabel';

const SpiceJourneyScene = lazy(() => import('./SpiceJourneyScene'));

/**
 * FROM SPICE TO MASALA — the seven stages.
 *
 * The section pins with `position: sticky` and reads its own scroll progress in
 * a single rAF loop. That progress drives three things: the WebGL scene (via a
 * ref, never state), the active stage index (state, but only seven times), and
 * the progress rail.
 *
 * With WebGL unavailable or motion reduced, the same seven stages are presented
 * as a plain list. No copy, no stage and no product link lives only inside the
 * canvas.
 */
export default function MakingOfSection() {
  const { copy, tr } = useT();
  const tier = useCapability();
  const sectionRef = useRef<HTMLElement>(null);
  const progressRef = useRef(0);
  const railRef = useRef<HTMLDivElement>(null);
  const packRef = useRef<HTMLImageElement>(null);
  const [active, setActive] = useState(0);
  const [inView, setInView] = useState(false);
  const inViewRef = useRef(false);

  /**
   * The scene runs on phones too — it is the signature section, and dropping it
   * there left mobile with a plain list where desktop got the whole idea. The
   * cost is managed instead of avoided: the chunk is lazy and only requested
   * once the section is near the viewport, the instance count roughly halves
   * below the `high` tier, and `low`/`reduced` still fall back to the list.
   */
  const use3D = allowsWebGL(tier);
  const total = processStages.length;

  /** One loop for the whole section. */
  useEffect(() => {
    const section = sectionRef.current;
    if (!section || !use3D) return;

    let rafId = 0;
    let lastActive = -1;

    const tick = () => {
      rafId = requestAnimationFrame(tick);
      const rect = section.getBoundingClientRect();
      // Skip all work while the section is nowhere near the viewport.
      const near = rect.top < window.innerHeight * 1.2 && rect.bottom > -window.innerHeight * 0.2;
      if (near !== inViewRef.current) {
        inViewRef.current = near;
        setInView(near);
      }
      if (!near) return;

      const travel = rect.height - window.innerHeight;
      const progress = travel <= 0 ? 0 : clamp(-rect.top / travel);
      progressRef.current = progress;

      const index = Math.min(total - 1, Math.floor(progress * total * 0.999));
      if (index !== lastActive) {
        lastActive = index;
        setActive(index);
      }

      if (railRef.current) {
        railRef.current.style.setProperty('--rail', String(progress));
      }
      // The real packet arrives as the blend is packed, per the PACK stage.
      if (packRef.current) {
        const reveal = clamp((progress - 0.72) / 0.16);
        packRef.current.style.opacity = String(reveal);
        packRef.current.style.scale = String(0.94 + reveal * 0.06);
      }
    };

    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [use3D, total]);

  const stage = processStages[active];

  /* --------------------------------------------------- static presentation */
  if (!use3D) {
    return (
      <section className="section journey journey--static" id="process" ref={sectionRef}>
        <div className="shell">
          <SectionLabel index="05" label={copy.process.label} />
          <div className="journey__intro">
            <h2 className="journey__title">
              {copy.process.title} <em>{copy.process.titleAccent}</em>
            </h2>
            <p className="journey__subtitle">{copy.process.subtitle}</p>
            <p className="lede">{copy.process.body}</p>
          </div>

          <ol className="stages">
            {processStages.map((s) => (
              <li key={s.id} className="stages__item reveal">
                <span className="stages__index">{s.index}</span>
                <div>
                  <h3 className="stages__title">{tr(s.title)}</h3>
                  <p className="stages__body">{tr(s.body)}</p>
                </div>
                <span className="stages__material">{tr(s.material)}</span>
              </li>
            ))}
          </ol>

          <div className="journey__close">
            <p className="journey__ready">{copy.process.ready}</p>
            <Link to="/shop" className="btn btn--primary">
              {copy.process.shopNow}
            </Link>
          </div>
        </div>
      </section>
    );
  }

  /* ------------------------------------------------- scrubbed presentation */
  return (
    <section className="journey" id="process" ref={sectionRef}>
      <div className="journey__stage">
        <div className="shell journey__layout">
          <div className="journey__visual">
            {inView && (
              <Suspense fallback={null}>
                <SpiceJourneyScene progressRef={progressRef} tier={tier} />
              </Suspense>
            )}
            {/* The finished blend becomes the real product. */}
            <img
              ref={packRef}
              src="/img/products/chicken-masala.jpg"
              alt=""
              aria-hidden="true"
              className="journey__pack"
              loading="lazy"
            />
          </div>

          <div className="journey__copy">
            <SectionLabel index="05" label={copy.process.label} />
            <h2 className="journey__title">
              {copy.process.title} <em>{copy.process.titleAccent}</em>
            </h2>
            <p className="journey__subtitle">{copy.process.subtitle}</p>

            <div className="journey__stageblock" key={stage.id}>
              <p className="journey__stagemeta">
                <span className="journey__stageindex">{stage.index}</span>
                <span className="journey__stagematerial">{tr(stage.material)}</span>
              </p>
              <h3 className="journey__stagetitle">{tr(stage.title)}</h3>
              <p className="journey__stagebody">{tr(stage.body)}</p>
            </div>

            <div className="journey__rail" ref={railRef}>
              <span className="journey__railfill" aria-hidden="true" />
              <ol className="journey__ticks">
                {processStages.map((s, i) => (
                  <li key={s.id} className={i <= active ? 'is-past' : ''} aria-hidden="true">
                    {s.index}
                  </li>
                ))}
              </ol>
            </div>

            <div className={`journey__close ${active >= total - 2 ? 'is-shown' : ''}`}>
              <p className="journey__ready">{copy.process.ready}</p>
              <Link to="/shop" className="btn btn--primary">
                {copy.process.shopNow}
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* The full sequence in text, for assistive technology and for search —
          the canvas is never the only place this content exists. */}
      <ol className="visually-hidden">
        {processStages.map((s) => (
          <li key={s.id}>
            {s.index} {tr(s.title)}. {tr(s.body)}
          </li>
        ))}
      </ol>
    </section>
  );
}
