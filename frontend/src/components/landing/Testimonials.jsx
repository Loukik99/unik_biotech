import { useState, useRef, useEffect, useCallback } from "react";
import { motion } from "motion/react";
import { Quote, Leaf, Users, ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

// Re-animate whenever the section re-enters the viewport (scroll down or up).
const VIEWPORT = { once: false, amount: 0.2 };

const sectionVariants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
};

// Header: badge → heading → divider → supporting text, 100ms apart.
const headerContainer = { hidden: {}, show: { transition: { staggerChildren: 0.1 } } };
const headerItem = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

// Cards: left slides from the left, centre fades + scales up, right slides from
// the right — each 100ms after the last.
const cardsContainer = { hidden: {}, show: { transition: { staggerChildren: 0.1 } } };
const cardVariants = {
  hidden: (i) => ({
    opacity: 0,
    x: i === 0 ? -40 : i === 2 ? 40 : 0,
    scale: i === 1 ? 0.95 : 1,
  }),
  show: {
    opacity: 1,
    x: 0,
    scale: 1,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

// Three featured farmer testimonials — reusing the crop-matched portraits that
// already ship in /public/unik. No ratings, stats or badges by design.
const STORIES = [
  {
    name: "Ramesh Patil",
    meta: "Grapes • Nashik",
    image: "/unik/farmer-grapes.png",
    quote:
      "Berry size improved noticeably after switching to AminoRich. My buyers paid premium prices for the second season in a row.",
  },
  {
    name: "Sunil Deshmukh",
    meta: "Cotton • Vidarbha",
    image: "/unik/farmer-cotton.png",
    quote:
      "Rhyzomax helped my crop recover from monsoon stress. Roots were visibly thicker compared to my neighbour's plot.",
  },
  {
    name: "Lakshmi Reddy",
    meta: "Chilli • Guntur",
    image: "/unik/farmer-chilli.png",
    quote:
      "Three applications of Excess and the canopy was unrecognisable. Branch count nearly doubled, and so did harvest.",
  },
];

/** Faint dot-grid motif tucked into a card corner. */
function CornerDots({ className }) {
  return (
    <svg
      className={className}
      width="58"
      height="58"
      viewBox="0 0 58 58"
      fill="none"
      aria-hidden="true"
    >
      {Array.from({ length: 4 }).map((_, r) =>
        Array.from({ length: 4 }).map((_, c) => (
          <circle key={`${r}-${c}`} cx={5 + c * 16} cy={5 + r * 16} r="2" fill="currentColor" />
        ))
      )}
    </svg>
  );
}

function TestimonialCard({ story, active }) {
  return (
    <article
      className={cn(
        "group relative flex h-full flex-col rounded-[22px] border bg-white p-7 transition-[transform,box-shadow,border-color] duration-300 ease-out sm:p-8",
        active
          ? "border-farm-forest/40 shadow-[0_30px_70px_-32px_rgba(24,91,49,0.45)] ring-1 ring-farm-forest/15 hover:-translate-y-2 hover:shadow-[0_42px_86px_-30px_rgba(24,91,49,0.55)] lg:scale-[1.03]"
          : "border-farm-ink/[0.08] shadow-[0_18px_50px_-30px_rgba(27,26,22,0.35)] hover:-translate-y-1.5 hover:shadow-[0_32px_72px_-34px_rgba(27,26,22,0.42)]"
      )}
    >
      {/* Subtle botanical corner motifs — kept very low opacity and inside the
          card bounds so no overflow clipping is needed (clipping a shadowed,
          rounded card while it slides is what caused shadow flicker elsewhere). */}
      <Leaf
        aria-hidden="true"
        strokeWidth={1.25}
        className="pointer-events-none absolute right-5 top-5 h-16 w-16 rotate-12 text-farm-forest/[0.07]"
      />
      <CornerDots className="pointer-events-none absolute bottom-5 right-5 text-farm-forest/10" />

      {/* Large quotation mark, top-left */}
      <Quote
        className="h-10 w-10 shrink-0 fill-farm-forest/15 text-farm-forest transition-transform duration-300 ease-out group-hover:scale-110"
        strokeWidth={1.5}
        aria-hidden="true"
      />

      <p className="relative mt-6 text-[15px] leading-relaxed text-farm-ink/75">
        {story.quote}
      </p>

      {/* Author */}
      <div className="relative mt-auto flex items-center gap-4 border-t border-farm-ink/10 pt-6">
        <img
          src={story.image}
          alt={story.name}
          loading="lazy"
          decoding="async"
          className="h-14 w-14 shrink-0 rounded-full object-cover object-center transition-transform duration-300 ease-out group-hover:scale-110"
        />
        <div className="min-w-0">
          <p className="font-heading text-base font-semibold text-farm-ink">{story.name}</p>
          <p className="mt-0.5 text-[11px] font-semibold uppercase tracking-[0.16em] text-farm-oliveDeep">
            {story.meta}
          </p>
        </div>
      </div>
    </article>
  );
}

export default function Testimonials() {
  // Center card highlighted by default.
  const [active, setActive] = useState(1);
  const trackRef = useRef(null);

  const scrollToIndex = useCallback((index) => {
    const track = trackRef.current;
    if (!track) return;
    const card = track.children[index];
    if (!card) return;
    const left = card.offsetLeft - (track.clientWidth - card.clientWidth) / 2;
    track.scrollTo({ left: Math.max(0, left), behavior: "smooth" });
  }, []);

  const go = useCallback(
    (index) => setActive((index + STORIES.length) % STORIES.length),
    []
  );

  useEffect(() => {
    scrollToIndex(active);
  }, [active, scrollToIndex]);

  // Keep the active dot/highlight in sync when the user swipes manually.
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    let timer;
    const onScroll = () => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        const center = track.scrollLeft + track.clientWidth / 2;
        let nearest = 0;
        let min = Infinity;
        Array.from(track.children).forEach((child, i) => {
          const childCenter = child.offsetLeft + child.clientWidth / 2;
          const dist = Math.abs(childCenter - center);
          if (dist < min) {
            min = dist;
            nearest = i;
          }
        });
        setActive((prev) => (prev === nearest ? prev : nearest));
      }, 120);
    };
    track.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      track.removeEventListener("scroll", onScroll);
      clearTimeout(timer);
    };
  }, []);

  return (
    <section className="relative w-full bg-farm-cream py-24 sm:py-28 lg:py-32">
      <motion.div
        variants={sectionVariants}
        initial="hidden"
        whileInView="show"
        viewport={VIEWPORT}
        className="mx-auto w-full max-w-[1200px] px-5 sm:px-6 lg:px-8"
      >
        {/* Header */}
        <motion.div
          variants={headerContainer}
          initial="hidden"
          whileInView="show"
          viewport={VIEWPORT}
          className="flex flex-col items-center text-center"
        >
          <motion.span
            variants={headerItem}
            className="inline-flex items-center gap-2 rounded-full border border-farm-ink/12 bg-white px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.22em] text-farm-oliveDeep shadow-sm"
          >
            <Users className="h-3.5 w-3.5" aria-hidden="true" />
            People Testimonials
          </motion.span>

          <motion.h2
            variants={headerItem}
            className="mt-6 font-heading text-[2.25rem] font-bold leading-[1.05] tracking-[-0.02em] text-farm-ink sm:text-5xl lg:text-[3.25rem]"
          >
            What Our <span className="text-farm-forest">Farmers</span> Say
          </motion.h2>

          {/* Leaf divider */}
          <motion.div
            variants={headerItem}
            className="mt-5 flex items-center gap-3 text-farm-forest/60"
            aria-hidden="true"
          >
            <span className="h-px w-10 bg-farm-forest/30" />
            <Leaf className="h-4 w-4" strokeWidth={1.75} />
            <span className="h-px w-10 bg-farm-forest/30" />
          </motion.div>

          <motion.p
            variants={headerItem}
            className="mt-5 max-w-xl text-[15px] leading-relaxed text-farm-ink/65 sm:text-base"
          >
            Real experiences from farmers who trust Unik Biotech Research for better yields,
            healthier soil, and stronger crops season after season.
          </motion.p>
        </motion.div>

        {/* Carousel */}
        <div className="relative mt-14 lg:mt-16">
          {/* Prev */}
          <button
            type="button"
            onClick={() => go(active - 1)}
            aria-label="Previous testimonial"
            className="absolute left-0 top-1/2 z-20 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-farm-ink/15 bg-white text-farm-ink shadow-sm transition-[transform,background-color,color,border-color] duration-300 ease-out hover:scale-110 hover:border-farm-forest hover:bg-farm-forest hover:text-white sm:flex lg:-left-4"
          >
            <ChevronLeft className="h-5 w-5" aria-hidden="true" />
          </button>

          {/* Next */}
          <button
            type="button"
            onClick={() => go(active + 1)}
            aria-label="Next testimonial"
            className="absolute right-0 top-1/2 z-20 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-farm-ink/15 bg-white text-farm-ink shadow-sm transition-[transform,background-color,color,border-color] duration-300 ease-out hover:scale-110 hover:border-farm-forest hover:bg-farm-forest hover:text-white sm:flex lg:-right-4"
          >
            <ChevronRight className="h-5 w-5" aria-hidden="true" />
          </button>

          {/* Track — card wrappers stagger their directional entrance */}
          <motion.div
            ref={trackRef}
            variants={cardsContainer}
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT}
            className="flex snap-x snap-mandatory gap-6 overflow-x-auto scroll-smooth px-1 py-8 sm:px-8 lg:px-10 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {STORIES.map((story, index) => (
              <motion.div
                key={story.name}
                custom={index}
                variants={cardVariants}
                className="w-[86%] shrink-0 snap-center sm:w-[46%] lg:w-[31.5%]"
              >
                <TestimonialCard story={story} active={index === active} />
              </motion.div>
            ))}
          </motion.div>

          {/* Pagination dots */}
          <div className="mt-8 flex items-center justify-center gap-2.5">
            {STORIES.map((story, index) => (
              <button
                key={story.name}
                type="button"
                onClick={() => setActive(index)}
                aria-label={`Go to testimonial ${index + 1}`}
                aria-current={index === active}
                className={cn(
                  "h-2.5 rounded-full transition-all duration-300 ease-out",
                  index === active
                    ? "w-7 bg-farm-forest"
                    : "w-2.5 bg-farm-ink/20 hover:bg-farm-ink/35"
                )}
              />
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}
