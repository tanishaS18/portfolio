import { useLayoutEffect, useRef, useState } from 'react'
import { useReveal } from '../../hooks/useReveal.js'

const STEPS = [
  {
    title: ['Listen &', 'Research'],
    text: 'I talk to real users through surveys and interviews to find the problems worth solving.',
  },
  {
    title: ['Explore &', 'Prototype'],
    text: 'I use AI tools to explore many ideas fast, then test the strongest ones before committing.',
  },
  {
    title: ['Design &', 'Refine'],
    text: 'I turn the best direction into polished, research-backed designs in Figma.',
  },
  {
    title: ['Bring To', 'Life'],
    text: 'I build with code and AI so designs actually ship.',
  },
]

const GAP = 14 // space between a circle's edge and the start of its dashed line

export default function Process() {
  const revealRef = useReveal()
  const stepsRef = useRef(null)
  const circleRefs = useRef([])
  const [lines, setLines] = useState([])

  // The dashed connectors are drawn from the circles' real positions,
  // so they stay correct at every screen size (zig-zag on desktop, vertical on phones).
  useLayoutEffect(() => {
    const wrap = stepsRef.current
    if (!wrap) return

    const measure = () => {
      const box = wrap.getBoundingClientRect()
      const centers = circleRefs.current.map((el) => {
        const r = el.getBoundingClientRect()
        return { x: r.left - box.left + r.width / 2, y: r.top - box.top + r.height / 2, r: r.width / 2 }
      })
      const next = []
      for (let i = 0; i < centers.length - 1; i++) {
        const a = centers[i]
        const b = centers[i + 1]
        const dx = b.x - a.x
        const dy = b.y - a.y
        const len = Math.hypot(dx, dy)
        if (len <= a.r + b.r + GAP * 2) continue
        const ux = dx / len
        const uy = dy / len
        next.push({
          x1: a.x + ux * (a.r + GAP),
          y1: a.y + uy * (a.r + GAP),
          x2: b.x - ux * (b.r + GAP),
          y2: b.y - uy * (b.r + GAP),
        })
      }
      setLines(next)
    }

    measure()
    const observer = new ResizeObserver(measure)
    observer.observe(wrap)
    document.fonts?.ready.then(measure)
    return () => observer.disconnect()
  }, [])

  return (
    <section className="process page-container" aria-labelledby="process-title">
      <div ref={revealRef} className="reveal">
        <h2 id="process-title" className="display-heading process__title">
          Research, Ideate, Create
        </h2>

        <div ref={stepsRef} className="process__diagram">
          <svg className="process__lines" aria-hidden="true">
            {lines.map((l, i) => (
              <line key={i} x1={l.x1} y1={l.y1} x2={l.x2} y2={l.y2} />
            ))}
          </svg>

          <ol className="process__steps">

          {STEPS.map((step, i) => (
            <li key={step.title.join(' ')} className="process__step" style={{ '--i': i }}>
              <div className="process__circle" ref={(el) => (circleRefs.current[i] = el)}>
                <h3 className="process__name">
                  {step.title[0]}
                  <br />
                  {step.title[1]}
                </h3>
              </div>
              <div className="process__body">
                <span className="process__num">0{i + 1}</span>
                <p className="process__text">{step.text}</p>
              </div>
            </li>
          ))}
          </ol>
        </div>
      </div>
    </section>
  )
}
