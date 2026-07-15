import { motion } from "motion/react";

/**
 * Shared scroll-reveal primitive used by every major section so the entrance
 * animation stays identical site-wide:
 *   - content fades in and rises 30px
 *   - 0.6s duration, easeOut
 *   - triggers once, when ~20% of the section is in view
 *   - ~90ms stagger between child elements
 *
 * prefers-reduced-motion is honoured globally through <MotionConfig
 * reducedMotion="user"> (see App.js): Framer then drops the transform and only
 * cross-fades, so no per-component handling is needed here.
 */

export const REVEAL_VIEWPORT = { once: true, amount: 0.2 };

// 90ms between children — within the requested 80–100ms window.
const STAGGER = 0.09;

const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: STAGGER } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

function motionTag(as) {
  return motion[as] || motion.div;
}

/**
 * Reveal container. By default it triggers itself when scrolled into view and
 * staggers its RevealItem children.
 *
 * Pass `group` for a nested container that inherits its parent's trigger
 * instead of firing on its own — this lets staggers compose across layout
 * levels (e.g. a grid that staggers its columns, each column staggering its
 * own lines).
 *
 * @param {string}  [as="div"]   Intrinsic element to render.
 * @param {boolean} [group]      Inherit parent trigger instead of self-firing.
 * @param {number}  [amount]     Override the in-view threshold (0–1).
 */
export function Reveal({ as = "div", group = false, amount, children, ...props }) {
  const MotionTag = motionTag(as);
  const trigger = group
    ? {}
    : {
        initial: "hidden",
        whileInView: "show",
        viewport: amount != null ? { once: true, amount } : REVEAL_VIEWPORT,
      };
  return (
    <MotionTag variants={containerVariants} {...trigger} {...props}>
      {children}
    </MotionTag>
  );
}

/** A single revealing element (fade + 30px rise). Must live inside a <Reveal>. */
export function RevealItem({ as = "div", children, ...props }) {
  const MotionTag = motionTag(as);
  return (
    <MotionTag variants={itemVariants} {...props}>
      {children}
    </MotionTag>
  );
}
