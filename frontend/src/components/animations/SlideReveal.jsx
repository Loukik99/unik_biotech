import { motion } from "motion/react";

/**
 * Directional scroll-reveal used across the homepage to give it an alternating,
 * premium rhythm:
 *   - content fades in while sliding 50px horizontally
 *   - `direction="left"` enters from the left, `direction="right"` from the right
 *   - 0.7s duration, easeOut
 *   - triggers when ~20% of the element is in view
 *   - re-animates whenever the element re-enters the viewport (once: false),
 *     but the 20% threshold keeps large sections from re-triggering/flickering
 *
 * prefers-reduced-motion is honoured globally through <MotionConfig
 * reducedMotion="user"> (see App.js): Framer then drops the horizontal offset
 * and only cross-fades, so no per-component handling is needed here.
 */

const DISTANCE = 50;

export const SLIDE_VIEWPORT = { once: false, amount: 0.2 };

const slideVariants = {
  hidden: (direction) => ({
    opacity: 0,
    x: direction === "right" ? DISTANCE : -DISTANCE,
  }),
  show: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.7, ease: "easeOut" },
  },
};

function motionTag(as) {
  return motion[as] || motion.div;
}

/**
 * A single element that slides + fades into view from one side.
 *
 * @param {string} [as="div"]         Intrinsic element to render.
 * @param {"left"|"right"} [direction="left"]  Side the element enters from.
 * @param {number} [amount]           Override the in-view threshold (0–1).
 */
export function SlideReveal({
  as = "div",
  direction = "left",
  amount,
  children,
  ...props
}) {
  const MotionTag = motionTag(as);
  return (
    <MotionTag
      custom={direction}
      variants={slideVariants}
      initial="hidden"
      whileInView="show"
      viewport={amount != null ? { once: false, amount } : SLIDE_VIEWPORT}
      {...props}
    >
      {children}
    </MotionTag>
  );
}
