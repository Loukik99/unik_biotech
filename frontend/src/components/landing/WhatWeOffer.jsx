import { Link } from "react-router-dom";
import { motion } from "motion/react";
import { ArrowRight, ArrowUpRight } from "lucide-react";

const VIEWPORT = { once: true, amount: 0.2 };
const EASE = [0.22, 1, 0.36, 1];

// Flagship products — real packaging artwork from /public/products.
// Presented as equal-size cards, matching the reference composition.
const PRODUCTS = [
  {
    no: "01",
    name: "Aminorich",
    line: "80% amino acids, 18 types for every growth stage",
    category: "Amino Acids & Biostimulants",
    image: "/products/aminorich.png",
  },
  {
    no: "02",
    name: "Excess",
    line: "High-power biostimulant with 12 active types",
    category: "Amino Acids & Biostimulants",
    image: "/products/excess.png",
  },
  {
    no: "03",
    name: "Unisearich",
    line: "Pure Ascophyllum seaweed extract",
    category: "Biostimulant",
    image: "/products/unisearich.png",
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: (delay = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE, delay } }),
};

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
};

export default function WhatWeOffer() {
  return (
    <section className="relative w-full overflow-hidden bg-farm-cream py-24 sm:py-28 lg:py-32">
      <div className="mx-auto max-w-6xl px-5 sm:px-6">
        {/* Header — heading left, description right (editorial) */}
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <div>
            <motion.p
              variants={fadeUp}
              custom={0}
              initial="hidden"
              whileInView="show"
              viewport={VIEWPORT}
              className="text-xs font-semibold uppercase tracking-[0.28em] text-farm-oliveDeep"
            >
              Our Products
            </motion.p>
            <motion.h2
              variants={fadeUp}
              custom={0.08}
              initial="hidden"
              whileInView="show"
              viewport={VIEWPORT}
              className="mt-5 font-heading text-[2.1rem] font-semibold leading-[1.05] tracking-[-0.02em] text-farm-ink sm:text-5xl lg:text-[3.25rem]"
            >
              What We <span className="text-farm-forest">Offer</span>
            </motion.h2>
          </div>
          <motion.p
            variants={fadeUp}
            custom={0.15}
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT}
            className="max-w-sm text-[15px] leading-relaxed text-farm-ink/65"
          >
            Explore a selection of our trusted agricultural solutions developed to improve crop
            health, enhance productivity, and support sustainable farming practices.
          </motion.p>
        </div>

        {/* Products — three equal-size editorial cards */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={VIEWPORT}
          variants={{ show: { transition: { staggerChildren: 0.15, delayChildren: 0.1 } } }}
          className="mt-16 grid grid-cols-1 items-stretch gap-6 sm:grid-cols-2 lg:mt-20 lg:grid-cols-3 lg:gap-8"
        >
          {PRODUCTS.map((p) => (
            <motion.div key={p.name} variants={cardVariants}>
              <Link
                to="/products"
                className="group flex h-full flex-col rounded-[24px] border border-farm-ink/[0.07] bg-farm-beige/35 p-6 transition-shadow duration-300 hover:shadow-[0_26px_60px_-40px_rgba(27,26,22,0.55)] sm:p-7"
              >
                <div className="flex items-center justify-between">
                  <span className="font-heading text-sm font-semibold text-farm-ink/40">{p.no}</span>
                  <span className="flex h-9 w-9 items-center justify-center rounded-full border border-farm-ink/15 text-farm-forest transition-all duration-300 group-hover:border-farm-forest group-hover:bg-farm-forest group-hover:text-farm-cream">
                    <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </span>
                </div>

                <h3 className="mt-6 font-heading text-xl font-semibold text-farm-ink transition-colors duration-300 group-hover:text-farm-forest">
                  {p.name}
                </h3>
                <p className="mt-2 text-[14px] leading-snug text-farm-ink/60">{p.line}</p>

                {/* Image fills the lower area — product packaging dominates, undistorted */}
                <div className="relative mt-8 aspect-[4/3] w-full flex-1">
                  <img
                    src={p.image}
                    alt={`${p.name} — ${p.category}`}
                    loading="lazy"
                    decoding="async"
                    draggable="false"
                    className="absolute inset-0 h-full w-full object-contain transition-transform duration-300 ease-out group-hover:scale-105"
                  />
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          variants={fadeUp}
          custom={0}
          initial="hidden"
          whileInView="show"
          viewport={VIEWPORT}
          className="mt-16 flex justify-center lg:mt-20"
        >
          <Link
            to="/products"
            className="group inline-flex items-center gap-2 rounded-full bg-farm-forest px-7 py-3.5 text-[14px] font-semibold text-farm-cream transition-all duration-300 hover:-translate-y-0.5 hover:bg-farm-forestDeep"
          >
            Explore More Products
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
