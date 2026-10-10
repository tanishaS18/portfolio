// A still prototype screen, loaded as a regular image file and lazy-loaded.
export default function PhoneScreen({ src, alt, width, height }) {
  return (
    <figure className="phone-screen">
      <img src={encodeURI(src)} alt={alt} width={width} height={height} loading="lazy" decoding="async" />
    </figure>
  )
}
