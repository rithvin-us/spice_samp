import { useState } from 'react';
import { Link } from 'react-router-dom';
import ProductViewer from '../products/ProductViewer';
import SectionLabel from '../ui/SectionLabel';
import { getIngredients } from '../../data/ingredients';
import { products } from '../../data/products';
import { useT } from '../../hooks/useTranslation';
import { useCartStore } from '../../store/cartStore';

/**
 * 04 — Product experience.
 *
 * One blend, shown at size, with its character legible at a glance: the real
 * pack, the price, the weight and what is in it. The tabs switch which product
 * is on the stand without leaving the page.
 */
export default function ProductSpotlight() {
  const { copy, tr, price } = useT();
  const [index, setIndex] = useState(0);
  const add = useCartStore((s) => s.add);
  const product = products[index];
  const notes = getIngredients(product.ingredients).slice(0, 4);

  return (
    <section className="section spotlight" id="spotlight">
      <div className="shell">
        <SectionLabel index="04" label={copy.pantry.label} />

        <div className="spotlight__grid">
          <div className="spotlight__visual">
            <ProductViewer product={product} />
          </div>

          <div className="spotlight__info">
            <div className="spotlight__tabs" role="tablist" aria-label={copy.pantry.label}>
              {products.map((p, i) => (
                <button
                  key={p.id}
                  type="button"
                  role="tab"
                  aria-selected={i === index}
                  className={`spotlight__tab ${i === index ? 'is-active' : ''}`}
                  onClick={() => setIndex(i)}
                >
                  {tr(p.name).replace('SOLI ', '')}
                </button>
              ))}
            </div>

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

            <div className="spotlight__actions">
              <button
                type="button"
                className="btn btn--primary"
                onClick={() => add(product, 1)}
              >
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
