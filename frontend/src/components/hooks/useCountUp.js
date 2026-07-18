import { useEffect, useRef, useState } from "react";
import { DURATION, prefersReducedMotion } from "@/components/animations/motion";

/**
 * Animate a number from `start` to `end` using requestAnimationFrame.
 * The count only runs while `enabled` is true (pair with useReveal so stats
 * count up when scrolled into view). Reduced-motion snaps straight to `end`.
 *
 * @param {number} end                 Final value.
 * @param {Object} [options]
 * @param {boolean} [options.enabled=true]  Gate the animation (e.g. on view).
 * @param {number} [options.start=0]
 * @param {number} [options.duration=DURATION.reveal*2]  ms.
 * @param {number} [options.decimals=0]
 * @returns {number} The current animated value.
 */
export function useCountUp(end, { enabled = true, start = 0, duration = DURATION.reveal * 2, decimals = 0 } = {}) {
  const [value, setValue] = useState(start);
  const frameRef = useRef(null);
  const startedRef = useRef(false);

  useEffect(() => {
    if (!enabled || startedRef.current) return undefined;

    const round = (n) => Number(n.toFixed(decimals));

    if (prefersReducedMotion()) {
      setValue(round(end));
      return undefined;
    }

    startedRef.current = true;
    const startTime = performance.now();

    const tick = (now) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // easeOutCubic for a natural settle.
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(round(start + (end - start) * eased));
      if (progress < 1) {
        frameRef.current = requestAnimationFrame(tick);
      }
    };

    frameRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frameRef.current);
  }, [enabled, end, start, duration, decimals]);

  return value;
}

export default useCountUp;
