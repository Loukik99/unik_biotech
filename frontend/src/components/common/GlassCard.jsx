import { useRef } from "react";
import { cn } from "@/lib/utils";
import { prefersReducedMotion } from "@/components/animations/motion";

/**
 * Premium glass card. The hover border-glow and mouse-follow spotlight are
 * fully self-contained here (no global CSS utilities), so the effect stays
 * modular and only ships where a GlassCard is used.
 *
 * @param {boolean} [glow=true]      Border-glow ring on hover.
 * @param {boolean} [spotlight=false] Mouse-follow radial spotlight overlay.
 * @param {"light"|"dark"} [tone="light"]  Surface treatment.
 */
export default function GlassCard({
  as: Tag = "div",
  glow = true,
  spotlight = false,
  tone = "light",
  className,
  children,
  ...props
}) {
  const ref = useRef(null);

  const handleMouseMove = (e) => {
    if (!spotlight || !ref.current || prefersReducedMotion()) return;
    const rect = ref.current.getBoundingClientRect();
    ref.current.style.setProperty("--spot-x", `${e.clientX - rect.left}px`);
    ref.current.style.setProperty("--spot-y", `${e.clientY - rect.top}px`);
  };

  const toneClasses =
    tone === "dark"
      ? "border-white/10 bg-white/[0.06] backdrop-blur-md text-white"
      : "border-black/5 bg-white/80 backdrop-blur-md text-brand-ink";

  return (
    <Tag
      ref={ref}
      onMouseMove={handleMouseMove}
      className={cn(
        "group relative overflow-hidden rounded-card border shadow-soft transition-all duration-300",
        toneClasses,
        glow && "hover:-translate-y-1 hover:shadow-glow hover:border-brand-greenAccent/40",
        className
      )}
      {...props}
    >
      {spotlight && (
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100 motion-reduce:hidden"
          style={{
            background:
              "radial-gradient(320px circle at var(--spot-x, 50%) var(--spot-y, 0%), rgba(93,187,99,0.18), transparent 60%)",
          }}
        />
      )}
      <div className="relative">{children}</div>
    </Tag>
  );
}
