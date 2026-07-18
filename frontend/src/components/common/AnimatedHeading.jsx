import { cn } from "@/lib/utils";
import { useReveal } from "@/components/hooks/useReveal";
import { revealClasses } from "@/components/animations/transitions";

/**
 * Heading that reveals with a subtle blur/fade-up as it scrolls into view.
 * Renders any heading level via the `as` prop and uses the shared reveal
 * presets so timing matches the rest of the site.
 */
export default function AnimatedHeading({
  as: Tag = "h2",
  variant = "blur-reveal",
  className,
  children,
  ...props
}) {
  const [ref, isVisible] = useReveal();

  return (
    <Tag ref={ref} className={cn("font-heading", revealClasses(variant, isVisible), className)} {...props}>
      {children}
    </Tag>
  );
}
