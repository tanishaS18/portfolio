import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowCircleIcon } from '../Icons.jsx'
import { useReveal } from '../../hooks/useReveal.js'

/*
  poster.png is the full laptop (transparent background) and acts as the frame.
  The video is cropped to just its screen area and laid over the poster's screen,
  so the page shows one laptop. Until the video starts, you see the poster as is.
*/
export default function WorkPreview() {
  const revealRef = useReveal()
  const videoRef = useRef(null)
  const [playing, setPlaying] = useState(false)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return
    video.muted = true // set as a property too: some browsers ignore the attribute for autoplay

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduceMotion) {
      video.pause()
      return
    }

    // Play only while on screen, to save battery and data.
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) video.play().catch(() => {})
        else video.pause()
      },
      { threshold: 0.2 },
    )
    observer.observe(video)
    return () => observer.disconnect()
  }, [])

  return (
    <section className="work-preview page-container" aria-labelledby="work-preview-title">
      <div ref={revealRef} className="reveal">
        <h2 id="work-preview-title" className="work-preview__heading">
          <Link to="/work" className="view-link display-heading">
            View
            <ArrowCircleIcon className="view-link__icon" />
            <span className="visually-hidden"> my work</span>
          </Link>
        </h2>

        <Link to="/work" className="laptop" aria-label="View my work">
          <img
            className="laptop__frame"
            src="/assets/poster.png"
            alt="Laptop showing the SwiftPay prepaid card app screens"
            width="1094"
            height="800"
            loading="lazy"
          />
          <div className="laptop__screen">
            <video
              ref={videoRef}
              className={`laptop__video${playing ? ' is-playing' : ''}`}
              src="/assets/work.mp4"
              muted
              loop
              playsInline
              preload="metadata"
              aria-hidden="true"
              onPlaying={() => setPlaying(true)}
            />
          </div>
        </Link>
      </div>
    </section>
  )
}
