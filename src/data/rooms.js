/*
  The floor plan: every page of the site is a room in the house.
  Case study rooms come from src/data/caseStudies.js automatically.
*/
import { caseStudies } from './caseStudies.js'

export const ROOMS = [
  { id: 'entry', name: 'Entry', kind: 'Home', to: '/' },
  { id: 'hall', name: 'The Hallway', kind: 'Work', to: '/work' },
  { id: 'living', name: 'Living room', kind: 'About', to: '/about' },
  { id: 'studio', name: 'Studio', kind: 'Process', to: '/#process' },
  { id: 'mailbox', name: 'Mailbox', kind: 'Contact', to: '#contact' },
  ...caseStudies.map((c) => ({ id: `case-${c.slug}`, name: c.name, kind: 'Case study', to: `/work/${c.slug}` })),
]

// Which room a URL path belongs to (for "You are here").
export function currentRoomId(pathname) {
  if (pathname === '/') return 'entry'
  if (pathname === '/work') return 'hall'
  if (pathname === '/about') return 'living'
  const match = pathname.match(/^\/work\/([^/]+)/)
  return match ? `case-${match[1]}` : null
}

// The hallway has no footer, so "Contact" there goes to the one on the home page.
export const pageHasFooter = (pathname) => pathname !== '/work'
export const contactTarget = (pathname) => ({ pathname: pageHasFooter(pathname) ? pathname : '/', hash: '#contact' })
