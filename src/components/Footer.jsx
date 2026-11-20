import { site } from '../data/site.js'
import { LinkedInIcon, MailIcon, InstagramIcon } from './Icons.jsx'
import { useReveal } from '../hooks/useReveal.js'
import './Footer.css'

const LINKS = [
  { label: 'LinkedIn', href: site.linkedin, Icon: LinkedInIcon, external: true },
  { label: 'Email', href: `mailto:${site.email}`, Icon: MailIcon },
  { label: 'Instagram', href: site.instagram, Icon: InstagramIcon, external: true },
]

export default function Footer() {
  const ref = useReveal()

  return (
    <footer id="contact" className="contact page-container">
      <div ref={ref} className="contact__inner reveal">
        <div className="contact__text">
          <h2 className="display-heading contact__title">Let’s Build Something</h2>
          <p className="contact__copy">
            I’m always looking for opportunities to design, learn and make things matter. Feel free to reach
            out :)
          </p>
        </div>

        <ul className="contact__links">
          {LINKS.map(({ label, href, Icon, external }) => (
            <li key={label}>
              <a href={href} {...(external ? { target: '_blank', rel: 'noreferrer' } : {})}>
                <span className="contact__icon">
                  <Icon />
                </span>
                <span className="contact__label">{label}</span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  )
}
