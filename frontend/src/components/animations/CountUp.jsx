import { useEffect, useMemo, useRef, useState } from "react";
import { useReducedMotion } from "motion/react";

/**
 * Parse a stat string into a countable number + suffix.
 * Only strings that START with a digit are treated as numbers, so labels like
 * "ISO 9001:2008" are left untouched.
 *   "20+"       -> { target: 20,     suffix: "+" }
 *   "10,000+"   -> { target: 10000,  suffix: "+" }
 *   "100+"      -> { target: 100,    suffix: "+" }
 */
function parseStat(value) {
  const str = String(value).trim();
  if (!/^\d/.test(str)) return null;
  const match = str.match(/^([\d,]+)(.*)$/);
  if (!match) return null;
  return {
    target: parseInt(match[1].replace(/,/g, ""), 10),
    suffix: match[2],
  };
}

const format = (n) => n.toLocaleString("en-US");

/**
 * Counts a numeric stat up from 0 to its target value whenever it scrolls into
 * view, and resets once it leaves — so the count-up replays every time the user
 * scrolls back to it. Non-numeric values render unchanged, and users who prefer
 * reduced motion see the final value immediately.
 */
export default function CountUp({ value, duration = 1600, className }) {
  const stat = useMemo(() => parseStat(value), [value]);
  const reduce = useReducedMotion();
  const ref = useRef(null);
  const frame = useRef(0);
  const [display, setDisplay] = useState(stat ? format(0) : value);

  useEffect(() => {
    if (!stat) return undefined;
    const node = ref.current;
    if (!node) return undefined;

    if (reduce) {
      setDisplay(format(stat.target));
      return undefined;
    }

    const run = () => {
      cancelAnimationFrame(frame.current);
      const start = performance.now();
      const step = (now) => {
        const progress = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3); // easeOutCubic
        setDisplay(format(Math.round(eased * stat.target)));
        if (progress < 1) frame.current = requestAnimationFrame(step);
      };
      frame.current = requestAnimationFrame(step);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            run();
          } else {
            // Reset when it scrolls away so the next entry replays the count.
            cancelAnimationFrame(frame.current);
            setDisplay(format(0));
          }
        });
      },
      { threshold: 0.4 }
    );

    observer.observe(node);
    return () => {
      cancelAnimationFrame(frame.current);
      observer.disconnect();
    };
  }, [stat, reduce, duration]);

  if (!stat) {
    return <span className={className}>{value}</span>;
  }

  return (
    <span ref={ref} className={className}>
      {display}
      {stat.suffix}
    </span>
  );
}
