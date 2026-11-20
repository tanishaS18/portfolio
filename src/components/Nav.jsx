import { useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { site } from '../data/site.js'
import { contactTarget } from '../data/rooms.js'
import FloorPlan from './FloorPlan.jsx'
import './Nav.css'

export default function Nav() {
  const { pathname, state } = useLocation()
  const arrived = Boolean(state?.fromHallway) // came through the hallway door
  const [planOpen, setPlanOpen] = useState(false)
  const onLight = pathname === '/' // the home page starts on yellow
  const fixed = pathname === '/work' // stays visible during the hallway walk

  return (
    <header className={`site-header${onLight ? ' site-header--on-light' : ''}${fixed ? ' site-header--fixed' : ''}${arrived ? ' dissolve-in' : ''}`}>
      <div className="site-header__inner page-container">
        <Link to="/" className="brand" aria-label={`${site.name}, home`}>
          <span className="brand__avatar">
            <img src="/assets/logo.png" alt="" width="512" height="512" />
          </span>
          <span className="brand__name">{site.name}</span>
        </Link>

        <nav aria-label="Main" className="site-nav">
          <ul className="site-nav__list">
            <li>
              <NavLink to="/work" end>
                Work
              </NavLink>
            </li>
            <li>
              <NavLink to="/about">About</NavLink>
            </li>
            <li>
              <Link to={contactTarget(pathname)}>Contact</Link>
            </li>
          </ul>
          <button
            type="button"
            className="floorplan-btn"
            aria-haspopup="dialog"
            aria-expanded={planOpen}
            onClick={() => setPlanOpen(true)}
          >
            Floor plan
          </button>
        </nav>
      </div>
      <FloorPlan open={planOpen} onClose={() => setPlanOpen(false)} />
    </header>
  )
}
