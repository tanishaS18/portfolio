import { Link } from 'react-router-dom'
import { caseStudies } from '../data/caseStudies.js'
import { useReveal } from '../hooks/useReveal.js'
import CoverImage from '../components/case/CoverImage.jsx'
import { ArrowCircleIcon } from '../components/Icons.jsx'
import './Work.css'

function WorkCard({ study, flipped }) {
  const ref = useReveal()
  return (
    <li ref={ref} className={`work-card reveal${flipped ? ' work-card--flipped' : ''}`}>
      <Link to={`/work/${study.slug}`} className="work-card__link">
        <div className="work-card__media">
          <CoverImage cover={study.cover} />
        </div>
        <div className="work-card__text">
          <h2 className="work-card__title">{study.name}</h2>
          {study.subtitle && <p className="work-card__subtitle">{study.subtitle}</p>}
          <span className="work-card__cta">
            View case study <ArrowCircleIcon className="work-card__icon" />
          </span>
        </div>
      </Link>
    </li>
  )
}

export default function Work() {
  return (
    <section className="work page-container" aria-labelledby="work-title">
      <h1 id="work-title" className="display-heading work__title fade-in">
        Selected Work
      </h1>
      <ul className="work__list">
        {caseStudies.map((study, i) => (
          <WorkCard key={study.slug} study={study} flipped={i % 2 === 1} />
        ))}
      </ul>
    </section>
  )
}
