import { useEffect, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { hallwayFrames } from '../../data/hallway.js'
import HeroHeadline from '../home/HeroHeadline.jsx'
import { site } from '../../data/site.js'
import '../../pages/Home.css'
import './Hallway.css'

/*
  The Work page: scroll to walk down a dark hallway past your projects toward a
  yellow door. Built with CSS 3D (no WebGL), so every frame is a real link you can
  click or reach with Tab. At the end the yellow takes over the screen and you
  arrive on the home page.

  Walk timeline (p = 0 → 1):
    0–0.8   walk toward the door; frames pass on both walls
    0.25–0.6 frames swing outward, nav dims
    0.55–0.82 walls go dark at the edges, all light comes from the door
    0.8–0.93 yellow takes over the screen
    0.9–1   the home headline fades in → home page
*/
const DOOR = 3000 // px down the hall
const WALK_END = 0.8 // progress at which the door fills the view
const FOCUS = 650 // frames are sharpest this far ahead of you

const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v))
const ramp = (p, a, b) => clamp((p - a) / (b - a))
const smooth = (p, a, b) => {
  const t = ramp(p, a, b)
  return t * t * (3 - 2 * t)
}
const cameraAt = (p) => (Math.min(p, WALK_END) / WALK_END) * DOOR + ramp(p, WALK_END, 1) * 600
const progressFor = (camera) => clamp((camera / DOOR) * WALK_END)

export default function Hallway() {
  const sectionRef = useRef(null)
  const stageRef = useRef(null)
  const worldRef = useRef(null)
  const frameRefs = useRef([])
  const hintRef = useRef(null)
  const meterRef = useRef(null)
  const navigate = useNavigate()

  useEffect(() => {
    const section = sectionRef.current
    const stage = stageRef.current
    const world = worldRef.current
    const root = document.documentElement
    const desktop = window.matchMedia('(min-width: 700px)')
    let current = 0
    let raf = 0
    let arrived = false

    const targetProgress = () => {
      const total = section.offsetHeight - window.innerHeight
      return total > 0 ? clamp(-section.getBoundingClientRect().top / total) : 0
    }

    const render = (p) => {
      const camera = cameraAt(p)
      world.style.transform = `translate3d(0, 0, ${camera}px)`

      // frames: fade in from the dark, fade out as you pass, blur when out of focus
      frameRefs.current.forEach((el, i) => {
        if (!el) return
        const z = camera - hallwayFrames[i].depth // 0 = level with you, negative = ahead
        const ahead = -z
        const opacity = clamp((z > 0 ? 1 - z / 260 : 1) * clamp((3400 - ahead) / 900))
        const blur = desktop.matches ? clamp((Math.abs(ahead - FOCUS) - 250) / 260, 0, 4) : 0
        el.style.opacity = opacity.toFixed(3)
        el.style.filter = blur > 0.05 ? `blur(${blur.toFixed(2)}px)` : 'none'
        el.style.visibility = opacity < 0.01 ? 'hidden' : 'visible'
      })

      stage.style.setProperty('--swing', `${52 + 20 * smooth(p, 0.25, 0.6)}deg`)
      stage.style.setProperty('--glow', (0.45 + 0.55 * smooth(p, 0.1, 0.8)).toFixed(3))
      stage.style.setProperty('--vignette', smooth(p, 0.55, 0.82).toFixed(3))
      stage.style.setProperty('--takeover', smooth(p, 0.8, 0.93).toFixed(3))
      stage.style.setProperty('--edges', (1 - smooth(p, 0.93, 1)).toFixed(3))
      stage.style.setProperty('--headline', smooth(p, 0.9, 1).toFixed(3))
      root.style.setProperty('--nav-opacity', ((1 - 0.6 * smooth(p, 0.3, 0.6)) * (1 - smooth(p, 0.8, 0.88))).toFixed(3))

      const pct = Math.round(p * 100)
      meterRef.current.style.setProperty('--p', p.toFixed(4))
      meterRef.current.querySelector('.walk-meter__pct').textContent = `${pct}%`
      hintRef.current.querySelector('span').textContent =
        p < 0.3 ? 'Scroll to walk down the hallway' : p < 0.72 ? 'Keep going' : 'Walk through'
      hintRef.current.style.opacity = p < 0.9 ? 1 : 0
    }

    const tick = () => {
      const target = targetProgress()
      current += (target - current) * 0.14 // a little inertia
      if (Math.abs(target - current) < 0.0004) current = target
      render(current)

      if (!arrived && target > 0.995 && current > 0.985) {
        arrived = true
        navigate('/', { state: { fromHallway: true } })
        return
      }
      raf = requestAnimationFrame(tick)
    }

    current = targetProgress()
    render(current)
    raf = requestAnimationFrame(tick)

    return () => {
      cancelAnimationFrame(raf)
      root.style.removeProperty('--nav-opacity')
    }
  }, [navigate])

  // Tab to a frame → walk to it
  const walkTo = (frame) => {
    const section = sectionRef.current
    const total = section.offsetHeight - window.innerHeight
    const p = progressFor(frame.depth - FOCUS)
    window.scrollTo({ top: section.offsetTop + p * total, behavior: 'instant' })
  }

  return (
    <section ref={sectionRef} className="hallway" aria-labelledby="hallway-title">
      <h1 id="hallway-title" className="visually-hidden">
        Work
      </h1>

      <div ref={stageRef} className="hallway__stage">
        <div ref={worldRef} className="hallway__world">
          <ul className="hallway__frames">
            {hallwayFrames.map((frame, i) => {
              const picture = (
                <>
                  <span className="frame__pic" style={{ aspectRatio: `${frame.width} / ${frame.height}` }}>
                    <img src={encodeURI(frame.src)} alt="" width={frame.width} height={frame.height} decoding="async" />
                  </span>
                  {frame.to && (
                    <span className="frame__label">
                      <span className="frame__title">{frame.title}</span>
                      <span className="mono-label">Case study</span>
                    </span>
                  )}
                </>
              )
              return (
                <li
                  key={`${frame.src}-${i}`}
                  ref={(el) => (frameRefs.current[i] = el)}
                  className={`frame frame--${frame.side}${frame.tint === false ? ' frame--plain' : ''}`}
                  style={{ '--depth': `${-frame.depth}px`, '--size': frame.size }}
                >
                  {frame.to ? (
                    <Link
                      to={frame.to}
                      className="frame__link"
                      aria-label={`${frame.title} case study`}
                      onFocus={() => walkTo(frame)}
                    >
                      {picture}
                    </Link>
                  ) : (
                    <div className="frame__link" aria-hidden="true">
                      {picture}
                    </div>
                  )}
                </li>
              )
            })}
          </ul>

          <div className="hallway__halo" aria-hidden="true" />
          <div className="hallway__spill" aria-hidden="true" />
          <div className="hallway__door" aria-hidden="true" />
        </div>

        <div className="hallway__glow" aria-hidden="true" />
        <div className="hallway__vignette" aria-hidden="true" />

        <div className="hallway__takeover" aria-hidden="true">
          <div className="home-hero__inner page-container hero-shell">
            <div className="home-hero__text">
              <p className="mono-label home-hero__eyebrow hallway__ghost">{site.location}</p>
              <HeroHeadline as="p" className="hallway__headline" />
              <p className="home-hero__sub hallway__ghost">Bold enough to be felt, precise enough to ship.</p>
              <div className="home-hero__actions hallway__ghost">
                <span className="pill">View work</span>
              </div>
            </div>
            <div className="home-hero__avatar hallway__ghost">
              <div style={{ aspectRatio: '1' }} />
            </div>
          </div>
        </div>

        <div ref={meterRef} className="walk-meter" aria-hidden="true">
          <span className="walk-meter__label mono-label">Scroll</span>
          <span className="walk-meter__track">
            <span className="walk-meter__dot">
              <span className="walk-meter__pct">0%</span>
            </span>
          </span>
        </div>

        <p ref={hintRef} className="hallway__hint mono-label" aria-hidden="true">
          <span>Scroll to walk down the hallway</span> ↓
        </p>
      </div>
    </section>
  )
}
