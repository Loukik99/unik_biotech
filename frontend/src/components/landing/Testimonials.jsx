import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ChevronDown, ChevronUp, Quote } from "lucide-react";

const EASE = [0.22, 1, 0.36, 1];
const AUTOPLAY_MS = 5000;
const WHEAT = "/unik/wheat-golden";

// Editorial testimonials — real Unik customers, matched to their portrait
// assets in /public/unik. Copy can be swapped without touching the layout.
const TESTIMONIALS = [
  {
    quote:
      "Since we switched to Unik's amino and seaweed range, our grape bunches are far more uniform and the berry size is noticeably better. The field team's guidance has been just as valuable as the products themselves.",
    name: "Ramesh Patil",
    role: "Grape Grower • Nashik",
    avatar: "/unik/farmer-grapes.png",
  },
  {
    quote:
      "After a stressful monsoon I was worried about my cotton, but Rhyzomax helped the crop bounce back. The roots were visibly thicker and the boll setting was far better than the neighbouring plots.",
    name: "Sunil Deshmukh",
    role: "Cotton Farmer • Vidarbha",
    avatar: "/unik/farmer-cotton.png",
  },
  {
    quote:
      "Three sprays through the season and my chilli canopy filled out completely. Branch count nearly doubled and the marketable yield gave me the best returns I have had in years.",
    name: "Lakshmi Reddy",
    role: "Chilli Farmer • Guntur",
    avatar: "/unik/farmer-chilli.png",
  },
  {
    quote:
      "What I value most is consistency. Every season the products perform the same, and the advice on dosage and timing means I never waste input. My soil feels healthier too.",
    name: "Ganesh Jadhav",
    role: "Wheat Farmer • Nashik",
    avatar: "/unik/mustard-farmer-1024.jpg",
  },
];

const N = TESTIMONIALS.length;

const quoteVariants = {
  enter: (dir) => ({ opacity: 0, y: dir >= 0 ? 28 : -28 }),
  center: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } },
  exit: (dir) => ({ opacity: 0, y: dir >= 0 ? -28 : 28, transition: { duration: 0.35, ease: EASE } }),
};

/** Circular outlined navigation button (up / down). */
function NavButton({ direction, onClick }) {
  const Icon = direction === "up" ? ChevronUp : ChevronDown;
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={direction === "up" ? "Previous testimonial" : "Next testimonial"}
      className="flex h-12 w-12 items-center justify-center rounded-full border border-farm-ink/20 text-farm-ink/70 transition-all duration-300 ease-out hover:-translate-y-0.5 hover:border-farm-forest hover:bg-farm-forest hover:text-farm-cream motion-reduce:transform-none"
    >
      <Icon className="h-5 w-5" strokeWidth={1.75} aria-hidden="true" />
    </button>
  );
}

export default function Testimonials() {
  const [[index, dir], setState] = useState([0, 0]);

  const go = useCallback((step) => {
    setState(([i]) => [(i + step + N) % N, step]);
  }, []);

  useEffect(() => {
    const id = setInterval(() => setState(([i]) => [(i + 1) % N, 1]), AUTOPLAY_MS);
    return () => clearInterval(id);
    // Restart the timer whenever the active slide changes (incl. manual nav)
  }, [index]);

  const active = TESTIMONIALS[index];
  const prev = TESTIMONIALS[(index - 1 + N) % N];
  const next = TESTIMONIALS[(index + 1) % N];

  return (
    <section className="relative w-full overflow-hidden bg-white py-24 sm:py-28 lg:py-32">
      <div className="mx-auto w-full max-w-[1280px] px-5 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-12 lg:items-center lg:gap-6">
          {/* LEFT — testimonial content (~45%) */}
          <div className="order-1 lg:col-span-5">
            <span className="inline-flex items-center rounded-full border border-farm-ink/15 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.24em] text-farm-oliveDeep">
              People Testimonials
            </span>

            <div className="relative mt-8 min-h-[280px] sm:min-h-[260px]">
              <Quote
                className="absolute -left-1 -top-2 h-9 w-9 text-farm-forest/10"
                aria-hidden="true"
              />
              <AnimatePresence mode="wait" custom={dir} initial={false}>
                <motion.div
                  key={index}
                  custom={dir}
                  variants={quoteVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                >
                  <blockquote className="relative font-heading text-[1.5rem] font-medium leading-[1.4] tracking-[-0.01em] text-farm-ink sm:text-[1.75rem] lg:text-[2rem] lg:leading-[1.35]">
                    {active.quote}
                  </blockquote>

                  <div className="mt-8 flex items-center gap-4">
                    <img
                      src={active.avatar}
                      alt={active.name}
                      loading="lazy"
                      decoding="async"
                      className="h-14 w-14 rounded-full object-cover"
                    />
                    <div>
                      <p className="font-heading text-base font-semibold text-farm-ink">
                        {active.name}
                      </p>
                      <p className="mt-0.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-farm-oliveDeep">
                        {active.role}
                      </p>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Previous / next preview — light gray, clickable */}
            <div className="mt-10 space-y-3 border-t border-farm-ink/10 pt-6">
              <button
                type="button"
                onClick={() => go(-1)}
                className="group block text-left"
              >
                <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-farm-ink/30">
                  Previous
                </span>
                <span className="mt-0.5 block text-sm text-farm-ink/40 transition-colors duration-300 group-hover:text-farm-ink/70">
                  {prev.name} — {prev.role}
                </span>
              </button>
              <button
                type="button"
                onClick={() => go(1)}
                className="group block text-left"
              >
                <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-farm-ink/30">
                  Next
                </span>
                <span className="mt-0.5 block text-sm text-farm-ink/40 transition-colors duration-300 group-hover:text-farm-ink/70">
                  {next.name} — {next.role}
                </span>
              </button>
            </div>
          </div>

          {/* CENTER — up / down navigation */}
          <div className="order-2 flex flex-row items-center justify-center gap-4 lg:col-span-1 lg:flex-col">
            <NavButton direction="up" onClick={() => go(-1)} />
            <NavButton direction="down" onClick={() => go(1)} />
          </div>

          {/* RIGHT — decorative wheat image (~55%), bleeds to the bottom-right */}
          <div className="order-3 lg:col-span-6">
            <img
              src={`${WHEAT}-1600.webp`}
              srcSet={`${WHEAT}-1024.webp 1024w, ${WHEAT}-1600.webp 1600w, ${WHEAT}-2000.webp 2000w, ${WHEAT}-2560.webp 2560w`}
              sizes="(min-width: 1024px) 55vw, 100vw"
              alt=""
              aria-hidden="true"
              className="h-[320px] w-full rounded-[28px] object-cover object-bottom sm:h-[440px] lg:h-[580px] lg:rounded-[36px] lg:-mr-6 xl:-mr-16"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
