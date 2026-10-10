import { site } from '../data/site.js'
import { LinkedInIcon, MailIcon, InstagramIcon } from './Icons.jsx'
import { useReveal } from '../hooks/useReveal.js'
import './Footer.css'

export default function Footer() {
  const ref = useReveal()

  return (
    <footer id="contact" className="contact">
      <div ref={ref} className="contact__inner reveal">
        <h2 className="display-heading contact__title">Let’s Build Something</h2>
        <p className="contact__copy">
          I’m always looking for opportunities to design, learn and make things matter. Feel free to reach
          out :)
        </p>

        <ul className="contact__links">
          <li>
            <a href={site.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn">
              <LinkedInIcon />
            </a>
          </li>
          <li>
            <a href={`mailto:${site.email}`} aria-label={`Email ${site.email}`}>
              <MailIcon className="contact__icon--mail" />
            </a>
          </li>
          <li>
            <a href={site.instagram} target="_blank" rel="noreferrer" aria-label="Instagram">
              <InstagramIcon />
            </a>
          </li>
        </ul>
      </div>
    </footer>
  )
}
