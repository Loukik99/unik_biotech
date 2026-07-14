import { motion } from "motion/react";
import FarmImage from "@/components/landing/FarmImage";

const VIEWPORT = { once: true, amount: 0.35 };

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1], delay },
  }),
};

export default function Mission() {
  return (
    <section className="relative w-full overflow-hidden bg-farm-cream py-24 sm:py-28 lg:py-36">
      <div className="mx-auto max-w-6xl px-5 sm:px-6">
        <div className="grid items-center gap-14 lg:grid-cols-12 lg:gap-10">
          {/* Text — comfortable reading width, offset to the left */}
          <div className="lg:col-span-5 lg:pr-6">
            <motion.p
              variants={fadeUp}
              custom={0}
              initial="hidden"
              whileInView="show"
              viewport={VIEWPORT}
              className="text-xs font-semibold uppercase tracking-[0.28em] text-farm-oliveDeep"
            >
              Our Mission
            </motion.p>

            <motion.h2
              variants={fadeUp}
              custom={0.08}
              initial="hidden"
              whileInView="show"
              viewport={VIEWPORT}
              className="mt-6 font-heading text-[2rem] font-semibold leading-[1.08] tracking-[-0.02em] text-farm-ink sm:text-4xl lg:text-[2.9rem]"
            >
              Empowering <span className="text-farm-forest">Indian Agriculture</span> Through Innovation
            </motion.h2>

            <motion.p
              variants={fadeUp}
              custom={0.15}
              initial="hidden"
              whileInView="show"
              viewport={VIEWPORT}
              className="mt-7 max-w-md text-[15px] leading-relaxed text-farm-ink/70 sm:text-base"
            >
              At Unik Biotechnology Research, we combine science, sustainable farming practices,
              and innovative agricultural solutions to help farmers improve soil health, increase
              crop productivity, and build a more sustainable future for agriculture.
            </motion.p>
          </div>

          {/* Image composition — intentionally placed, offset, with a muted-beige accent */}
          <div className="lg:col-span-6 lg:col-start-7">
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={VIEWPORT}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="relative"
            >
              {/* Muted-beige block peeking from behind — an editorial accent, not a card */}
              <span
                aria-hidden="true"
                className="absolute -bottom-6 -left-6 -z-10 hidden h-2/3 w-2/3 rounded-[26px] bg-farm-beige/60 lg:block"
              />
              <div className="overflow-hidden rounded-[26px]">
                <FarmImage
                  name="tea-plucking"
                  alt="An Indian farmer carefully hand-plucking fresh tea leaves in the field"
                  sizes="(max-width: 1024px) 100vw, 640px"
                  className="block aspect-[4/5] w-full sm:aspect-[3/2] lg:aspect-[4/5]"
                  imgClassName="h-full w-full object-cover"
                  objectPosition="35% 50%"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
