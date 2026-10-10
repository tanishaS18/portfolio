import { useEffect, useRef } from 'react'

/*
  A prototype screen recording. The recordings already include the phone frame on
  black, so the video is cropped close to the phone and sits on the page directly.
  Lazy: nothing downloads until it's near the screen, and it pauses when off screen.
*/
export default function PhoneVideo({ src, poster, caption }) {
  const videoRef = useRef(null)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return
    video.muted = true
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (!video.getAttribute('src')) video.setAttribute('src', encodeURI(src))
          if (!reduceMotion) video.play().catch(() => {})
        } else {
          video.pause()
        }
      },
      { rootMargin: '200px 0px' },
    )
    observer.observe(video)
    return () => observer.disconnect()
  }, [src])

  return (
    <figure className="phone-video">
      <div className="phone-video__frame">
        <video
          ref={videoRef}
          className="phone-video__media"
          poster={poster}
          muted
          loop
          playsInline
          preload="none"
          aria-label={caption}
        />
      </div>
      {caption && <figcaption className="phone-video__caption">{caption}</figcaption>}
    </figure>
  )
}
