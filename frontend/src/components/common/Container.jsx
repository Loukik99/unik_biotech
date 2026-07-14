import { cn } from "@/lib/utils";

/**
 * Centered content wrapper capped at the 1280px design container with
 * responsive horizontal padding. Use inside sections to align content.
 */
export default function Container({ as: Tag = "div", className, children, ...props }) {
  return (
    <Tag className={cn("mx-auto w-full max-w-container px-4 sm:px-6 lg:px-8", className)} {...props}>
      {children}
    </Tag>
  );
}
