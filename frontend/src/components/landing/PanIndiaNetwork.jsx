import { Link } from "react-router-dom";
import { motion } from "motion/react";
import { ArrowRight, Handshake, MapPin, ShieldCheck, Sprout, UsersRound } from "lucide-react";

const VIEWPORT = { once: true, amount: 0.25 };
const EASE = [0.22, 1, 0.36, 1];

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: EASE, delay },
  }),
};

const features = [
  {
    icon: Handshake,
    title: "Wide Reach",
    text: "Expanding access to trusted agricultural inputs across key farming regions.",
  },
  {
    icon: UsersRound,
    title: "Trusted Partnerships",
    text: "Building lasting relationships with dealers who understand local farmers.",
  },
  {
    icon: ShieldCheck,
    title: "Reliable Support",
    text: "On-ground assistance and timely guidance through every season.",
  },
  {
    icon: Sprout,
    title: "Growth Together",
    text: "Helping communities grow with quality products and dependable service.",
  },
];

function FeatureItem({ feature, isLast }) {
  const Icon = feature.icon;

  return (
    <div className={isLast ? "flex flex-col gap-5 py-5" : "flex gap-5 border-b border-farm-ink/10 py-5"}>
      <div className="flex gap-5">
        <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-farm-forest/10 text-farm-forest sm:h-14 sm:w-14">
          <Icon className="h-5 w-5" strokeWidth={1.8} aria-hidden="true" />
        </span>
        <div className="min-w-0 pt-0.5">
          <h3 className="font-heading text-base font-semibold text-farm-forest">
            {feature.title}
          </h3>
          <p className="mt-1.5 max-w-sm text-[14px] leading-relaxed text-farm-ink/65">
            {feature.text}
          </p>
        </div>
      </div>
      {isLast && (
        <Link
          to="/dealer-locator"
          className="group inline-flex items-center gap-2 rounded-full bg-farm-forest px-5 py-3 text-[13px] font-semibold text-farm-cream transition-all duration-300 hover:-translate-y-0.5 hover:bg-farm-forestDeep"
        >
          Become a Dealer
          <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
        </Link>
      )}
    </div>
  );
}

function IndiaMap() {
  return (
    <img
      src="/india-network-map.svg"
      alt="India distribution network map"
      className="relative z-10 h-auto w-full max-w-[520px] sm:max-w-[560px]"
      draggable="false"
    />
  );
}

export default function PanIndiaNetwork() {
  return (
    <section className="relative w-full overflow-hidden bg-white py-24 sm:py-28 lg:py-32">
      <div className="mx-auto max-w-6xl px-5 sm:px-6">
        <div className="grid gap-14 lg:grid-cols-12 lg:items-center lg:gap-10">
          <motion.div
            variants={fadeUp}
            custom={0}
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT}
            className="lg:col-span-5 lg:pr-6"
          >
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-farm-oliveDeep">
              Pan India Network
            </p>

            <h2 className="mt-6 font-heading text-[2.25rem] font-semibold leading-[1.05] tracking-[-0.02em] text-farm-ink sm:text-5xl lg:text-[3.25rem]">
              Strong Network.
              <br />
              <span className="text-farm-forest">Stronger Together.</span>
            </h2>

            <p className="mt-7 max-w-md text-[15px] leading-relaxed text-farm-ink/70 sm:text-base">
              Unik Biotech is building a trusted nationwide dealer network that connects
              quality agricultural solutions with farmers through dependable local support.
            </p>

            <div className="mt-9 max-w-md">
              {features.map((feature, index) => (
                <FeatureItem
                  key={feature.title}
                  feature={feature}
                  isLast={index === features.length - 1}
                />
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={VIEWPORT}
            transition={{ duration: 0.7, ease: EASE }}
            className="lg:col-span-7"
          >
            <div className="relative mx-auto max-w-[680px]">
              <span
                aria-hidden="true"
                className="absolute left-1/2 top-1/2 h-[72%] w-[72%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-farm-forest/10 blur-3xl"
              />
              {[92, 78, 64, 50].map((size) => (
                <span
                  key={size}
                  aria-hidden="true"
                  className="absolute left-1/2 top-1/2 aspect-square -translate-x-1/2 -translate-y-1/2 rounded-full border border-farm-forest/[0.06]"
                  style={{ width: `${size}%` }}
                />
              ))}

              <div className="relative flex justify-center px-2 sm:px-6 lg:px-0">
                <IndiaMap />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
