import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "motion/react";
import { ArrowRight, BadgeCheck } from "lucide-react";
import FarmImage from "@/components/landing/FarmImage";

const HEADLINE = ["Unik", "Biotech", "Research"];

const EASE = [0.22, 1, 0.36, 1];

// Cinematic scrims: dark on the left (headline) and bottom (badge), clearing
// toward the brighter right so the photograph still breathes.
const SCRIM_LEFT =
  "linear-gradient(90deg, rgba(14,24,17,0.9) 0%, rgba(14,24,17,0.6) 30%, rgba(14,24,17,0.08) 62%, rgba(14,24,17,0) 100%)";
const SCRIM_BOTTOM =
  "linear-gradient(0deg, rgba(11,19,14,0.92) 0%, rgba(11,19,14,0.35) 24%, rgba(11,19,14,0) 48%)";
const SCRIM_TOP =
  "linear-gradient(180deg, rgba(9,16,11,0.55) 0%, rgba(9,16,11,0) 20%)";

// Cinematic slideshow — three photographs, in this exact order.
const SLIDES = [
  { name: "mustard-farmer", alt: "An Indian farmer working in a blooming mustard field", pos: "55% 50%" },
  { name: "rice-spraying", alt: "A farmer tending a lush green paddy field beneath palms", pos: "50% 55%" },
  { name: "farmer-valley", alt: "A lone farmer walking through green fields beneath mountains", pos: "50% 55%" },
];

const HOLD_MS = 4000; // each image stays 4s
const FADE = 1.4; // crossfade 1.4s for a smoother blend
const KEN_BURNS = (HOLD_MS + FADE * 1000) / 1000; // scale drift spans hold + fade

export default function Hero() {
  const [index, setIndex] = useState(0); // always starts from the first image on load
  const [reduced, setReduced] = useState(false);
  const timer = useRef(null);

  // Respect prefers-reduced-motion.
  useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) return undefined;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => setReduced(mq.matches);
    apply();
    mq.addEventListener?.("change", apply);
    return () => mq.removeEventListener?.("change", apply);
  }, []);

  // Advance the slideshow continuously
  useEffect(() => {
    timer.current = setInterval(() => {
      setIndex((i) => (i + 1) % SLIDES.length);
    }, HOLD_MS);
    return () => clearInterval(timer.current);
  }, []);

  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-farm-forestDeep">
      {/* Cinematic crossfading + Ken Burns background */}
      <div className="absolute inset-0">
        {SLIDES.map((slide, i) => {
          const active = i === index;
          return (
            <motion.div
              key={slide.name}
              className="absolute inset-0 will-change-transform"
              initial={false}
              animate={{
                opacity: active ? 1 : 0,
                scale: active ? 1.08 : 1,
              }}
              transition={{
                opacity: { duration: FADE, ease: "easeInOut" },
                scale: { duration: active ? KEN_BURNS : FADE, ease: "easeInOut" },
              }}
              style={{ transformOrigin: "center" }}
            >
              <FarmImage
                name={slide.name}
                alt={slide.alt}
                priority={i === 0}
                fallbackWidth={2000}
                sizes="100vw"
                className="absolute inset-0 h-full w-full"
                imgClassName="h-full w-full object-cover"
                objectPosition={slide.pos}
                style={{ filter: "saturate(1.05) contrast(1.03)" }}
              />
            </motion.div>
          );
        })}
        <div className="absolute inset-0" style={{ background: SCRIM_LEFT }} />
        <div className="absolute inset-0" style={{ background: SCRIM_BOTTOM }} />
        <div className="absolute inset-0" style={{ background: SCRIM_TOP }} />
      </div>

      {/* Content column */}
      <div className="relative z-10 mx-auto flex min-h-screen max-w-6xl flex-col justify-end px-5 pt-28 sm:px-6 sm:pt-32">
        {/* Headline + CTAs — anchored lower-left. Reveal once on load; they stay
            fixed while only the background crossfades. */}
        <motion.div
          initial="hidden"
          animate="show"
          variants={{
            hidden: {},
            show: {
              transition: {
                staggerChildren: 0.15,
              },
            },
          }}
          className="max-w-4xl pb-24 sm:pb-28 lg:pb-32"
        >
          <motion.h1
            variants={{
              hidden: { opacity: 0, y: 12 },
              show: { opacity: 1, y: 0, transition: { duration: 0.65, ease: "easeOut" } },
            }}
            className="font-heading font-semibold leading-[0.9] tracking-[-0.02em] text-[#EAE7CF]"
          >
            {HEADLINE.map((line) => (
              <span
                key={line}
                className="block text-[11vw] leading-[0.9] sm:text-5xl md:text-6xl lg:text-7xl xl:text-[6.25rem]"
              >
                {line}
              </span>
            ))}
          </motion.h1>

          <motion.p
            variants={{
              hidden: { opacity: 0, y: 12 },
              show: { opacity: 1, y: 0, transition: { duration: 0.65, ease: "easeOut" } },
            }}
            className="mt-6 max-w-xl text-[15px] leading-relaxed text-farm-cream/85 sm:text-base lg:text-lg"
          >
            Trusted by farmers across India. Delivering quality agricultural inputs
            for better yields, healthier soil, and sustainable farming since 2005.
          </motion.p>

          <motion.div
            variants={{
              hidden: { opacity: 0, y: 12 },
              show: { opacity: 1, y: 0, transition: { duration: 0.65, ease: "easeOut", delay: 0.15 } },
            }}
            className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center"
          >
            <Link
              to="/products"
              className="group inline-flex items-center justify-center gap-2 rounded-full bg-farm-gold px-7 py-3.5 text-[15px] font-semibold text-farm-forestDeep shadow-lg shadow-black/20 transition-all duration-300 hover:-translate-y-0.5 hover:bg-farm-goldSoft"
            >
              Explore Our Products
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
            <Link
              to="/contact"
              className="group inline-flex items-center justify-center gap-2 rounded-full border border-white/35 bg-white/5 px-7 py-3.5 text-[15px] font-semibold text-farm-cream backdrop-blur-md transition-all duration-300 hover:-translate-y-0.5 hover:bg-white/12"
            >
              Talk to Our Team
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </motion.div>
        </motion.div>
      </div>

      {/* Certification badge — warm off-white, editorial, no glassmorphism */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: EASE, delay: 0.5 }}
        className="absolute bottom-28 right-5 z-10 hidden md:block xl:right-8"
      >
        <div className="flex items-center gap-3 rounded-2xl border border-farm-ink/10 bg-farm-cream px-4 py-3 shadow-[0_10px_30px_-16px_rgba(0,0,0,0.5)]">
          <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-farm-forest/10 text-farm-forest">
            <BadgeCheck className="h-6 w-6" strokeWidth={1.75} />
          </span>
          <div className="leading-tight">
            <p className="font-heading text-[15px] font-bold text-farm-ink">ISO 9001:2008</p>
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-farm-oliveDeep">
              Certified
            </p>
          </div>
        </div>
      </motion.div>

    </section>
  );
}
