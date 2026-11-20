// "I design experiences with a pulse." Used by the Home hero and by the end of the
// hallway walk, so the headline sits in exactly the same place in both.
export function PulseLine(props) {
  return (
    <svg className="pulse-line" viewBox="0 0 160 24" fill="none" aria-hidden="true" {...props}>
      <path
        d="M0 15H62l6-8 7 14 7-19 6 13h72"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  )
}

export default function HeroHeadline({ as: Tag = 'h1', withLine = true, className = '', ...rest }) {
  return (
    <Tag className={`hero-headline ${className}`} {...rest}>
      I design experiences <br />
      with a <em>pulse</em>
      {withLine ? <PulseLine /> : '.'}
    </Tag>
  )
}
