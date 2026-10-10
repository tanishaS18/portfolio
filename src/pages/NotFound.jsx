import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <section className="page-container stub-page">
      <h1 className="display-heading">Page not found</h1>
      <p>
        <Link to="/" className="text-link">
          Back home
        </Link>
      </p>
    </section>
  )
}
