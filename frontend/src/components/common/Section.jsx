import { cn } from "@/lib/utils";
import Container from "@/components/common/Container";

/**
 * Full-width section that drives the alternating background rhythm and the
 * large vertical spacing between homepage sections. Wraps children in a
 * Container by default so pages stay aligned to the 1280px grid.
 */

const TONES = {
  light: "bg-brand-bgLight text-brand-ink",
  dark: "bg-brand-bgDark text-white",
  green: "bg-brand-green text-white",
  // Featured Products surface: white Bento cards sit on this soft green tint.
  softGreen: "bg-[#EAF3EC] text-brand-ink",
};

const SPACING = {
  sm: "py-section-sm",
  base: "py-section",
  lg: "py-section-lg",
};

export default function Section({
  as: Tag = "section",
  tone = "light",
  spacing = "base",
  container = true,
  containerClassName,
  className,
  children,
  ...props
}) {
  return (
    <Tag className={cn("relative w-full", TONES[tone] || TONES.light, SPACING[spacing] || SPACING.base, className)} {...props}>
      {container ? <Container className={containerClassName}>{children}</Container> : children}
    </Tag>
  );
}
