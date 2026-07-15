/**
 * Named reveal/transition presets expressed as Tailwind class strings.
 * Components apply `REVEAL[variant].hidden` initially and swap to `.visible`
 * once in view (see useReveal). Keeps every reveal on the same subtle language.
 */

// Shared transition applied to any revealing element.
//
// NOTE: no permanent `will-change` here. `will-change: transform` promotes the
// element onto its own GPU compositor layer and *keeps it there forever*, which
// makes any large soft box-shadow on the element (e.g. shadow-soft / shadow-glass)
// re-rasterize on every scroll frame — the shadow shimmers and the card looks like
// its elevation is changing while scrolling. Browsers already GPU-accelerate the
// opacity/transform reveal for the duration of the active transition on their own,
// so the hint is unnecessary and only causes the flicker.
// Timing kept in lockstep with the Framer Motion reveal primitive
// (components/animations/Reveal.jsx): 0.6s, ease-out — so section reveals feel
// identical whether a page uses this CSS system or Framer.
export const REVEAL_TRANSITION =
  "transition-all [transition-duration:600ms] ease-out motion-reduce:transition-none";

// hidden -> visible class pairs for each allowed reveal.
export const REVEAL = {
  "fade-up": {
    // 30px rise, matching the shared reveal spec.
    hidden: "opacity-0 translate-y-[30px]",
    visible: "opacity-100 translate-y-0",
  },
  "blur-reveal": {
    hidden: "opacity-0 blur-md translate-y-4",
    visible: "opacity-100 blur-0 translate-y-0",
  },
  fade: {
    hidden: "opacity-0",
    visible: "opacity-100",
  },
  "scale-in": {
    hidden: "opacity-0 scale-95",
    visible: "opacity-100 scale-100",
  },
};

/**
 * Resolve reveal classes for a given variant and visibility state.
 * @param {keyof REVEAL} variant
 * @param {boolean} isVisible
 */
export function revealClasses(variant = "fade-up", isVisible = false) {
  const preset = REVEAL[variant] || REVEAL["fade-up"];
  return `${REVEAL_TRANSITION} ${isVisible ? preset.visible : preset.hidden}`;
}
