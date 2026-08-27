import { clients } from '../../data/social';
import { useT } from '../../hooks/useTranslation';

/**
 * The scrolling strip of kitchens that cook with SOLI.
 *
 * PLACEHOLDER MARKS. These are invented names set in the site's own type — no
 * real business is represented and no real logo is reproduced. See
 * `src/data/social.ts`.
 *
 * The marquee is a pure CSS translation of a duplicated track, so it costs no
 * JavaScript and no per-frame work. The duplicate is hidden from assistive
 * technology, and the whole thing stops moving under `prefers-reduced-motion`,
 * where it becomes a plain wrapping list.
 */
export default function ClientStrip() {
  const { copy, tr } = useT();

  const track = (duplicate = false) => (
    <ul className="clients__track" aria-hidden={duplicate || undefined}>
      {clients.map((client) => (
        <li key={client.id} className="clients__item">
          <span className="clients__mark">
            <span className="clients__monogram" aria-hidden="true">
              {client.name.charAt(0)}
            </span>
            <span className="clients__text">
              <span className="clients__name">{client.name}</span>
              <span className="clients__kind">{tr(client.kind)}</span>
            </span>
          </span>
        </li>
      ))}
    </ul>
  );

  return (
    <section className="clients" aria-label={copy.clients.title}>
      <p className="clients__title">
        {copy.clients.title}
        <span className="clients__tag">{copy.clients.placeholder}</span>
      </p>

      <div className="clients__viewport">
        <div className="clients__rail">
          {track()}
          {track(true)}
        </div>
      </div>
    </section>
  );
}
