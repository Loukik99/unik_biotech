import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva } from "class-variance-authority";

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground shadow hover:bg-primary/90",
        destructive:
          "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
        outline:
          "border border-input shadow-sm hover:bg-accent hover:text-accent-foreground",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
        // Premium design-system variants. Add class `btn-arrow` to a trailing
        // icon to get the subtle hover arrow-slide.
        primary:
          "rounded-full bg-brand-green text-white shadow-soft transition-all duration-200 hover:bg-brand-greenDark hover:-translate-y-0.5 hover:shadow-glass focus-visible:ring-brand-green [&_.btn-arrow]:transition-transform [&_.btn-arrow]:duration-200 hover:[&_.btn-arrow]:translate-x-1",
        // Glass outline: adapts to surrounding text color, works on dark or light surfaces.
        secondary:
          "rounded-full border border-current/25 bg-transparent backdrop-blur-md shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-current/[0.06] [&_.btn-arrow]:transition-transform [&_.btn-arrow]:duration-200 hover:[&_.btn-arrow]:translate-x-1",
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-10 rounded-md px-8",
        xl: "h-12 rounded-full px-8 text-base",
        icon: "h-9 w-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

const Button = React.forwardRef(({ className, variant, size, asChild = false, ...props }, ref) => {
  const Comp = asChild ? Slot : "button"
  return (
    <Comp
      className={cn(buttonVariants({ variant, size, className }))}
      ref={ref}
      {...props} />
  );
})
Button.displayName = "Button"

export { Button, buttonVariants }
