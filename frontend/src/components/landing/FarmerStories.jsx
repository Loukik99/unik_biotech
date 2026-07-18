import { useState } from "react";
import { motion } from "motion/react";
import { Star } from "lucide-react";

const EASE = [0.22, 1, 0.36, 1];
const VIEWPORT = { once: true, amount: 0.2 };

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: (delay = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE, delay } }),
};

// Placeholder photography — local crop-matched farmer portraits (each farmer
// holding their crop) with a shared local fallback. Swap `image` for
// client-approved photos later without touching the layout.
const STORIES = [
  {
    name: "Ramesh Patil",
    meta: "Grapes • Nashik",
    badgeValue: "+28%",
    badgeLabel: "Yield",
    image: "/unik/farmer-grapes.png",
    fallback: "/unik/mustard-farmer-1024.jpg",
    quote:
      "Berry size improved noticeably after switching to AminoRich. My buyers paid premium prices for the second season in a row.",
    objectPos: "object-center",
  },
  {
    name: "Sunil Deshmukh",
    meta: "Cotton • Vidarbha",
    badgeValue: "+34%",
    badgeLabel: "Boll Count",
    image: "/unik/farmer-cotton.png",
    fallback: "/unik/mustard-farmer-1024.jpg",
    quote:
      "Rhyzomax helped my crop recover from monsoon stress. Roots were visibly thicker compared to my neighbour's plot.",
    objectPos: "object-center",
  },
  {
    name: "Lakshmi Reddy",
    meta: "Chilli • Guntur",
    badgeValue: "+22%",
    badgeLabel: "Marketable Yield",
    image: "/unik/farmer-chilli.png",
    fallback: "/unik/mustard-farmer-1024.jpg",
    quote:
      "Three applications of Excess and the canopy was unrecognisable. Branch count nearly doubled, and so did harvest.",
    objectPos: "object-center",
  },
];

function StoryImage({ src, fallback, objectPos }) {
  const [current, setCurrent] = useState(src);
  return (
    <img
      src={current}
      alt=""
      loading="lazy"
      decoding="async"
      onError={() => current !== fallback && setCurrent(fallback)}
      className={`h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105 motion-reduce:transform-none motion-reduce:transition-none ${objectPos}`}
    />
  );
}

export default function FarmerStories() {
  return (
    <section className="w-full bg-white py-24 sm:py-28 lg:py-32">
      <div className="mx-auto w-full max-w-[1320px] px-5 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="grid gap-6 lg:grid-cols-12 lg:items-end">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT}
            className="lg:col-span-8"
          >
            <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.24em] text-[#7d8b3a]">
              <Star className="h-3.5 w-3.5 fill-current" strokeWidth={0} aria-hidden="true" />
              Farmer Stories
            </span>
            <h2 className="mt-5 max-w-[16ch] font-heading text-4xl font-bold leading-[1.04] tracking-tight text-brand-ink sm:text-5xl lg:text-[3.5rem]">
              Real fields. Real numbers. Real farmers.
            </h2>
          </motion.div>

          <motion.p
            variants={fadeUp}
            custom={0.1}
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT}
            className="text-sm leading-relaxed text-brand-muted sm:text-base lg:col-span-4 lg:text-right"
          >
            Aggregate data from <span className="font-semibold text-brand-ink">1,200+</span> field
            trials across India.
          </motion.p>
        </div>

        {/* Cards */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={VIEWPORT}
          variants={{ show: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } } }}
          className="mt-14 grid gap-7 sm:grid-cols-2 lg:mt-16 lg:grid-cols-3 lg:gap-8"
        >
          {STORIES.map((s) => (
            <motion.article
              key={s.name}
              variants={fadeUp}
              className="group flex h-full flex-col overflow-hidden rounded-[24px] border border-black/[0.06] bg-white shadow-[0_18px_50px_-24px_rgba(16,20,24,0.25)] transition-all duration-350 ease-out hover:-translate-y-2 hover:shadow-[0_36px_80px_-28px_rgba(16,20,24,0.35)] motion-reduce:transform-none motion-reduce:transition-none"
            >
              {/* Image (~65% of card) */}
              <div className="relative h-[300px] overflow-hidden sm:h-[320px]">
                <StoryImage src={s.image} fallback={s.fallback} objectPos={s.objectPos} />

                {/* Legibility scrim */}
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/65 via-black/5 to-transparent"
                />

                {/* Result badge */}
                <div className="absolute right-4 top-4 rounded-2xl bg-white px-4 py-2.5 text-center shadow-[0_12px_30px_-10px_rgba(0,0,0,0.35)] transition-transform duration-350 ease-out group-hover:scale-105 motion-reduce:transform-none">
                  <p className="font-heading text-xl font-extrabold leading-none tracking-tight text-brand-green">
                    {s.badgeValue}
                  </p>
                  <p className="mt-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-brand-muted">
                    {s.badgeLabel}
                  </p>
                </div>

                {/* Name overlay */}
                <div className="absolute bottom-4 left-4 right-4">
                  <p className="font-heading text-lg font-bold leading-tight text-white drop-shadow-sm">
                    {s.name}
                  </p>
                  <p className="mt-0.5 text-xs font-medium text-white/80">{s.meta}</p>
                </div>
              </div>

              {/* Review panel */}
              <div className="flex flex-1 flex-col p-6">
                <div className="flex items-center gap-1 text-[#F5A623]">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-current" strokeWidth={0} aria-hidden="true" />
                  ))}
                </div>
                <p className="mt-4 text-[15px] leading-relaxed text-brand-muted">
                  &ldquo;{s.quote}&rdquo;
                </p>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
