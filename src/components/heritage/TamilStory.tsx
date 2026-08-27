import { useT } from '../../hooks/useTranslation';

/**
 * A short passage that always appears in Tamil, whichever language the
 * interface is set to — with its English reading alongside when the interface
 * is in English. The language is part of the brand, not a translation of it.
 */
export default function TamilStory() {
  const { isTamil } = useT();

  return (
    <figure className="tamilstory">
      <blockquote className="tamilstory__quote is-tamil-display" lang="ta">
        சமையல் என்பது செய்முறை அல்ல.
        <br />
        அது நினைவு.
      </blockquote>
      {!isTamil && (
        <figcaption className="tamilstory__gloss">
          Cooking is not a recipe. It is a memory.
        </figcaption>
      )}
    </figure>
  );
}
