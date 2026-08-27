import { Link } from 'react-router-dom';
import HeritageTimeline from './HeritageTimeline';
import TamilStory from './TamilStory';
import SectionLabel from '../ui/SectionLabel';
import { useT } from '../../hooks/useTranslation';

export default function HeritageSection() {
  const { copy } = useT();

  return (
    <section className="section heritage" id="heritage">
      <div className="shell">
        <SectionLabel index="06" label={copy.heritage.label} />

        <div className="heritage__head">
          <h2 className="heritage__title">
            <span>{copy.heritage.titleOne}</span>
            <em>{copy.heritage.titleTwo}</em>
          </h2>
          <div className="heritage__intro">
            <p className="lede">{copy.heritage.body}</p>
            <TamilStory />
          </div>
        </div>

        <HeritageTimeline />

        <div className="heritage__foot">
          <Link to="/about" className="btn btn--ghost">
            {copy.heritage.readMore}
          </Link>
          <p className="heritage__disclaimer">{copy.heritage.disclaimer}</p>
        </div>
      </div>
    </section>
  );
}
