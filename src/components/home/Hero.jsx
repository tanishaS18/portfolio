// Hero statement with the inline illustrations from /public/assets.
export default function Hero() {
  return (
    <section className="hero page-container" aria-label="Introduction">
      <h1 className="hero__statement">
        <span className="hero__line fade-in" style={{ '--i': 0 }}>
          I <img className="hero__icon hero__icon--face" src="/assets/avatar.svg" alt="" width="140" height="138" /> design
        </span>{' '}
        <span className="hero__line fade-in" style={{ '--i': 1 }}>
          experiences with{' '}
          <span className="hero__nowrap">
            a{' '}
            <span className="hero__pulse">
            <img className="hero__pulse-line" src="/assets/pulse.svg" alt="" />
            <strong className="hero__emph">pulse.</strong>
            </span>
          </span>
        </span>{' '}
        <span className="hero__line fade-in" style={{ '--i': 2 }}>
          Bold enough to be <strong className="hero__emph">felt,</strong>
        </span>{' '}
        <span className="hero__line fade-in" style={{ '--i': 3 }}>
          precise enough to{' '}
          <span className="hero__nowrap">
            ship <img className="hero__icon hero__icon--laptop" src="/assets/laptop.svg" alt="" />
          </span>
        </span>
      </h1>
    </section>
  )
}
