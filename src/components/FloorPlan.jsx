import { useEffect, useRef } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { ROOMS, currentRoomId, contactTarget } from '../data/rooms.js'
import './FloorPlan.css'

/*
  "Floor plan" dialog: a map of the site as rooms in a house. Click a room to go there.
  On phones it doubles as the menu. Uses the native <dialog>, so Esc closes it and
  focus stays inside while it's open.
*/
export default function FloorPlan({ open, onClose }) {
  const dialogRef = useRef(null)
  const { pathname } = useLocation()
  const here = currentRoomId(pathname)

  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return
    if (open && !dialog.open) dialog.showModal()
    if (!open && dialog.open) dialog.close()
  }, [open])

  const caseRooms = ROOMS.filter((r) => r.id.startsWith('case-'))
  const emptySlots = Math.max(0, 3 - caseRooms.length)

  const roomLink = (room) => {
    const to = room.id === 'mailbox' ? contactTarget(pathname) : room.to
    const isHere = room.id === here
    return (
      <li key={room.id} className={`room room--${room.id.startsWith('case-') ? 'case' : room.id}${isHere ? ' is-here' : ''}`}>
        <Link to={to} onClick={onClose} aria-current={isHere ? 'page' : undefined}>
          <span className="room__name">{room.name}</span>
          <span className="room__kind mono-label">
            {room.kind}
            {isHere && ' · You are here'}
          </span>
        </Link>
      </li>
    )
  }

  return (
    <dialog
      ref={dialogRef}
      className="floorplan"
      aria-labelledby="floorplan-title"
      onClose={onClose}
      onClick={(e) => {
        if (e.target === dialogRef.current) onClose()
      }}
    >
      <div className="floorplan__panel">
        <button type="button" className="floorplan__close" onClick={onClose} aria-label="Close floor plan">
          <span aria-hidden="true">×</span>
        </button>
        <h2 id="floorplan-title" className="floorplan__title">
          Floor plan
        </h2>
        <p className="floorplan__hint">Click any room to go straight there.</p>

        <nav aria-label="Floor plan">
          <ul className="floorplan__grid">
            {ROOMS.filter((r) => !r.id.startsWith('case-')).map(roomLink)}
            {caseRooms.map(roomLink)}
            {Array.from({ length: emptySlots }, (_, i) => (
              <li key={`empty-${i}`} className="room room--case room--empty" aria-hidden="true">
                <span className="room__kind mono-label">More rooms soon</span>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </dialog>
  )
}
