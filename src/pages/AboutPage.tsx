import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Botanical from '../components/ui/Botanical';
import SectionLabel from '../components/ui/SectionLabel';
import TamilStory from '../components/heritage/TamilStory';
import { aboutChapters } from '../data/heritage';
import { useT } from '../hooks/useTranslation';
import { useMeta } from '../hooks/useMeta';
import { observeReveals } from '../lib/animations';

const MARKS = ['coriander', 'cardamom', 'chilli', 'anise', 'coriander'] as const;

export default function AboutPage() {
  const { copy, tr } = useT();

  useMeta({
    title: `${copy.about.label} — ${copy.brand.name}`,
    description: copy.about.intro,
  });

  useEffect(() => observeReveals(), []);

  return (
    <div className="page about">
      <header className="shell about__head">
        <SectionLabel label={copy.about.label} />
        <h1 className="about__title">{copy.about.title}</h1>
        <p className="lede about__intro">{copy.about.intro}</p>
      </header>

      <div className="shell about__body">
        {aboutChapters.map((chapter, i) => (
          <section
            key={chapter.id}
            className="about__chapter reveal"
            style={{ '--reveal-delay': `${i * 60}ms` } as React.CSSProperties}
          >
            <div className="about__chapterhead">
              <Botanical mark={MARKS[i]} size={40} />
              <p className="about__label">{tr(chapter.label)}</p>
            </div>
            <div className="about__chaptercopy">
              <h2 className="about__chaptertitle">{tr(chapter.title)}</h2>
              <p className="body-copy">{tr(chapter.body)}</p>
            </div>
          </section>
        ))}
      </div>

      <div className="shell shell--narrow about__quote">
        <TamilStory />
      </div>

      <section className="about__closing">
        <div className="shell shell--narrow">
          <p className="about__closingline">
            <span>{copy.brand.lineOne}</span>
            <em>{copy.brand.lineTwo}</em>
          </p>
          <Link to="/shop" className="btn btn--primary">
            {copy.process.shopNow}
          </Link>
          <p className="about__disclaimer">{copy.heritage.disclaimer}</p>
        </div>
      </section>
    </div>
  );
}
