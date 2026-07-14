import { Link } from "react-router-dom";
import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import FarmImage from "@/components/landing/FarmImage";

const VIEWPORT = { once: true, amount: 0.3 };
const EASE = [0.22, 1, 0.36, 1];

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: EASE, delay },
  }),
};

export default function About() {
  return (
    <section className="relative w-full overflow-hidden bg-farm-cream pb-24 pt-4 sm:pb-28 lg:pb-36">
      <div className="mx-auto max-w-6xl px-5 sm:px-6">
        <div className="grid items-center gap-14 lg:grid-cols-12 lg:gap-16">
          {/* Dominant image — left, editorial wide crop, no people */}
          <div className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={VIEWPORT}
              transition={{ duration: 0.7, ease: EASE }}
              className="relative"
            >
              {/* Muted-beige accent peeking from behind, top-right */}
              <span
                aria-hidden="true"
                className="absolute -right-6 -top-6 -z-10 hidden h-2/3 w-2/3 rounded-[28px] bg-farm-beige/60 lg:block"
              />
              <div className="overflow-hidden rounded-[28px] shadow-[0_24px_60px_-40px_rgba(27,26,22,0.5)]">
                <FarmImage
                  name="aerial-fields"
                  alt="Aerial view of lush Indian paddy fields threaded by a river at sunrise"
                  sizes="(max-width: 1024px) 100vw, 760px"
                  className="block aspect-[4/3] w-full lg:aspect-[16/11]"
                  imgClassName="h-full w-full object-cover"
                  objectPosition="50% 50%"
                />
              </div>
            </motion.div>
          </div>

          {/* Story — right, comfortable reading width */}
          <div className="lg:col-span-5 lg:pl-2">
            <motion.p
              variants={fadeUp}
              custom={0}
              initial="hidden"
              whileInView="show"
              viewport={VIEWPORT}
              className="text-xs font-semibold uppercase tracking-[0.28em] text-farm-oliveDeep"
            >
              About Us
            </motion.p>

            <motion.h2
              variants={fadeUp}
              custom={0.05}
              initial="hidden"
              whileInView="show"
              viewport={VIEWPORT}
              className="mt-6 font-heading text-[2rem] font-semibold leading-[1.08] tracking-[-0.02em] text-farm-ink sm:text-4xl lg:text-[2.75rem]"
            >
              Growing With Farmers <span className="text-farm-forest">Since 2005</span>
            </motion.h2>

            <motion.p
              variants={fadeUp}
              custom={0.15}
              initial="hidden"
              whileInView="show"
              viewport={VIEWPORT}
              className="mt-7 max-w-md text-[15px] leading-relaxed text-farm-ink/70 sm:text-base"
            >
              Founded in 2005 in Pimpalgaon Baswant, Nashik, the heart of Maharashtra&rsquo;s grape
              and pomegranate belt, UNIK BIOTECH RESEARCH began with a simple mission: to serve
              farmers with quality inputs they can trust.
            </motion.p>

            <motion.p
              variants={fadeUp}
              custom={0.22}
              initial="hidden"
              whileInView="show"
              viewport={VIEWPORT}
              className="mt-4 max-w-md text-[15px] leading-relaxed text-farm-ink/70 sm:text-base"
            >
              Over two decades, we have grown from a small local manufacturer into an ISO-certified
              company with more than 100 products, proudly serving over 10,000 farmers across India
              through research-driven agricultural solutions.
            </motion.p>

            <motion.div
              variants={fadeUp}
              custom={0.3}
              initial="hidden"
              whileInView="show"
              viewport={VIEWPORT}
              className="mt-9"
            >
              <Link
                to="/about"
                className="group inline-flex items-center gap-2 rounded-full bg-farm-forest px-6 py-3.5 text-[14px] font-semibold text-farm-cream transition-all duration-300 hover:-translate-y-0.5 hover:bg-farm-forestDeep"
              >
                Know More About Our Milestones
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
