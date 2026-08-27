import { useEffect, useRef } from 'react';
import { observeReveals } from '../../lib/animations';

interface Props {
  children: React.ReactNode;
  as?: 'div' | 'p' | 'h2' | 'h3' | 'span' | 'li';
  delay?: number;
  className?: string;
}

/**
 * A single, quiet reveal: fade with a short rise, once, on first sight.
 * Falls back to plain visible content when motion is reduced.
 */
export default function RevealText({
  children,
  as: Tag = 'div',
  delay = 0,
  className = '',
}: Props) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    return observeReveals(ref.current.parentNode ?? document);
  }, []);

  return (
    <Tag
      ref={ref as React.Ref<never>}
      className={`reveal ${className}`}
      style={{ '--reveal-delay': `${delay}ms` } as React.CSSProperties}
    >
      {children}
    </Tag>
  );
}
