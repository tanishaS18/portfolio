import { Link, useParams } from 'react-router-dom'
import { getCaseStudy, getNextCaseStudy } from '../data/caseStudies.js'
import { useReveal } from '../hooks/useReveal.js'
import CaseMarkdown from '../components/case/CaseMarkdown.jsx'
import MediaBlock from '../components/case/MediaBlock.jsx'
import CoverImage from '../components/case/CoverImage.jsx'
import { ArrowCircleIcon } from '../components/Icons.jsx'
import NotFound from './NotFound.jsx'
import './CaseStudy.css'

const pad = (n) => String(n).padStart(2, '0')

// Split a section's markdown just before a given ### heading (for placing media).
function splitBefore(body, heading) {
  if (!heading) return [body, '']
  const lines = body.split('\n')
  const i = lines.findIndex((l) => /^###\s/.test(l) && l.replace(/[#*]/g, '').trim() === heading)
  if (i === -1) return [body, '']
  return [lines.slice(0, i).join('\n'), lines.slice(i).join('\n')]
}

function Section({ section, index, media }) {
  const ref = useReveal()
  const [before, after] = splitBefore(section.body, media?.beforeHeading)
  const variant = index === 0 ? 'overview' : undefined

  return (
    <section ref={ref} id={section.id} className="cs-section reveal" aria-labelledby={`${section.id}-title`}>
      {/* heading + text share a row, so the sticky heading stays beside its own text */}
      <div className="cs-section__row">
        <div className="cs-section__head">
          <span className="eyebrow">{pad(index + 1)}</span>
          <h2 id={`${section.id}-title`} className="cs-section__title">
            {section.title}
          </h2>
        </div>
        <div className="cs-section__content">
          <CaseMarkdown variant={variant}>{before}</CaseMarkdown>
        </div>
      </div>
      {media && (
        <div className="cs-section__media">
          <MediaBlock block={media} />
        </div>
      )}
      {after && (
        <div className="cs-section__row cs-section__row--after">
          <div className="cs-section__content">
            <CaseMarkdown>{after}</CaseMarkdown>
          </div>
        </div>
      )}
    </section>
  )
}

function NextProject({ study }) {
  return (
    <nav className="cs-next page-container" aria-label="Next project">
      <Link to={`/work/${study.slug}`} className="cs-next__link">
        <div className="cs-next__text">
          <span className="eyebrow">Next project</span>
          <span className="cs-next__title display-heading">
            {study.name}
            <ArrowCircleIcon className="cs-next__icon" />
          </span>
          {study.subtitle && <span className="cs-next__subtitle">{study.subtitle}</span>}
        </div>
        <div className="cs-next__thumb">
          <CoverImage cover={study.cover} decorative />
        </div>
      </Link>
    </nav>
  )
}

// One template for every case study. Content comes from /content/<slug>.md.
export default function CaseStudy() {
  const { slug } = useParams()
  const study = getCaseStudy(slug)
  if (!study) return <NotFound />
  const next = getNextCaseStudy(slug)

  return (
    <article className="cs" key={slug}>
      <header className="cs-hero page-container">
        <div className="cs-hero__intro">
          <Link to="/work" className="cs-back fade-in">
            <span aria-hidden="true">←</span> All work
          </Link>
          <h1 className="cs-hero__title display-heading fade-in" style={{ '--i': 1 }}>
            {study.name}
          </h1>
          {study.subtitle && (
            <p className="cs-hero__subtitle fade-in" style={{ '--i': 2 }}>
              {study.subtitle}
            </p>
          )}
        </div>

        <div className="cs-cover fade-in" style={{ '--i': 3 }}>
          <img className="cs-cover__backdrop" src={study.cover.src} alt="" aria-hidden="true" />
          <CoverImage cover={study.cover} className="cs-cover__img" loading="eager" />
        </div>

        {study.meta.length > 0 && (
          <dl className="cs-meta fade-in" style={{ '--i': 4 }}>
            {study.meta.map((m) => (
              <div key={m.label} className="cs-meta__item">
                <dt>{m.label}</dt>
                <dd>{m.value}</dd>
              </div>
            ))}
          </dl>
        )}
      </header>

      <div className="cs-body page-container">
        {study.sections.map((section, i) => (
          <Section key={section.id} section={section} index={i} media={study.media?.[section.id]} />
        ))}
      </div>

      <NextProject study={next} />
    </article>
  )
}
