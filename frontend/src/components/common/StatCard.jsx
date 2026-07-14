import { cn } from "@/lib/utils";

/**
 * Single statistic cell (value + label). Static for now - Phase 5 will reuse
 * this with useCountUp for the "Why Choose UNIK" animated stats.
 */
export default function StatCard({ value, label, className, valueClassName, labelClassName }) {
  return (
    <div className={cn("flex flex-col items-center px-4 text-center", className)}>
      <span className={cn("font-heading text-3xl font-extrabold leading-none text-brand-green sm:text-4xl", valueClassName)}>
        {value}
      </span>
      <span className={cn("mt-2 text-xs font-medium leading-snug text-brand-muted sm:text-sm", labelClassName)}>
        {label}
      </span>
    </div>
  );
}
