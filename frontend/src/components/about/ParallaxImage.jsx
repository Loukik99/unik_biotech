import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { cn } from "@/lib/utils";
import FarmImage from "@/components/landing/FarmImage";

/**
 * A shadow-safe, premium image block:
 *   - the outer (shadowed, rounded, clipped) box only cross-fades in — never
 *     transforms — so its box-shadow can't flicker while scrolling
 *   - the inner layer carries a very slight scroll-linked parallax drift and a
 *     baseline scale so there are no gaps at the edges
 *
 * prefers-reduced-motion is honoured globally via <MotionConfig reducedMotion>.
 */
export default function ParallaxImage({
  name,
  src,
  alt,
  sizes = "(min-width: 1024px) 45vw, 100vw",
  className = "",
  imgClassName = "",
  objectPosition = "center",
  priority = false,
}) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["-5%", "5%"]);

  return (
    <motion.div
      ref={ref}
      className={cn("relative overflow-hidden", className)}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: false, amount: 0.2 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <motion.div style={{ y, scale: 1.12 }} className="h-full w-full">
        {src ? (
          <img
            src={src}
            alt={alt}
            loading={priority ? "eager" : "lazy"}
            decoding="async"
            draggable="false"
            className={cn("h-full w-full object-cover", imgClassName)}
            style={{ objectPosition }}
          />
        ) : (
          <FarmImage
            name={name}
            alt={alt}
            sizes={sizes}
            priority={priority}
            className="block h-full w-full"
            imgClassName={cn("h-full w-full object-cover", imgClassName)}
            objectPosition={objectPosition}
          />
        )}
      </motion.div>
    </motion.div>
  );
}
