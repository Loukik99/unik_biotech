/**
 * Named reveal/transition presets expressed as Tailwind class strings.
 * Components apply `REVEAL[variant].hidden` initially and swap to `.visible`
 * once in view (see useReveal). Keeps every reveal on the same subtle language.
 */

// Shared transition applied to any revealing element.
export const REVEAL_TRANSITION =
  "transition-all duration-700 ease-standard will-change-transform motion-reduce:transition-none";

// hidden -> visible class pairs for each allowed reveal.
export const REVEAL = {
  "fade-up": {
    hidden: "opacity-0 translate-y-6",
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
