import { Link } from 'react-router-dom';
import Botanical from '../ui/Botanical';
import SectionLabel from '../ui/SectionLabel';
import { useT } from '../../hooks/useTranslation';

/** 08 — About SOLI. A short closing statement before the footer. */
export default function AboutTeaser() {
  const { copy } = useT();

  return (
    <section className="section aboutteaser" id="about-soli">
      <div className="shell shell--narrow aboutteaser__inner">
        <SectionLabel index="08" label={copy.about.label} />
        <h2 className="aboutteaser__title">{copy.about.title}</h2>
        <p className="lede aboutteaser__lede">{copy.about.intro}</p>

        <Botanical mark="anise" size={46} className="aboutteaser__mark" />

        <p className="aboutteaser__closing">
          <span>{copy.brand.lineOne}</span>
          <em>{copy.brand.lineTwo}</em>
        </p>

        <Link to="/about" className="btn btn--ghost">
          {copy.about.readAbout}
        </Link>
      </div>
    </section>
  );
}
