import { Link, NavLink } from 'react-router-dom'
import { site } from '../data/site.js'
import { PinIcon } from './Icons.jsx'
import './Nav.css'

/*
  The page links step diagonally down the right side, like a staircase.
  Each link has its own short line; the active page's line turns accent red.
    x / y  — position inside the staircase box (desktop only)
    line   — 'h' horizontal or 'v' vertical
    layout — where the line sits relative to the label
*/
const LINKS = [
  { label: 'Home', to: '/', end: true, x: '0%', y: '0%', line: 'h', layout: 'row' },
  { label: 'About', to: '/about', x: '35%', y: '20%', line: 'v', layout: 'column' },
  { label: 'work', to: '/work', x: '74%', y: '50%', line: 'h', layout: 'column-reverse' },
  { label: 'contact', href: '#contact', x: '86.5%', y: '74%', line: 'v', layout: 'column-reverse' },
]

export default function Nav() {
  return (
    <header className="site-header">
      <div className="site-header__inner">
        <Link to="/" className="site-logo" aria-label={`${site.name} — home`}>
          <img src="/assets/avatar.svg" alt="" width="140" height="138" />
        </Link>

        <p className="site-location">
          <PinIcon className="site-location__icon" />
          {site.location}
        </p>

        <nav className="stairs" aria-label="Main">
          <ul className="stairs__list">
            {LINKS.map((link) => (
              <li
                key={link.label}
                className={`stairs__item stairs__item--${link.layout} stairs__item--line-${link.line}`}
                style={{ '--x': link.x, '--y': link.y }}
              >
                {link.to ? (
                  <NavLink to={link.to} end={link.end} className="stairs__link">
                    <span className="stairs__label">{link.label}</span>
                    <span className="stairs__line" aria-hidden="true" />
                  </NavLink>
                ) : (
                  <a href={link.href} className="stairs__link">
                    <span className="stairs__label">{link.label}</span>
                    <span className="stairs__line" aria-hidden="true" />
                  </a>
                )}
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  )
}
