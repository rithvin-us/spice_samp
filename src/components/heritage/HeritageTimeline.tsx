import { useEffect } from 'react';
import { heritageChapters } from '../../data/heritage';
import { useT } from '../../hooks/useTranslation';
import { observeReveals } from '../../lib/animations';

export default function HeritageTimeline() {
  const { tr } = useT();

  useEffect(() => observeReveals(), []);

  return (
    <ol className="chapters">
      {heritageChapters.map((chapter, i) => (
        <li
          key={chapter.id}
          className="chapters__item reveal"
          style={{ '--reveal-delay': `${i * 90}ms` } as React.CSSProperties}
        >
          <p className="chapters__label">{tr(chapter.label)}</p>
          <h3 className="chapters__title">{tr(chapter.title)}</h3>
          <p className="chapters__body">{tr(chapter.body)}</p>
        </li>
      ))}
    </ol>
  );
}
