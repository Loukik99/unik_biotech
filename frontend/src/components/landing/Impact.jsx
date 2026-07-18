import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import FarmImage from "@/components/landing/FarmImage";

const VIEWPORT = { once: true, amount: 0.3 };
const EASE = [0.22, 1, 0.36, 1];

// Each statistic is placed at a different spot on the image (no cards) to read
// as an editorial composition, echoing the reference's scattered numbers.
const STATS = [
  { value: "20", suffix: "+", label: "Years of Trust", place: "lg:col-start-1 lg:row-start-1" },
  { value: "ISO", suffix: "", label: "9001:2008 Certified", place: "lg:col-start-4 lg:row-start-1 lg:mt-24" },
  { value: "10,000", suffix: "+", label: "Farmers", place: "lg:col-start-7 lg:row-start-1 lg:mt-6" },
  { value: "100", suffix: "+", label: "Products", place: "lg:col-start-10 lg:row-start-1 lg:mt-44" },
];

const fadeUp = {
  hidden: { opacity: 0, y: 22 },
  show: (delay = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE, delay } }),
};

const statVariants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
};

export default function Impact() {
  const ref = useRef(null);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) return undefined;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => setReduced(mq.matches);
    apply();
    mq.addEventListener?.("change", apply);
    return () => mq.removeEventListener?.("change", apply);
  }, []);

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const yRaw = useTransform(scrollYProgress, [0, 1], ["-6%", "6%"]);
  const y = reduced ? 0 : yRaw;

  return (
    <section ref={ref} className="relative w-full overflow-hidden bg-farm-forestDeep">
      {/* Full-bleed photography with a gentle parallax drift */}
      <motion.div style={{ y }} className="absolute inset-x-0 -top-[7%] h-[114%]" aria-hidden="true">
        <FarmImage
          name="mustard-field"
          alt=""
          sizes="100vw"
          fallbackWidth={2000}
          className="h-full w-full"
          imgClassName="h-full w-full object-cover"
          objectPosition="50% 55%"
        />
      </motion.div>

      {/* Dark green overlay (~52%) for readability */}
      <div className="absolute inset-0 bg-[#122019]/55" aria-hidden="true" />
      <div
        className="absolute inset-0 bg-gradient-to-t from-[#0b1510]/75 via-transparent to-[#0b1510]/20"
        aria-hidden="true"
      />

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-6xl px-5 py-24 sm:px-6 sm:py-28 lg:py-36">
        {/* Scattered statistics */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={VIEWPORT}
          variants={{ show: { transition: { staggerChildren: 0.15 } } }}
          className="grid grid-cols-1 gap-y-12 sm:grid-cols-2 sm:gap-x-10 lg:grid-cols-12 lg:gap-y-0"
        >
          {STATS.map((s) => (
            <motion.div key={s.label} variants={statVariants} className={`lg:col-span-3 ${s.place}`}>
              <p className="font-heading font-semibold leading-none tracking-tight text-[#E6C15A]">
                <span className="text-5xl sm:text-6xl lg:text-[5rem]">{s.value}</span>
                {s.suffix && <span className="text-3xl sm:text-4xl lg:text-5xl">{s.suffix}</span>}
              </p>
              <p className="mt-3 text-sm font-medium text-white/80 lg:text-base">{s.label}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom content — left aligned */}
        <div className="mt-24 max-w-2xl lg:mt-36">
          <motion.p
            variants={fadeUp}
            custom={0}
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT}
            className="text-xs font-semibold uppercase tracking-[0.28em] text-[#E6C15A]"
          >
            Our Impact
          </motion.p>
          <motion.h2
            variants={fadeUp}
            custom={0.1}
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT}
            className="mt-5 font-heading text-[2rem] font-semibold leading-[1.08] tracking-[-0.02em] text-farm-cream sm:text-4xl lg:text-[2.9rem]"
          >
            Trusted by Farmers for Over Two Decades
          </motion.h2>
          <motion.p
            variants={fadeUp}
            custom={0.2}
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT}
            className="mt-6 max-w-xl text-[15px] leading-relaxed text-white/75 sm:text-base"
          >
            For more than 20 years, Unik Biotech Research has delivered trusted agricultural
            solutions to over 10,000 farmers with an ISO-certified manufacturing process and a
            portfolio of more than 100 high-quality products.
          </motion.p>
        </div>
      </div>
    </section>
  );
}
