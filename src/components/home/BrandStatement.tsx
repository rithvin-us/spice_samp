import { useEffect } from 'react';
import Botanical from '../ui/Botanical';
import SectionLabel from '../ui/SectionLabel';
import { useT } from '../../hooks/useTranslation';
import { observeReveals } from '../../lib/animations';

/**
 * The calm beat after the hero. The closing hero frame resolves onto cream, and
 * this section opens on the same cream, so the film hands over to the page
 * without a seam.
 */
export default function BrandStatement() {
  const { copy } = useT();

  useEffect(() => observeReveals(), []);

  return (
    <section className="section statement" id="statement">
      <div className="shell statement__inner">
        <SectionLabel index="02" label={copy.statement.label} />

        <h2 className="statement__title reveal">
          <span>{copy.statement.titleOne}</span>
          <em>{copy.statement.titleTwo}</em>
        </h2>

        <div className="statement__marks" aria-hidden="true">
          <Botanical mark="coriander" size={56} />
          <span className="statement__rule" />
          <Botanical mark="cardamom" size={52} />
          <span className="statement__rule" />
          <Botanical mark="chilli" size={54} />
          <span className="statement__rule" />
          <Botanical mark="anise" size={54} />
        </div>

        <div className="statement__copy">
          <p className="statement__lead reveal" style={{ '--reveal-delay': '80ms' } as React.CSSProperties}>
            {copy.statement.body}
          </p>
          <p className="body-copy reveal" style={{ '--reveal-delay': '160ms' } as React.CSSProperties}>
            {copy.statement.detail}
          </p>
        </div>
      </div>
    </section>
  );
}
