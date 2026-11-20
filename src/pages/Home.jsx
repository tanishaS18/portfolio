import { Link } from 'react-router-dom'
import Hero from '../components/home/Hero.jsx'
import Process from '../components/home/Process.jsx'
import { ArrowCircleIcon } from '../components/Icons.jsx'
import { useReveal } from '../hooks/useReveal.js'
import './Home.css'

function ViewWork() {
  const ref = useReveal()
  return (
    <div ref={ref} className="view-work page-container reveal">
      <Link to="/work" className="view-work__link">
        View the work
        <ArrowCircleIcon className="view-work__icon" />
      </Link>
    </div>
  )
}

export default function Home() {
  return (
    <>
      <Hero />
      <Process />
      <ViewWork />
    </>
  )
}
