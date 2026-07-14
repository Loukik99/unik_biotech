/**
 * Responsive <picture> for the optimized photography in /public/unik.
 *
 * Every source photo was exported by scripts/optimize-images.mjs to
 * webp + jpg at the widths below. This component wires up srcset/sizes
 * and lazy-loading so the browser only fetches what it needs.
 */
const WIDTHS = [640, 1024, 1600, 2000, 2560];

export default function FarmImage({
  name,
  alt,
  sizes = "100vw",
  className = "",
  imgClassName = "",
  priority = false,
  fallbackWidth = 1600,
  objectPosition,
  style,
}) {
  const webpSet = WIDTHS.map((w) => `/unik/${name}-${w}.webp ${w}w`).join(", ");
  const jpgSet = WIDTHS.map((w) => `/unik/${name}-${w}.jpg ${w}w`).join(", ");

  return (
    <picture className={className}>
      <source type="image/webp" srcSet={webpSet} sizes={sizes} />
      <img
        src={`/unik/${name}-${fallbackWidth}.jpg`}
        srcSet={jpgSet}
        sizes={sizes}
        alt={alt}
        loading={priority ? "eager" : "lazy"}
        fetchPriority={priority ? "high" : "auto"}
        decoding="async"
        draggable="false"
        className={imgClassName}
        style={{ objectPosition, ...style }}
      />
    </picture>
  );
}
