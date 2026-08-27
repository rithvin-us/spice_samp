import { useEffect, useRef, useState } from 'react';
import { getIngredients } from '../../data/ingredients';
import { useT } from '../../hooks/useTranslation';

/**
 * WHAT'S INSIDE
 *
 * Flavour character only — no proportions and no health claims. Rendered as
 * plain list markup so the information is available to screen readers, to
 * search engines and to anyone for whom the animation never runs.
 */
export default function IngredientBreakdown({ ids }: { ids: string[] }) {
  const { copy, tr } = useT();
  const listRef = useRef<HTMLUListElement>(null);
  const [visible, setVisible] = useState(false);
  const items = getIngredients(ids);

  useEffect(() => {
    const el = listRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  if (!items.length) return null;

  return (
    <section className="inside" aria-labelledby="whats-inside">
      <h2 id="whats-inside" className="inside__title">
        {copy.product.whatsInside}
      </h2>

      <ul className={`inside__list ${visible ? 'is-visible' : ''}`} ref={listRef}>
        {items.map((ingredient, i) => (
          <li
            key={ingredient.id}
            className="inside__item"
            style={{ '--i': i, '--dot': ingredient.colour } as React.CSSProperties}
          >
            <span className="inside__dot" aria-hidden="true" />
            <div>
              <h3 className="inside__name">
                {tr(ingredient.name)}
                <span className="inside__tamil is-tamil" lang="ta">
                  {ingredient.tamilName}
                </span>
              </h3>
              <p className="inside__note">{tr(ingredient.note)}</p>
            </div>
          </li>
        ))}
      </ul>

      <p className="inside__disclaimer">{copy.product.insideNote}</p>
    </section>
  );
}
