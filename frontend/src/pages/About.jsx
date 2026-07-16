import {
  Award,
  Users,
  Leaf,
  CheckCircle,
  Beaker,
  Clock,
  Calendar,
  MapPin,
  Package,
  ShieldCheck,
  Sprout,
  ArrowRight,
  Eye,
} from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import { useLang } from "@/context/LanguageContext";
import SEO from "@/components/SEO";
import Section from "@/components/common/Section";
import Container from "@/components/common/Container";
import SectionTitle from "@/components/common/SectionTitle";
import Milestones from "@/components/about/Milestones";
import ParallaxImage from "@/components/about/ParallaxImage";
import { SlideReveal } from "@/components/animations/SlideReveal";

// Unique About-page hero photo (not used on any other page).
const HERO_IMG = "/unik/tractor-1.jpg";

// Re-animate as sections re-enter, matching the rest of the site's rhythm.
const VIEWPORT = { once: false, amount: 0.2 };

const heroContainer = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.08 } },
};
const heroItem = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
};

// Card grids: stagger children, each sliding in from an alternating side.
const cardsGrid = { hidden: {}, show: { transition: { staggerChildren: 0.1 } } };
const cardItem = {
  hidden: (dir) => ({ opacity: 0, x: dir === "right" ? 50 : -50 }),
  show: { opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeOut" } },
};
// Icons rotate slightly and settle into place as their card reveals.
const iconSpin = {
  hidden: { rotate: -8, scale: 0.85 },
  show: { rotate: 0, scale: 1, transition: { duration: 0.5, ease: "easeOut" } },
};

// ---- Our Story: split-layout reveal (text from left, image from right) ----
const STORY_VIEWPORT = { once: true, amount: 0.25 };
const storyTextReveal = {
  hidden: { opacity: 0, x: -80, filter: "blur(6px)" },
  show: { opacity: 1, x: 0, filter: "blur(0px)", transition: { duration: 0.8, ease: "easeOut" } },
};
const storyImageReveal = {
  hidden: { opacity: 0, x: 80, scale: 1.08 },
  show: { opacity: 1, x: 0, scale: 1, transition: { duration: 1, ease: "easeOut" } },
};
// Stats stagger in only after the text has settled.
const storyStatsContainer = {
  hidden: {},
  show: { transition: { delayChildren: 0.5, staggerChildren: 0.12 } },
};
const storyStatItem = {
  hidden: { opacity: 0, y: 30, scale: 0.96 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5, ease: "easeOut" } },
};

const STORY_STATS = [
  { icon: Calendar, value: "2005", labelKey: "statEstablished" },
  { icon: MapPin, valueKey: "statLocationWrap", labelKey: "statLocation" },
  { icon: Package, value: "100+", labelKey: "statProducts" },
  { icon: ShieldCheck, value: "ISO 9001", labelKey: "statCert" },
];

const CERTS = [
  { icon: Award, title: "ISO 9001:2008", desc: "ISO 9001:2008 Certified — Quality Management System" },
  { icon: Beaker, title: "Lab Tested", desc: "Every product is rigorously tested in our lab before dispatch" },
  { icon: Leaf, title: "Made in Nashik", desc: "Manufactured at Pimpalgaon Baswant, Nashik, Maharashtra" },
];

const VALUE_META = [
  { icon: CheckCircle, title: "Quality", desc: "Quality is our foundation. Every product is made with precision and care." },
  { icon: Users, title: "Teamwork", desc: "Together we grow. Our team works collaboratively to achieve excellence." },
  { icon: Beaker, title: "Innovation", desc: "Pioneering the future of agriculture with continuous innovation." },
  { icon: Clock, title: "Punctuality", desc: "Delivering on time, every time. Reliability you can count on." },
];

export default function About() {
  const { t, lang } = useLang();
  const mr = lang === "mr" ? "font-marathi" : "";

  const aboutFAQs = [
    {
      question: "When was Unik Biotech Research established?",
      answer: "Unik Biotech Research was established in 2005 in Pimpalgaon Baswant, Nashik, Maharashtra, India. The company has over 20 years of experience in manufacturing agricultural inputs."
    },
    {
      question: "Is Unik Biotech Research ISO certified?",
      answer: "Yes, Unik Biotech Research is ISO 9001:2008 certified. Every product is rigorously lab-tested before dispatch to ensure the highest quality standards."
    },
    {
      question: "Who is the CEO of Unik Biotech Research?",
      answer: "Vilas R. Damre is the CEO of Unik Biotech Research, leading the company's mission to provide scientifically advanced, sustainable, and affordable agricultural inputs to Indian farmers."
    },
    {
      question: "What is Unik Biotech Research's mission?",
      answer: "Unik Biotech Research's mission is to provide scientifically advanced, high-quality agricultural inputs that are sustainable and affordable, helping Indian farmers improve crop health, yield, and soil fertility."
    }
  ];

  return (
    <div className="page-enter">
      <SEO
        title="About Us — Our History, Mission & Vision"
        description="Unik Biotech Research, established in 2005 in Nashik, Maharashtra, is an ISO 9001:2008 certified manufacturer of organic fertilizers and biostimulants. Learn about our 20+ year journey, mission, vision, and commitment to Indian agriculture."
        keywords="about Unik Biotech Research, agriculture company Nashik, ISO certified fertilizer manufacturer, Vilas R. Damre, Unik Biotech Research history, Pimpalgaon Baswant, agricultural inputs manufacturer India, organic farming company"
        url="https://unikbiotechresearch.com/about"
        lang={lang}
        faqSchema={aboutFAQs}
        breadcrumbs={[
          { name: "Home", url: "https://unikbiotechresearch.com/" },
          { name: "About Us", url: "https://unikbiotechresearch.com/about" }
        ]}
      />

      {/* ================= HERO ================= */}
      <section
        data-testid="about-hero"
        className="relative isolate flex min-h-[60vh] w-full items-center overflow-hidden lg:min-h-[600px]"
      >
        {/* Background photograph with a slow, subtle zoom */}
        <motion.div
          aria-hidden="true"
          className="absolute inset-0 -z-10 will-change-transform"
          initial={{ scale: 1.06 }}
          animate={{ scale: 1.14 }}
          transition={{ duration: 16, ease: "easeInOut", repeat: Infinity, repeatType: "reverse" }}
        >
          <img
            src={HERO_IMG}
            alt="Tractor working a Unik Biotech Research partner farm at golden hour"
            className="h-full w-full object-cover object-center"
            fetchPriority="high"
            decoding="async"
          />
        </motion.div>
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-10 bg-gradient-to-r from-farm-forestDeep/95 via-farm-forestDeep/80 to-farm-forest/30"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-10 bg-gradient-to-t from-farm-forestDeep/85 via-transparent to-farm-forestDeep/30"
        />

        <Container className="relative z-10 py-28 lg:py-32">
          <motion.div
            variants={heroContainer}
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT}
            className="max-w-2xl"
          >
            <motion.h1
              variants={heroItem}
              className={cn(
                "font-heading text-4xl font-extrabold leading-[1.05] tracking-tight text-farm-cream sm:text-5xl lg:text-6xl",
                mr
              )}
            >
              {t("about", "hero")}
            </motion.h1>

            <motion.p
              variants={heroItem}
              className={cn(
                "mt-5 max-w-xl text-base leading-relaxed text-farm-cream/85 sm:text-lg",
                mr
              )}
            >
              {t("about", "heroSub")}
            </motion.p>

            <motion.div
              variants={heroItem}
              className="mt-8 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 shadow-soft backdrop-blur-md"
            >
              <ShieldCheck className="h-4 w-4 text-brand-greenAccent" aria-hidden="true" />
              <span className="text-xs font-semibold tracking-wide text-white sm:text-sm">
                {t("hero", "badge")}
              </span>
            </motion.div>
          </motion.div>
        </Container>
      </section>

      {/* ================= OUR STORY ================= */}
      <Section spacing="lg" data-testid="our-story" className="bg-white">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* LEFT: text container — its own motion.div, slides in from the left */}
          <div>
            <motion.div
              variants={storyTextReveal}
              initial="hidden"
              whileInView="show"
              viewport={STORY_VIEWPORT}
            >
              <div className="mb-4">
                <span className={cn("inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-brand-green", mr)}>
                  {t("about", "storyLabel")}
                </span>
              </div>

              <h2
                className={cn(
                  "text-3xl font-extrabold leading-tight tracking-tight text-brand-ink sm:text-4xl lg:text-[2.75rem]",
                  mr
                )}
              >
                {t("about", "storyTitle")}
              </h2>

              <p className={cn("mt-6 max-w-[560px] text-base leading-relaxed text-brand-muted sm:text-lg", mr)}>
                {t("about", "storyText")}
              </p>
            </motion.div>

            {/* Stats stagger in after the text settles */}
            <motion.div
              variants={storyStatsContainer}
              initial="hidden"
              whileInView="show"
              viewport={STORY_VIEWPORT}
              className="mt-8 grid max-w-[560px] grid-cols-2 gap-3 sm:gap-4"
            >
              {STORY_STATS.map((item) => {
                const Icon = item.icon;
                const value = item.valueKey ? t("about", item.valueKey) : item.value;
                return (
                  <motion.div
                    key={item.labelKey}
                    variants={storyStatItem}
                    className="group rounded-2xl border border-black/[0.06] bg-brand-bgLight p-4 transition-all duration-300 hover:-translate-y-1 hover:shadow-soft motion-reduce:transition-none"
                  >
                    <span className="mb-3 flex h-9 w-9 items-center justify-center rounded-lg bg-brand-green/10 text-brand-green transition-transform duration-300 group-hover:scale-110">
                      <Icon className="h-5 w-5" strokeWidth={1.75} />
                    </span>
                    <div className={cn("font-heading text-xl font-bold leading-none text-brand-green", mr)}>
                      {value}
                    </div>
                    <div className={cn("mt-1.5 text-sm text-brand-muted", mr)}>{t("about", item.labelKey)}</div>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>

          {/* RIGHT: image container — its own motion.div, slides in from the right */}
          <motion.div
            variants={storyImageReveal}
            initial="hidden"
            whileInView="show"
            viewport={STORY_VIEWPORT}
          >
            <div className="relative h-80 overflow-hidden rounded-[32px] shadow-soft sm:h-96 lg:h-[32rem]">
              <img
                src="/unik/unik-lab.png"
                alt="Unik Biotech Research laboratory and quality-testing facility"
                loading="lazy"
                decoding="async"
                draggable="false"
                className="h-full w-full object-cover"
              />
            </div>
          </motion.div>
        </div>
      </Section>

      {/* ================= MISSION & VISION ================= */}
      <Section tone="light" spacing="lg" data-testid="mission-vision">
        <div className="relative overflow-hidden rounded-[32px] border border-black/[0.06] bg-brand-bgLight p-4 shadow-soft sm:p-6 lg:p-8">
          {/* Faint decorative foliage */}
          <Leaf
            aria-hidden="true"
            className="pointer-events-none absolute -right-8 top-1/2 h-72 w-72 -translate-y-1/2 rotate-12 text-brand-green/[0.06]"
            strokeWidth={0.8}
          />

          <div className="relative grid gap-4 sm:gap-6 md:auto-rows-fr md:grid-cols-2">
            {/* Mission image */}
            <ParallaxImage
              name="paddy-transplanting"
              alt="Farmers hand-planting paddy seedlings in a lush field"
              sizes="(min-width: 768px) 45vw, 100vw"
              className="min-h-[220px] rounded-[24px] shadow-soft"
            />

            {/* Mission text slides from the right */}
            <SlideReveal direction="right">
              <div className="group flex h-full flex-col justify-center rounded-[24px] bg-white p-7 shadow-soft transition-all duration-300 hover:-translate-y-1.5 hover:shadow-glass motion-reduce:transition-none sm:p-9">
                <motion.span
                  variants={iconSpin}
                  initial="hidden"
                  whileInView="show"
                  viewport={VIEWPORT}
                  className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-greenAccent to-brand-green text-white shadow-soft"
                >
                  <CheckCircle className="h-6 w-6" strokeWidth={2} aria-hidden="true" />
                </motion.span>
                <h3 className={cn("font-heading text-2xl font-bold text-brand-ink", mr)}>
                  {t("about", "missionTitle")}
                </h3>
                <span className="mt-3 block h-0.5 w-10 rounded-full bg-brand-green/70" aria-hidden="true" />
                <p className={cn("mt-4 leading-relaxed text-brand-muted", mr)}>{t("about", "missionText")}</p>
              </div>
            </SlideReveal>

            {/* Vision text slides from the left */}
            <SlideReveal direction="left">
              <div className="group flex h-full flex-col justify-center rounded-[24px] bg-white p-7 shadow-soft transition-all duration-300 hover:-translate-y-1.5 hover:shadow-glass motion-reduce:transition-none sm:p-9">
                <motion.span
                  variants={iconSpin}
                  initial="hidden"
                  whileInView="show"
                  viewport={VIEWPORT}
                  className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-greenAccent to-brand-green text-white shadow-soft"
                >
                  <Eye className="h-6 w-6" strokeWidth={2} aria-hidden="true" />
                </motion.span>
                <h3 className={cn("font-heading text-2xl font-bold text-brand-ink", mr)}>
                  {t("about", "visionTitle")}
                </h3>
                <span className="mt-3 block h-0.5 w-10 rounded-full bg-brand-green/70" aria-hidden="true" />
                <p className={cn("mt-4 leading-relaxed text-brand-muted", mr)}>{t("about", "visionText")}</p>
              </div>
            </SlideReveal>

            {/* Vision image */}
            <ParallaxImage
              name="tea-plantation"
              alt="Sweeping green tea plantation across rolling hills"
              sizes="(min-width: 768px) 45vw, 100vw"
              className="min-h-[220px] rounded-[24px] shadow-soft"
            />
          </div>
        </div>
      </Section>

      {/* ================= MILESTONES (locked — do not modify) ================= */}
      <Milestones />

      {/* ================= QUALITY & CERTIFICATIONS ================= */}
      <Section tone="light" spacing="lg" data-testid="certifications" className="bg-brand-bgLight">
        <SectionTitle
          align="center"
          title={t("about", "certTitle")}
          titleClassName="text-brand-ink"
          className="mx-auto mb-12"
        />
        <motion.div
          variants={cardsGrid}
          initial="hidden"
          whileInView="show"
          viewport={VIEWPORT}
          className="grid grid-cols-1 gap-6 md:grid-cols-3"
        >
          {CERTS.map((cert, i) => {
            const Icon = cert.icon;
            return (
              <motion.div key={cert.title} custom={i % 2 === 0 ? "left" : "right"} variants={cardItem} className="h-full">
                <article className="group flex h-full flex-col items-center rounded-[24px] border border-black/[0.06] bg-white p-8 text-center shadow-soft transition-all duration-300 hover:-translate-y-2 hover:shadow-glass motion-reduce:transition-none">
                  <motion.span
                    variants={iconSpin}
                    className="mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-brand-green/10 text-brand-green transition-transform duration-300 group-hover:scale-105"
                  >
                    <Icon className="h-8 w-8" strokeWidth={1.75} />
                  </motion.span>
                  <h4 className="mb-2 font-heading text-lg font-bold text-brand-ink">{cert.title}</h4>
                  <p className="text-sm leading-relaxed text-brand-muted">{cert.desc}</p>
                </article>
              </motion.div>
            );
          })}
        </motion.div>
      </Section>

      {/* ================= CORE VALUES ================= */}
      <Section tone="light" spacing="lg" data-testid="core-values">
        <SectionTitle
          align="center"
          title={t("about", "valuesTitle")}
          titleClassName="text-brand-ink"
          className="mx-auto mb-12"
        />
        <motion.div
          variants={cardsGrid}
          initial="hidden"
          whileInView="show"
          viewport={VIEWPORT}
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4"
        >
          {VALUE_META.map((item, i) => {
            const Icon = item.icon;
            return (
              <motion.div key={item.title} custom={i % 2 === 0 ? "left" : "right"} variants={cardItem} className="h-full">
                <article className="group flex h-full flex-col items-center rounded-2xl border border-black/[0.06] bg-white p-6 text-center shadow-[0_2px_12px_rgba(16,40,24,0.05)] transition-all duration-300 hover:-translate-y-2 hover:shadow-glass motion-reduce:transition-none">
                  <motion.span
                    variants={iconSpin}
                    className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-brand-green/10 text-brand-green transition-transform duration-300 group-hover:scale-105"
                  >
                    <Icon className="h-6 w-6" strokeWidth={1.75} />
                  </motion.span>
                  <h4 className="font-heading text-base font-bold text-brand-ink">{item.title}</h4>
                  <span className="mt-2 h-0.5 w-6 rounded-full bg-brand-green/70" aria-hidden="true" />
                  <p className="mt-3 text-sm leading-relaxed text-brand-muted">{item.desc}</p>
                </article>
              </motion.div>
            );
          })}
        </motion.div>
      </Section>

      {/* ================= CTA ================= */}
      <Section spacing="lg" data-testid="about-cta">
        <SlideReveal
          direction="right"
          className="relative overflow-hidden rounded-[32px] bg-gradient-to-br from-brand-greenDark to-brand-green px-7 py-12 shadow-soft sm:px-12 sm:py-14"
        >
          <span
            aria-hidden="true"
            className="pointer-events-none absolute -right-16 -top-20 h-56 w-56 rounded-full bg-brand-greenAccent/25 blur-3xl"
          />
          <span
            aria-hidden="true"
            className="pointer-events-none absolute -left-10 bottom-0 h-48 w-48 rounded-full bg-white/5 blur-3xl"
          />
          <div className="relative flex flex-col items-center gap-8 text-center lg:flex-row lg:justify-between lg:text-left">
            <div className="flex flex-col items-center gap-5 sm:flex-row">
              <span className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-white/10 text-white ring-1 ring-white/20">
                <Sprout className="h-8 w-8" strokeWidth={1.75} aria-hidden="true" />
              </span>
              <div>
                <h2 className={cn("font-heading text-2xl font-bold text-white sm:text-3xl", mr)}>
                  {t("about", "growTitle")}
                </h2>
                <p className={cn("mt-2 max-w-md text-sm leading-relaxed text-white/85 sm:text-base", mr)}>
                  {t("about", "growText")}
                </p>
              </div>
            </div>

            <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
              <Link
                to="/dealer-locator"
                className="group inline-flex items-center justify-center gap-2 rounded-full bg-brand-greenAccent px-7 py-3.5 text-[15px] font-semibold text-white shadow-lg shadow-black/20 transition-[transform,box-shadow,background-color] duration-300 ease-out hover:-translate-y-1 hover:scale-[1.03] hover:bg-brand-green hover:shadow-xl"
              >
                {t("about", "growBecome")}
                <ArrowRight className="h-4 w-4 transition-transform duration-300 ease-out group-hover:translate-x-1" aria-hidden="true" />
              </Link>
              <Link
                to="/dealer-locator"
                className="group inline-flex items-center justify-center gap-2 rounded-full border border-white/35 bg-white/5 px-7 py-3.5 text-[15px] font-semibold text-white backdrop-blur-md transition-[transform,box-shadow,background-color] duration-300 ease-out hover:-translate-y-1 hover:scale-[1.03] hover:bg-white/12"
              >
                {t("about", "growFind")}
                <MapPin className="h-4 w-4 transition-transform duration-300 ease-out group-hover:scale-110" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </SlideReveal>
      </Section>
    </div>
  );
}
