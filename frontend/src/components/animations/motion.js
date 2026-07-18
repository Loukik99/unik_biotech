/**
 * Shared motion primitives (durations, easings, stagger) for the design system.
 * Plain constants only - no animation library. Consumed by hooks and components
 * so timing stays consistent and is never hardcoded per component.
 */

// Durations in milliseconds.
export const DURATION = {
  fast: 150,
  base: 250,
  slow: 400,
  reveal: 700,
};

// Easing curves. `standard` is the premium ease-out used across reveals.
export const EASING = {
  standard: "cubic-bezier(0.22, 1, 0.36, 1)",
  emphasized: "cubic-bezier(0.16, 1, 0.3, 1)",
  linear: "linear",
};

// Base delay (ms) between staggered children.
export const STAGGER = 80;

/** True when the user has requested reduced motion. Safe on SSR/non-browser. */
export function prefersReducedMotion() {
  if (typeof window === "undefined" || !window.matchMedia) return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}
