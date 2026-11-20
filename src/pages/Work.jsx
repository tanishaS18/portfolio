import Hallway from '../components/work/Hallway.jsx'
import { WorkList } from '../components/work/WorkList.jsx'
import { useReducedMotion } from '../hooks/useReducedMotion.js'
import '../pages/Home.css'

// The Work page is the hallway walk. Visitors who prefer reduced motion get a
// still list of the same projects instead.
export default function Work() {
  const reduced = useReducedMotion()
  return reduced ? <WorkList /> : <Hallway />
}
