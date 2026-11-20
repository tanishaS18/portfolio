import { useLayoutEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Nav from './Nav.jsx'
import Footer from './Footer.jsx'
import { pageHasFooter } from '../data/rooms.js'

// Every page gets the nav on top; every page except the hallway gets the contact footer.
export default function Layout() {
  const { pathname, hash } = useLocation()

  // New page → start at the top. With a #hash (e.g. #contact, #process) → jump to it.
  // Runs before the page paints and skips smooth scrolling, so a new page never
  // shows the old scroll position or a visible scroll back to the top.
  useLayoutEffect(() => {
    if (!hash) {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
      return
    }
    const id = decodeURIComponent(hash.slice(1))
    const frame = requestAnimationFrame(() => document.getElementById(id)?.scrollIntoView())
    return () => cancelAnimationFrame(frame)
  }, [pathname, hash])

  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <Nav />
      <main id="main">
        <Outlet />
      </main>
      {pageHasFooter(pathname) && <Footer />}
    </>
  )
}
