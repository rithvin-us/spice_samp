import { Link } from 'react-router-dom';
import ProductGrid from '../products/ProductGrid';
import SectionLabel from '../ui/SectionLabel';
import { featuredProducts } from '../../data/products';
import { useT } from '../../hooks/useTranslation';

/** 03 — Shop the SOLI pantry. Products are reachable within one screen of the hero. */
export default function PantrySection() {
  const { copy } = useT();
  const items = featuredProducts();

  return (
    <section className="section pantry" id="pantry">
      <div className="shell">
        <div className="pantry__head">
          <div>
            <SectionLabel index="03" label={copy.pantry.label} />
            <h2 className="pantry__title">
              {copy.pantry.title} <em>{copy.pantry.titleAccent}</em>
            </h2>
          </div>
          <div className="pantry__aside">
            <p className="body-copy">{copy.pantry.body}</p>
            <Link to="/shop" className="link-underline link-underline--static">
              {copy.pantry.viewAll}
            </Link>
          </div>
        </div>

        <ProductGrid products={items} priorityCount={2} />
      </div>
    </section>
  );
}
