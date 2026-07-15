import { useEffect, useRef, useState } from "react";
import { prefersReducedMotion } from "@/components/animations/motion";

/**
 * Scroll-triggered reveal via IntersectionObserver.
 * Returns a ref to attach to the target and a boolean `isVisible`.
 * Under prefers-reduced-motion the element is considered visible immediately.
 *
 * @param {Object} [options]
 * @param {number} [options.threshold=0.15]  Portion visible before triggering.
 * @param {string} [options.rootMargin="0px 0px -10% 0px"]
 * @param {boolean} [options.once=true]  Stop observing after first reveal.
 */
export function useReveal({ threshold = 0.2, rootMargin = "0px 0px -10% 0px", once = true } = {}) {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return undefined;

    if (prefersReducedMotion() || typeof IntersectionObserver === "undefined") {
      setIsVisible(true);
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            if (once) observer.unobserve(entry.target);
          } else if (!once) {
            setIsVisible(false);
          }
        });
      },
      { threshold, rootMargin }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [threshold, rootMargin, once]);

  return [ref, isVisible];
}

export default useReveal;
