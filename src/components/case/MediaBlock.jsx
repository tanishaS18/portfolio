import PhoneVideo from './PhoneVideo.jsx'
import PhoneScreen from './PhoneScreen.jsx'

// Each item is either a screen recording (videos) or a still screen (screens).
function items(block, { withCaptions }) {
  if (block.videos) {
    return block.videos.map((v) => (
      <PhoneVideo key={v.src} src={v.src} poster={v.poster} caption={withCaptions ? v.caption : undefined} />
    ))
  }
  return (block.screens ?? []).map((s) => <PhoneScreen key={s.src} {...s} />)
}

export default function MediaBlock({ block }) {
  const theme = block.theme === 'light' ? ' media--light' : ''

  if (block.layout === 'phone-split') {
    const caption = block.caption ?? block.videos?.[0]?.caption
    return (
      <div className={`media-split media-split--${block.side ?? 'right'}${theme}`}>
        <div className="media-split__phone">{items(block, { withCaptions: false })}</div>
        <div className="media-split__text">
          {block.label && <span className="eyebrow">{block.label}</span>}
          <p className="media-split__caption">{caption}</p>
        </div>
      </div>
    )
  }

  // phone-row: 2–3 across on desktop, swipeable on phones
  const row = (
    <div className="media-row" style={{ '--count': (block.videos ?? block.screens).length }}>
      {items(block, { withCaptions: true })}
    </div>
  )
  if (!block.caption) return row
  return (
    <figure className={`media-group${theme}`}>
      {row}
      <figcaption className="media-group__caption">{block.caption}</figcaption>
    </figure>
  )
}
