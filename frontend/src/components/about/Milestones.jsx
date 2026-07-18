import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { Sprout, Landmark, Users, Award, ShieldCheck, Leaf } from "lucide-react";
import { cn } from "@/lib/utils";
import { useLang } from "@/context/LanguageContext";

// Milestone content — recreated 1:1 from the reference, alternating left/right.
const MILESTONES = [
  {
    icon: Sprout,
    year: "2005",
    title: "Founded",
    desc: "Unik Biotech Research was established in Pimpalgaon Baswant, Nashik with a vision to serve farmers.",
  },
  {
    icon: Landmark,
    year: "2008",
    title: "Built a Strong Foundation",
    desc: "Strengthened manufacturing of quality agri inputs and built trust at the grassroots level.",
  },
  {
    icon: Users,
    year: "2012",
    title: "Growing Stronger",
    desc: "Expanded our product range and strengthened distribution across Maharashtra.",
  },
  {
    icon: Award,
    year: "2017",
    title: "Trusted by Thousands",
    desc: "Reached thousands of farmers and became a dependable agri partner.",
  },
  {
    icon: ShieldCheck,
    year: "2020",
    title: "ISO Certified",
    desc: "Achieved ISO 9001:2008 certification for our quality management systems and processes.",
  },
  {
    icon: Leaf,
    year: "2025+",
    title: "Transforming the Future",
    desc: "Continuing to innovate with sustainable, effective and farmer-first solutions for a better tomorrow.",
  },
];

// Card reveal: alternating slide + de-blur + settle. Plays once.
const cardVariants = {
  hidden: (dir) => ({ opacity: 0, x: 60 * dir, filter: "blur(8px)", scale: 0.97 }),
  show: {
    opacity: 1,
    x: 0,
    filter: "blur(0px)",
    scale: 1,
    transition: { duration: 0.8, ease: "easeOut", when: "beforeChildren", staggerChildren: 0.1 },
  },
};

const yearVariants = {
  hidden: { scale: 0.9, color: "#9CA3AF" },
  show: { scale: [0.9, 1.08, 1], color: "#1F7A3D", transition: { duration: 0.6, ease: "easeOut" } },
};

const iconVariants = {
  hidden: { rotate: 8, scale: 0.85 },
  show: { rotate: 0, scale: 1, transition: { duration: 0.6, ease: "easeOut" } },
};

function MilestoneCard({ item, dir }) {
  const Icon = item.icon;
  return (
    <motion.div
      custom={dir}
      variants={cardVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.4 }}
    >
      <div className="group relative flex items-start gap-5 overflow-hidden rounded-[26px] border border-black/[0.06] bg-white p-6 shadow-soft transition-[transform,box-shadow] duration-300 ease-out hover:-translate-y-2 hover:shadow-glass sm:p-7">
        {/* Left accent rail — brightens on hover */}
        <span
          aria-hidden="true"
          className="absolute inset-y-5 left-0 w-1 rounded-full bg-brand-green/30 transition-colors duration-300 group-hover:bg-brand-green"
        />
        {/* Icon circle — lifts on hover */}
        <div className="shrink-0 transition-transform duration-300 group-hover:-translate-y-1">
          <motion.span
            variants={iconVariants}
            className="flex h-16 w-16 items-center justify-center rounded-full bg-brand-green/10 text-brand-green transition-shadow duration-300 group-hover:shadow-[0_10px_28px_-8px_rgba(31,122,61,0.55)]"
          >
            <Icon className="h-7 w-7" strokeWidth={1.75} />
          </motion.span>
        </div>
        {/* Text */}
        <div className="min-w-0">
          <motion.div
            variants={yearVariants}
            className="font-heading text-2xl font-extrabold leading-none transition-[filter] duration-300 group-hover:brightness-90"
          >
            {item.year}
          </motion.div>
          <h4 className="mt-1.5 font-heading text-lg font-bold text-brand-ink">{item.title}</h4>
          <p className="mt-2 text-sm leading-relaxed text-brand-muted">{item.desc}</p>
        </div>
      </div>
    </motion.div>
  );
}

function TimelineNode({ progress, fraction, className }) {
  // The node "fills" as the growing line reaches its position on the timeline.
  const range = [fraction - 0.05, fraction];
  const nodeScale = useTransform(progress, range, [0.85, 1]);
  const ringOpacity = useTransform(progress, range, [0, 0.55]);
  const ringScale = useTransform(progress, range, [0.6, 1.5]);
  const innerScale = useTransform(progress, range, [0, 1]);
  const innerOpacity = useTransform(progress, range, [0, 1]);

  return (
    <motion.span
      style={{ scale: nodeScale }}
      className={cn("z-10 flex h-8 w-8 items-center justify-center", className)}
    >
      {/* Inner wrapper is the positioning context for the glow so it stays
          anchored whether the node is absolute (mobile) or static (desktop). */}
      <span className="relative flex h-8 w-8 items-center justify-center">
        {/* Outer glow ring */}
        <motion.span
          aria-hidden="true"
          style={{ opacity: ringOpacity, scale: ringScale }}
          className="absolute inset-0 rounded-full bg-brand-greenAccent blur-[5px]"
        />
        {/* White circle */}
        <span className="relative flex h-8 w-8 items-center justify-center rounded-full border-2 border-[#DCE9DC] bg-white shadow-sm">
          {/* Green circle fills in */}
          <motion.span
            style={{ scale: innerScale, opacity: innerOpacity }}
            className="flex h-[1.15rem] w-[1.15rem] items-center justify-center rounded-full bg-brand-greenAccent shadow-[0_0_10px_rgba(93,187,99,0.7)]"
          >
            {/* Darker green center */}
            <span className="h-2 w-2 rounded-full bg-brand-greenDark" />
          </motion.span>
        </span>
      </span>
    </motion.span>
  );
}

export default function Milestones() {
  const { t, lang } = useLang();
  const mr = lang === "mr" ? "font-marathi" : "";
  const timelineRef = useRef(null);

  // Line height + node activation are driven purely by scroll progress (no
  // scroll listeners) so the timeline behaves like a progress indicator.
  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ["start 80%", "end 55%"],
  });
  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  const title = t("about", "journeyTitle");
  const words = title.split(" ");
  const lastWord = words.length > 1 ? words[words.length - 1] : "";
  const leadWords = words.length > 1 ? words.slice(0, -1).join(" ") : title;

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-white to-[#fcfdfa] px-4 py-24">
      {/* Faint decorative foliage, top-right */}
      <Leaf
        aria-hidden="true"
        className="pointer-events-none absolute -right-6 top-8 h-48 w-48 rotate-12 text-brand-green/[0.05]"
        strokeWidth={0.8}
      />

      <div className="mx-auto max-w-5xl">
        {/* Heading */}
        <div className="mb-16 text-center">
          <div className="mb-4 flex items-center justify-center gap-2">
            <Leaf className="h-3.5 w-3.5 -scale-x-100 text-brand-green" aria-hidden="true" />
            <span className={cn("text-xs font-bold uppercase tracking-[0.22em] text-brand-green", mr)}>
              {t("about", "legacyLabel")}
            </span>
            <Leaf className="h-3.5 w-3.5 text-brand-green" aria-hidden="true" />
          </div>
          <h2 className={cn("font-heading text-4xl font-extrabold tracking-tight text-brand-ink md:text-5xl", mr)}>
            {leadWords} {lastWord && <span className="text-brand-green">{lastWord}</span>}
          </h2>
          <p className={cn("mx-auto mt-5 max-w-xl text-base leading-relaxed text-brand-muted", mr)}>
            {t("about", "journeySub")}
          </p>
        </div>

        {/* Timeline */}
        <div ref={timelineRef} className="relative">
          {/* Inactive background line */}
          <span
            aria-hidden="true"
            className="absolute left-8 top-0 bottom-0 w-[3px] -translate-x-1/2 rounded-full bg-[#DCE9DC] md:left-1/2"
          />
          {/* Foreground animated green line */}
          <motion.span
            aria-hidden="true"
            style={{ height: lineHeight }}
            className="absolute left-8 top-0 w-[3px] -translate-x-1/2 rounded-full bg-gradient-to-b from-brand-greenAccent via-brand-green to-brand-green shadow-[0_0_14px_rgba(93,187,99,0.55)] md:left-1/2"
          />
          {/* Glowing leading tip that tracks the growing line */}
          <motion.span
            aria-hidden="true"
            style={{ top: lineHeight }}
            className="absolute left-8 h-3.5 w-3.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-greenAccent shadow-[0_0_16px_6px_rgba(93,187,99,0.55)] md:left-1/2"
          />

          <div className="space-y-8 md:space-y-12">
            {MILESTONES.map((item, i) => {
              const isLeft = i % 2 === 0;
              const fraction = (i + 0.5) / MILESTONES.length;
              return (
                <div
                  key={item.year}
                  className="relative grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] md:items-center md:gap-x-10"
                >
                  {/* Card sits in the left or right column; the empty opposite
                      column keeps the centre column (node) perfectly centred. */}
                  <div className={cn("pl-20 md:pl-0", isLeft ? "md:col-start-1" : "md:col-start-3")}>
                    <MilestoneCard item={item} dir={isLeft ? -1 : 1} />
                  </div>
                  {/* Node: absolute on mobile (left rail); a real centred grid
                      cell on desktop so it always aligns to the card's midpoint. */}
                  <TimelineNode
                    progress={scrollYProgress}
                    fraction={fraction}
                    className="absolute left-8 top-1/2 -translate-x-1/2 -translate-y-1/2 md:static md:col-start-2 md:translate-x-0 md:translate-y-0 md:justify-self-center"
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
