// A cover image with an optimized .webp and the original .png as fallback.
export default function CoverImage({ cover, className = '', loading = 'lazy', decorative = false }) {
  return (
    <picture>
      <source srcSet={cover.src} type="image/webp" />
      <img
        className={className}
        src={cover.fallback}
        alt={decorative ? '' : cover.alt}
        width={cover.width}
        height={cover.height}
        loading={loading}
        decoding="async"
      />
    </picture>
  )
}
