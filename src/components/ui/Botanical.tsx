/**
 * Quiet botanical line marks — drawn from the spices themselves rather than
 * from generic ornament. Used sparingly as section punctuation.
 */

type Mark = 'chilli' | 'cardamom' | 'anise' | 'coriander';

const STROKE = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.1,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
};

function Chilli() {
  return (
    <g {...STROKE}>
      <path d="M32 12v6" />
      <path d="M26 18c4-3 8-3 12 0" />
      <path d="M32 18c8 4 11 13 9 22-2 8-7 12-11 12-5 0-8-4-7-9 1-6 6-8 9-13 3-4 3-8 0-12" />
    </g>
  );
}

function Cardamom() {
  return (
    <g {...STROKE}>
      <path d="M32 10c8 8 11 18 11 26 0 10-5 16-11 16s-11-6-11-16c0-8 3-18 11-26z" />
      <path d="M32 14v36" />
      <path d="M25 26c4 4 4 14 2 20" />
      <path d="M39 26c-4 4-4 14-2 20" />
    </g>
  );
}

function Anise() {
  const petals = Array.from({ length: 8 }, (_, i) => (i * 360) / 8);
  return (
    <g {...STROKE}>
      {petals.map((angle) => (
        <path
          key={angle}
          d="M32 30c3 0 5 3 5 7 0 5-3 10-5 12-2-2-5-7-5-12 0-4 2-7 5-7z"
          transform={`rotate(${angle} 32 32)`}
        />
      ))}
      <circle cx="32" cy="32" r="3.4" />
    </g>
  );
}

function Coriander() {
  const leaves = [
    { y: 46, w: 9 },
    { y: 36, w: 8 },
    { y: 27, w: 6.5 },
  ];
  return (
    <g {...STROKE}>
      <path d="M32 56V16" />
      {leaves.map(({ y, w }) => (
        <g key={y}>
          <path d={`M32 ${y}c-${w} -1 -${w + 3} -5 -${w + 1} -9 5 0 ${w} 4 ${w + 1} 9z`} />
          <path d={`M32 ${y}c${w} -1 ${w + 3} -5 ${w + 1} -9 -5 0 -${w} 4 -${w + 1} 9z`} />
        </g>
      ))}
      <circle cx="32" cy="14" r="2.6" />
      <circle cx="26" cy="18" r="2.1" />
      <circle cx="38" cy="18" r="2.1" />
    </g>
  );
}

const MARKS: Record<Mark, () => JSX.Element> = {
  chilli: Chilli,
  cardamom: Cardamom,
  anise: Anise,
  coriander: Coriander,
};

export default function Botanical({
  mark,
  size = 64,
  className = '',
}: {
  mark: Mark;
  size?: number;
  className?: string;
}) {
  const Shape = MARKS[mark];
  return (
    <svg
      viewBox="0 0 64 64"
      width={size}
      height={size}
      className={`botanical ${className}`}
      aria-hidden="true"
      focusable="false"
    >
      <Shape />
    </svg>
  );
}
