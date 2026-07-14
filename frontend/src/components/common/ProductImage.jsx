import { useState } from "react";

/**
 * Renders a product image and gracefully degrades to `fallback` when there is
 * no `src` or the image fails to load (e.g. a missing/renamed file). This keeps
 * broken-image icons off the page even if a data path ever points at a file
 * that isn't present on disk.
 */
export default function ProductImage({ src, alt, imgClassName, fallback = null }) {
  const [errored, setErrored] = useState(false);

  if (!src || errored) return fallback;

  return (
    <img
      src={src}
      alt={alt}
      loading="lazy"
      decoding="async"
      className={imgClassName}
      onError={() => setErrored(true)}
    />
  );
}
