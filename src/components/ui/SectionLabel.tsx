interface Props {
  /** Two-digit sequence number used down the homepage. */
  index?: string;
  label: string;
  tamil?: boolean;
}

export default function SectionLabel({ index, label, tamil = false }: Props) {
  return (
    <p className={`section-label ${tamil ? 'section-label--tamil' : ''}`}>
      {index && <span className="section-label__index">{index}</span>}
      {label}
    </p>
  );
}
