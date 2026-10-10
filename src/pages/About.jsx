import { about } from '../data/about.js'
import { useReveal } from '../hooks/useReveal.js'
import './About.css'

function Divider() {
  return (
    <span className="about-sep" aria-hidden="true">
      |
    </span>
  )
}

export default function About() {
  const experienceRef = useReveal()
  const hobbiesRef = useReveal()

  return (
    <div className="about page-container">
      <section className="about-intro" aria-labelledby="about-title">
        <picture className="about-intro__photo fade-in">
          <source srcSet={about.photo.src} type="image/webp" />
          <img
            src={about.photo.fallback}
            alt={about.photo.alt}
            width={about.photo.width}
            height={about.photo.height}
            decoding="async"
          />
        </picture>

        <div className="about-intro__text">
          <h1 id="about-title" className="about-intro__title fade-in" style={{ '--i': 1 }}>
            {about.heading}
          </h1>
          <p className="about-intro__bio fade-in" style={{ '--i': 2 }}>
            {about.bio}
          </p>
          <p className="about-intro__tagline fade-in" style={{ '--i': 3 }}>
            {about.tagline}
          </p>
          <p className="about-intro__location fade-in" style={{ '--i': 4 }}>
            {about.location}
          </p>
        </div>
      </section>

      <section ref={experienceRef} className="about-experience reveal" aria-labelledby="experience-title">
        <h2 id="experience-title" className="display-heading about-heading">
          Work Experience
        </h2>
        <ul className="about-experience__list">
          {about.experience.map((job) => (
            <li key={`${job.role}-${job.company}`} className="about-job">
              <p className="about-job__role">
                {job.role} <Divider /> {job.company}
              </p>
              <p className="about-job__meta">
                {job.dates} <Divider /> {job.location}
              </p>
            </li>
          ))}
        </ul>
      </section>

      <section ref={hobbiesRef} className="about-hobbies reveal" aria-labelledby="hobbies-title">
        <h2 id="hobbies-title" className="display-heading about-heading">
          Hobbies &amp; Interests
        </h2>
        <ul className="about-hobbies__list">
          {about.hobbies.map((hobby) => (
            <li key={hobby}>{hobby}</li>
          ))}
        </ul>
      </section>
    </div>
  )
}
