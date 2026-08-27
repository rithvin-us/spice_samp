import { Link, useParams } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import ProductViewer from '../components/products/ProductViewer';
import ProductInfo from '../components/products/ProductInfo';
import IngredientBreakdown from '../components/products/IngredientBreakdown';
import ProductCard from '../components/products/ProductCard';
import { getProduct, relatedProducts } from '../data/products';
import { useT } from '../hooks/useTranslation';
import { useMeta } from '../hooks/useMeta';

export default function ProductPage() {
  const { slug = '' } = useParams();
  const { copy, tr } = useT();
  const product = getProduct(slug);

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

      <div className="shell shell--narrow">
        <IngredientBreakdown ids={product.ingredients} />
      </div>

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
