import { useT } from '../../hooks/useTranslation';

/**
 * Suspense fallback for lazily loaded routes.
 *
 * Deliberately not a full-page entry curtain: the homepage's first paint is the
 * opening hero frame, and putting a gate in front of it would only make the
 * site feel slower than it is.
 */
export default function LoadingScreen() {
  const { copy } = useT();

  return (
    <div className="loading" role="status" aria-live="polite">
      <img src="/img/soli-logo.png" alt="" width={560} height={366} />
      <span className="visually-hidden">{copy.common.loading}</span>
      <span className="loading__rule" aria-hidden="true" />
    </div>
  );
}
