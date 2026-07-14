import { cn } from "@/lib/utils";
import AnimatedHeading from "@/components/common/AnimatedHeading";

/**
 * Consistent section header: small eyebrow label, a revealing heading, and an
 * optional subtitle. Keeps typographic hierarchy identical across sections.
 *
 * @param {string} [eyebrow]   Small uppercase kicker above the title.
 * @param {"left"|"center"} [align="left"]
 * @param {"light"|"dark"} [tone="light"]  Adjusts subtitle/eyebrow contrast.
 */
export default function SectionTitle({
  eyebrow,
  title,
  subtitle,
  align = "left",
  tone = "light",
  as = "h2",
  eyebrowDash = true,
  className,
  titleClassName,
  ...props
}) {
  const alignClasses = align === "center" ? "text-center items-center mx-auto" : "text-left items-start";
  const subtitleColor = tone === "dark" ? "text-white/70" : "text-brand-muted";

  return (
    <div className={cn("flex max-w-3xl flex-col gap-4", alignClasses, className)} {...props}>
      {eyebrow && (
        <span
          className={cn(
            "inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-brand-green",
            align === "center" && "justify-center"
          )}
        >
          {eyebrowDash && <span className="h-px w-6 bg-brand-greenAccent" aria-hidden="true" />}
          {eyebrow}
        </span>
      )}

      {title && (
        <AnimatedHeading as={as} className={cn("text-3xl font-bold sm:text-4xl lg:text-5xl", titleClassName)}>
          {title}
        </AnimatedHeading>
      )}

      {subtitle && <p className={cn("text-base leading-relaxed sm:text-lg", subtitleColor)}>{subtitle}</p>}
    </div>
  );
}
