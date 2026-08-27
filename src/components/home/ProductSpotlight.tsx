import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import ProductViewer from '../products/ProductViewer';
import SectionLabel from '../ui/SectionLabel';
import { getIngredients } from '../../data/ingredients';
import { featuredProducts } from '../../data/products';
import { useT } from '../../hooks/useTranslation';
import { useCartStore } from '../../store/cartStore';

/**
 * 04 — Product experience.
 *
 * One blend at a time, on a stand, with the next one an arrow away. The list is
 * navigated rather than enumerated: a row of named tabs would quietly announce
 * exactly how many blends exist, which is the wrong impression for a pantry
 * meant to grow. Wrapping at both ends keeps it a loop.
 */
export default function ProductSpotlight() {
  const { copy, tr, price } = useT();
  const items = featuredProducts();
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const add = useCartStore((s) => s.add);

  const product = items[index];
  const notes = getIngredients(product.ingredients).slice(0, 4);

  const go = (step: number) => {
    setDirection(step);
    setIndex((i) => (i + step + items.length) % items.length);
  };

  return (
    <section className="section spotlight" id="spotlight">
      <div className="shell">
        <div className="spotlight__head">
          <SectionLabel index="04" label={copy.pantry.label} />
          <div className="spotlight__nav">
            <button
              type="button"
              className="spotlight__arrow"
              onClick={() => go(-1)}
              aria-label={copy.spotlight.previous}
            >
              <ArrowLeft size={18} strokeWidth={1.6} aria-hidden="true" />
            </button>
            <button
              type="button"
              className="spotlight__arrow"
              onClick={() => go(1)}
              aria-label={copy.spotlight.next}
            >
              <ArrowRight size={18} strokeWidth={1.6} aria-hidden="true" />
            </button>
          </div>
        </div>

        <div className="spotlight__grid">
          <div className="spotlight__visual">
            {/* Keyed so the packet re-enters when the blend changes. */}
            <div
              className="spotlight__swap"
              key={product.id}
              data-direction={direction > 0 ? 'next' : 'prev'}
            >
              <ProductViewer product={product} />
            </div>
          </div>

          <div className="spotlight__info" aria-live="polite">
            <div className="spotlight__swap" key={`${product.id}-info`}>
              <h2 className="spotlight__name">{tr(product.name)}</h2>
              <p className="spotlight__tamil is-tamil-display" lang="ta">
                {product.tamilName}
              </p>
              <p className="spotlight__tagline">{tr(product.tagline)}</p>

              <ul className="spotlight__notes">
                {notes.map((n) => (
                  <li key={n.id} style={{ '--dot': n.colour } as React.CSSProperties}>
                    <span aria-hidden="true" />
                    <strong>{tr(n.name)}</strong>
                    <span className="spotlight__note">{tr(n.note)}</span>
                  </li>
                ))}
              </ul>

              <div className="spotlight__meta">
                <span className="spotlight__price">{price(product.price)}</span>
                <span className="spotlight__weight">
                  {product.weight} {copy.common.grams}
                </span>
              </div>
            </div>

            <div className="spotlight__actions">
              <button type="button" className="btn btn--primary" onClick={() => add(product, 1)}>
                {copy.product.add}
              </button>
              <Link to={`/products/${product.slug}`} className="btn btn--ghost">
                {copy.product.view}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
