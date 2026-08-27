import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, Star } from 'lucide-react';
import ProductViewer from '../components/products/ProductViewer';
import ProductInfo from '../components/products/ProductInfo';
import IngredientBreakdown from '../components/products/IngredientBreakdown';
import ProductCard from '../components/products/ProductCard';
import { getProduct, relatedProducts } from '../data/products';
import { reviews } from '../data/social';
import { useT } from '../hooks/useTranslation';
import { useMeta } from '../hooks/useMeta';
import { observeReveals } from '../lib/animations';

export default function ProductPage() {
  const { slug = '' } = useParams();
  const { copy, tr } = useT();
  const product = getProduct(slug);

  useEffect(() => {
    observeReveals();
  }, [slug]);

  useMeta({
    title: product
      ? `${tr(product.name)} — ${copy.brand.name}`
      : `${copy.product.notFound} — ${copy.brand.name}`,
    description: product ? tr(product.description) : copy.product.notFoundBody,
    image: product?.image,
  });

  if (!product) {
    return (
      <div className="page shell empty empty--page">
        <h1 className="empty__title">{copy.product.notFound}</h1>
        <p className="empty__body">{copy.product.notFoundBody}</p>
        <Link to="/shop" className="btn btn--primary">
          {copy.product.backToShop}
        </Link>
      </div>
    );
  }

  const related = relatedProducts(product.slug);

  // Get product-specific reviews first, filled with top authentic Tamil reviews
  const productReviews = reviews.filter((r) => r.productSlug === product.slug);
  const otherReviews = reviews.filter((r) => r.productSlug !== product.slug);
  const displayReviews = [...productReviews, ...otherReviews].slice(0, 3);

  return (
    <div className="page product">
      <div className="shell product__crumbs">
        <Link to="/shop" className="product__back">
          <ArrowLeft size={15} strokeWidth={1.8} aria-hidden="true" />
          {copy.product.backToShop}
        </Link>
      </div>

      {/* Visual first on mobile, side by side from tablet up. */}
      <div className="shell product__main">
        <div className="product__visual">
          <ProductViewer product={product} />
        </div>
        <div className="product__info">
          <ProductInfo product={product} />
        </div>
      </div>

      {/* What's Inside — 2 column breakdown */}
      <div className="shell shell--narrow">
        <IngredientBreakdown ids={product.ingredients} />
      </div>

      {/* Customer Reviews Section with horizontal stars & brand typography */}
      <section className="section reviews product__reviews" id="reviews">
        <div className="shell">
          <div className="reviews__head">
            <div>
              <h2 className="reviews__title">
                {copy.reviews.title} <em>{copy.reviews.titleAccent}</em>
              </h2>
              <p className="reviews__body">{copy.reviews.body}</p>
            </div>
          </div>

          <ul className="reviews__list">
            {displayReviews.map((review, i) => (
              <li
                key={review.id}
                className="review reveal"
                style={{ '--reveal-delay': `${i * 70}ms` } as React.CSSProperties}
              >
                <div
                  className="review__rating"
                  aria-label={`${copy.reviews.ratingLabel} ${review.rating} ${copy.reviews.outOf}`}
                >
                  {Array.from({ length: 5 }, (_, s) => (
                    <Star
                      key={s}
                      size={14}
                      strokeWidth={1.5}
                      className={s < review.rating ? 'is-filled' : ''}
                      aria-hidden="true"
                    />
                  ))}
                </div>

                <blockquote className="review__quote">{tr(review.quote)}</blockquote>

                <footer className="review__foot">
                  <span className="review__initial" aria-hidden="true">
                    {review.name.charAt(0)}
                  </span>
                  <div className="review__info">
                    <span className="review__name">{review.name}</span>
                    <span className="review__meta">
                      {tr(review.role)} · {tr(review.city)}
                    </span>
                  </div>
                </footer>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Also in Our Pantry — Related Products Grid */}
      {related.length > 0 && (
        <section className="section product__related">
          <div className="shell">
            <h2 className="product__relatedtitle">{copy.product.related}</h2>
            <div className="grid">
              {related.map((item) => (
                <ProductCard key={item.id} product={item} />
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
