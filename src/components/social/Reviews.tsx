import { useEffect } from 'react';
import { Star } from 'lucide-react';
import SectionLabel from '../ui/SectionLabel';
import ClientStrip from './ClientStrip';
import { reviews } from '../../data/social';
import { getProduct } from '../../data/products';
import { useT } from '../../hooks/useTranslation';
import { observeReveals } from '../../lib/animations';

/**
 * Customer reviews.
 *
 * The content is placeholder — see `src/data/social.ts`. Two things follow from
 * that and are deliberate: the section carries a visible prototype notice, and
 * the ratings are rendered as plain markup with no review or aggregateRating
 * structured data, so they cannot be picked up and shown as genuine ratings in
 * search results.
 */
export default function Reviews() {
  const { copy, tr } = useT();

  useEffect(() => observeReveals(), []);

  return (
    <section className="section reviews" id="reviews">
      <div className="shell">
        <div className="reviews__head">
          <div>
            <SectionLabel index="07" label={copy.reviews.label} />
            <h2 className="reviews__title">
              {copy.reviews.title} <em>{copy.reviews.titleAccent}</em>
            </h2>
          </div>
          <p className="reviews__body">{copy.reviews.body}</p>
        </div>

        <ul className="reviews__list">
          {reviews.map((review, i) => {
            const product = getProduct(review.productSlug);
            return (
              <li
                key={review.id}
                className="review reveal"
                style={{ '--reveal-delay': `${i * 70}ms` } as React.CSSProperties}
              >
                <p
                  className="review__rating"
                  aria-label={`${copy.reviews.ratingLabel} ${review.rating} ${copy.reviews.outOf}`}
                >
                  {Array.from({ length: 5 }, (_, s) => (
                    <Star
                      key={s}
                      size={13}
                      strokeWidth={1.5}
                      className={s < review.rating ? 'is-filled' : ''}
                      aria-hidden="true"
                    />
                  ))}
                </p>

                <blockquote className="review__quote">{tr(review.quote)}</blockquote>

                <footer className="review__foot">
                  <span className="review__initial" aria-hidden="true">
                    {review.name.charAt(0)}
                  </span>
                  <span>
                    <span className="review__name">{review.name}</span>
                    <span className="review__meta">
                      {tr(review.role)} · {tr(review.city)}
                    </span>
                  </span>
                </footer>

                {product && (
                  <p className="review__product">
                    <span aria-hidden="true" style={{ background: product.accent }} />
                    {tr(product.name)}
                  </p>
                )}
              </li>
            );
          })}
        </ul>

        <ClientStrip />

        <p className="reviews__disclaimer">
          <span className="reviews__tag">{copy.reviews.sample}</span>
          {copy.reviews.disclaimer}
        </p>
      </div>
    </section>
  );
}
