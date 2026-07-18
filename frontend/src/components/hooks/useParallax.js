import { useEffect, useRef, useState } from "react";
import { prefersReducedMotion } from "@/components/animations/motion";

/**
 * Subtle vertical parallax driven by scroll position, throttled to rAF.
 * Returns a ref to attach to the element and the current `offset` (px) you can
 * feed into a transform. Reduced-motion keeps the offset at 0 (no-op).
 *
 * @param {number} [strength=0.15]  Fraction of scroll distance to translate.
 * @param {number} [max=60]         Clamp for the offset (px).
 */
export function useParallax(strength = 0.15, max = 60) {
  const ref = useRef(null);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const node = ref.current;
    if (!node || prefersReducedMotion()) return undefined;

    let ticking = false;

    const update = () => {
      const rect = node.getBoundingClientRect();
      const viewportCenter = window.innerHeight / 2;
      const elementCenter = rect.top + rect.height / 2;
      const distance = elementCenter - viewportCenter;
      const next = Math.max(-max, Math.min(max, -distance * strength));
      setOffset(next);
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [strength, max]);

  return [ref, offset];
}

export default useParallax;
