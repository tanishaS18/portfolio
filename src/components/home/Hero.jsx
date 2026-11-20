import { Link, useLocation } from 'react-router-dom'
import { site } from '../../data/site.js'
import { ArrowIcon } from '../Icons.jsx'
import HeroHeadline from './HeroHeadline.jsx'

/*
  Yellow "doorway" hero.
  Arriving normally: everything fades up in turn.
  Arriving through the hallway door: the end of the walk is this exact screen
  (yellow + headline in the same spot), so the headline is already there and the
  rest dissolves in place, with no movement.
*/
export default function Hero() {
  const { state } = useLocation()
  const arrived = Boolean(state?.fromHallway)
  const anim = (i) => ({ className: arrived ? 'dissolve-in' : 'fade-in', style: { '--i': i } })
  const headline = arrived ? { className: '', style: undefined } : anim(1)

  return (
    <section className={`home-hero${arrived ? ' home-hero--arrived' : ''}`} aria-label="Introduction">
      <div className="home-hero__inner page-container hero-shell">
        <div className="home-hero__text">
          <p className={`mono-label home-hero__eyebrow ${anim(0).className}`} style={anim(0).style}>
            {site.location}
          </p>
          <HeroHeadline className={headline.className} style={headline.style} />
          <p className={`home-hero__sub ${anim(2).className}`} style={anim(2).style}>
            Bold enough to be felt, precise enough to ship.
          </p>
          <div className={`home-hero__actions ${anim(3).className}`} style={anim(3).style}>
            <Link to="/work" className="pill pill--solid">
              View work <ArrowIcon width="18" height="18" />
            </Link>
            <Link to="/#process" className="pill">
              How I work
            </Link>
          </div>
        </div>

        <div className={`home-hero__avatar ${anim(2).className}`} style={anim(2).style}>
          <img src="/assets/logo.png" alt="Illustration of Tanisha" width="512" height="512" />
        </div>
      </div>
    </section>
  )
}
