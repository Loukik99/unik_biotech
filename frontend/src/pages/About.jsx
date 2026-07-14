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
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useLang } from "@/context/LanguageContext";
import SEO from "@/components/SEO";
import Section from "@/components/common/Section";
import Container from "@/components/common/Container";
import SectionTitle from "@/components/common/SectionTitle";
import AnimatedHeading from "@/components/common/AnimatedHeading";
import { useReveal } from "@/components/hooks/useReveal";
import { revealClasses } from "@/components/animations/transitions";

const ABOUT_IMG = "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=1600&q=80";
const LAB_IMG = "https://images.pexels.com/photos/8851412/pexels-photo-8851412.jpeg?auto=compress&cs=tinysrgb&w=900";

// Layered cinematic hero overlays (matches the Home hero language, tuned for
// centered text): vertical darkening + soft brand-green glow + edge vignette.
const OVERLAY_DARK =
  "linear-gradient(180deg, rgba(6,18,10,.74) 0%, rgba(6,18,10,.56) 48%, rgba(4,12,7,.84) 100%)";
const OVERLAY_GREEN =
  "radial-gradient(100% 95% at 50% 0%, rgba(93,187,99,.24) 0%, rgba(93,187,99,0) 58%)";

const TIMELINE = [
  { year: "2005", title: "Founded", desc: "UNIK BIOTECH RESEARCH was established in Pimpalgaon Baswant, Nashik with a mission to serve farmers." },
  { year: "2008", title: "ISO 9001:2008 Certified", desc: "Achieved ISO 9001:2008 certification, reaffirming commitment to quality." },
  { year: "2012", title: "Product Range Expansion", desc: "Expanded to 30+ products including herbal insecticides and biofertilizers." },
  { year: "2020", title: "100+ Products Milestone", desc: "Reached 100+ products serving thousands of farmers across Maharashtra." },
  { year: "2025", title: "20 Years of Trust", desc: "Celebrating 20 years of serving farmers with quality and innovation." },
];

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

  const [mvRef, mvVisible] = useReveal();
  const [storyTextRef, storyTextVisible] = useReveal();
  const [storyImgRef, storyImgVisible] = useReveal();
  const [certRef, certVisible] = useReveal();
  const [valuesRef, valuesVisible] = useReveal();

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
        keywords="about Unik Biotech, agriculture company Nashik, ISO certified fertilizer manufacturer, Vilas R. Damre, Unik Biotech history, Pimpalgaon Baswant, agricultural inputs manufacturer India, organic farming company"
        url="https://unikbiotechresearch.com/about"
        lang={lang}
        faqSchema={aboutFAQs}
        breadcrumbs={[
          { name: "Home", url: "https://unikbiotechresearch.com/" },
          { name: "About Us", url: "https://unikbiotechresearch.com/about" }
        ]}
      />

      {/* Hero */}
      <section
        data-testid="about-hero"
        className="relative flex min-h-[65vh] w-full items-center overflow-hidden bg-brand-bgDark text-white"
      >
        <div aria-hidden="true" className="absolute inset-0 overflow-hidden">
          <img
            src={ABOUT_IMG}
            alt=""
            className="absolute inset-0 h-full w-full object-cover object-center"
            style={{ filter: "saturate(1.1) contrast(1.05) brightness(.9)" }}
          />
          <div className="absolute inset-0" style={{ background: OVERLAY_DARK }} />
          <div className="absolute inset-0" style={{ background: OVERLAY_GREEN }} />
        </div>

        <Container className="relative z-10 py-28 text-center lg:py-32">
          <div className="mx-auto max-w-3xl">
            <div className="mb-6 inline-flex animate-fade-up items-center gap-2 rounded-full border border-white/15 bg-black/25 px-4 py-2 shadow-soft backdrop-blur-md">
              <Award className="h-4 w-4 text-amber-300" />
              <span className="text-xs font-semibold tracking-wide text-amber-100 sm:text-sm">
                {t("hero", "badge")}
              </span>
            </div>

            <AnimatedHeading
              as="h1"
              variant="blur-reveal"
              className={cn(
                "mb-5 text-4xl font-extrabold leading-[1.1] tracking-tight text-white sm:text-5xl lg:text-6xl",
                mr
              )}
            >
              {t("about", "hero")}
            </AnimatedHeading>

            <p
              className={cn(
                "mx-auto max-w-2xl animate-fade-up text-base leading-relaxed text-white/80 sm:text-lg",
                mr
              )}
              style={{ animationDelay: "150ms" }}
            >
              {t("about", "heroSub")}
            </p>
          </div>
        </Container>
      </section>

      {/* Mission & Vision */}
      <Section tone="light" spacing="lg" data-testid="mission-vision">
        <div ref={mvRef} className="grid grid-cols-1 items-stretch gap-6 md:grid-cols-2 lg:gap-8">
          {/* Mission — light editorial card with a left accent rail */}
          <article
            className={cn(
              "group relative overflow-hidden rounded-[28px] border border-black/[0.06] bg-white p-8 pl-10 shadow-soft transition-all duration-300 hover:-translate-y-1.5 hover:shadow-glass motion-reduce:transition-none sm:p-10 sm:pl-12",
              revealClasses("fade-up", mvVisible)
            )}
          >
            <span
              aria-hidden="true"
              className="absolute inset-y-6 left-0 w-1.5 rounded-full bg-gradient-to-b from-brand-greenAccent to-brand-green"
            />
            <span
              aria-hidden="true"
              className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-brand-green/10 blur-2xl"
            />
            <div className="relative">
              <h3 className={cn("font-heading text-2xl font-bold text-brand-ink", mr)}>
                {t("about", "missionTitle")}
              </h3>
              <span className="mt-3 block h-0.5 w-10 rounded-full bg-brand-green/70" aria-hidden="true" />
              <p className={cn("mt-4 leading-relaxed text-brand-muted", mr)}>{t("about", "missionText")}</p>
            </div>
          </article>

          {/* Vision — dark immersive card with decorative rings + brand glow */}
          <article
            className={cn(
              "group relative overflow-hidden rounded-[28px] bg-gradient-to-br from-brand-green to-brand-greenDark p-8 text-white shadow-soft ring-1 ring-white/10 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-glass motion-reduce:transition-none sm:p-10",
              revealClasses("fade-up", mvVisible)
            )}
            style={{ transitionDelay: "120ms" }}
          >
            <span
              aria-hidden="true"
              className="pointer-events-none absolute inset-0"
              style={{ background: "radial-gradient(90% 80% at 100% 0%, rgba(150,214,120,.30) 0%, rgba(93,187,99,0) 55%)" }}
            />
            <svg
              aria-hidden="true"
              viewBox="0 0 200 200"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
              className="pointer-events-none absolute -right-10 -top-10 h-52 w-52 text-white/10"
            >
              <circle cx="100" cy="100" r="90" />
              <circle cx="100" cy="100" r="64" />
              <circle cx="100" cy="100" r="38" />
            </svg>
            <div className="relative">
              <h3 className={cn("font-heading text-2xl font-bold text-white", mr)}>
                {t("about", "visionTitle")}
              </h3>
              <span className="mt-3 block h-0.5 w-10 rounded-full bg-brand-greenAccent" aria-hidden="true" />
              <p className={cn("mt-4 leading-relaxed text-white/85", mr)}>{t("about", "visionText")}</p>
            </div>
          </article>
        </div>
      </Section>

      {/* Our Story */}
      <Section spacing="lg" data-testid="our-story" className="bg-white">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* LEFT: content */}
          <div ref={storyTextRef}>
            <div className="mb-4">
              <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-brand-green">
                {t("about", "storyLabel")}
              </span>
            </div>

            <AnimatedHeading
              as="h2"
              variant="blur-reveal"
              className={cn(
                "text-3xl font-extrabold leading-tight tracking-tight text-brand-ink sm:text-4xl lg:text-[2.75rem]",
                mr
              )}
            >
              {t("about", "storyTitle")}
            </AnimatedHeading>

            <p
              className={cn(
                "mt-6 max-w-[560px] text-base leading-relaxed text-brand-muted sm:text-lg",
                revealClasses("fade-up", storyTextVisible),
                mr
              )}
            >
              {t("about", "storyText")}
            </p>

            <div className="mt-8 grid max-w-[560px] grid-cols-2 gap-3 sm:gap-4">
              {STORY_STATS.map((item, i) => {
                const Icon = item.icon;
                const value = item.valueKey ? t("about", item.valueKey) : item.value;
                return (
                  <div
                    key={item.labelKey}
                    className={cn(
                      "rounded-2xl border border-black/[0.06] bg-brand-bgLight p-4 transition-all duration-300 hover:-translate-y-1 hover:shadow-soft motion-reduce:transition-none",
                      revealClasses("fade-up", storyTextVisible)
                    )}
                    style={{ transitionDelay: `${i * 80}ms` }}
                  >
                    <span className="mb-3 flex h-9 w-9 items-center justify-center rounded-lg bg-brand-green/10 text-brand-green">
                      <Icon className="h-5 w-5" strokeWidth={1.75} />
                    </span>
                    <div className={cn("font-heading text-xl font-bold leading-none text-brand-green", mr)}>
                      {value}
                    </div>
                    <div className={cn("mt-1.5 text-sm text-brand-muted", mr)}>{t("about", item.labelKey)}</div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* RIGHT: image */}
          <div ref={storyImgRef} className="relative overflow-hidden rounded-[32px] shadow-soft">
            <img
              src={LAB_IMG}
              alt="Unik Biotech Research Laboratory and Quality Testing Facility"
              loading="lazy"
              decoding="async"
              className={cn(
                "h-80 w-full object-cover transition-transform duration-1000 ease-standard motion-reduce:transition-none sm:h-96 lg:h-[32rem]",
                storyImgVisible ? "scale-100" : "scale-[1.04]"
              )}
            />
          </div>
        </div>
      </Section>

      {/* Timeline */}
      <section className="py-24 px-4 bg-gradient-to-b from-white to-[#fcfdfa] overflow-hidden">
        <div className="max-w-5xl mx-auto animate-fadeInUp">
          <div className="text-center mb-16">
            <span className="text-amber-600 text-sm font-bold uppercase tracking-widest mb-3 block">{t("about", "legacyLabel")}</span>
            <h2 className="font-heading font-extrabold text-gray-900 text-4xl md:text-5xl">
              {t("about", "journeyTitle")}
            </h2>
          </div>

          <div className="relative">
            {/* Center Line */}
            <div className="absolute left-6 md:left-1/2 transform md:-translate-x-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-green-100 via-green-200 to-green-50 rounded-full"></div>

            <div className="space-y-12">
              {TIMELINE.map((item, i) => (
                <div key={item.year} className={`relative flex flex-col md:flex-row gap-8 items-start md:items-center group ${i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}`}>

                  {/* Content Card */}
                  <div className={`flex-1 w-full pl-16 md:pl-0 ${i % 2 === 0 ? "md:text-right md:pr-12" : "md:text-left md:pl-12"}`}>
                    <div className={`bg-white rounded-3xl p-6 md:p-8 shadow-sm hover:shadow-xl border border-gray-100 hover:border-green-200 transition-all duration-300 transform group-hover:-translate-y-1 relative
                      ${i % 2 === 0 ? "md:origin-right" : "md:origin-left"}`}>
                      {/* Mobile Year Badge directly on card for mobile view */}
                      <div className="md:hidden inline-flex items-center justify-center px-4 py-1.5 rounded-full bg-green-50 text-green-800 font-heading font-bold text-sm mb-4 border border-green-100">
                        {item.year}
                      </div>
                      <h4 className="font-heading font-bold text-gray-900 text-xl mb-3 group-hover:text-green-800 transition-colors">
                        {item.title}
                      </h4>
                      <p className="text-gray-500 text-sm md:text-base leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  </div>

                  {/* Center Node */}
                  <div className="absolute left-0 md:static w-14 h-14 bg-white rounded-full flex items-center justify-center flex-shrink-0 z-10 border-4 border-green-50 group-hover:border-green-100 shadow-md group-hover:shadow-lg transition-all duration-300 transform group-hover:scale-110 md:mx-auto">
                    <div className="w-8 h-8 bg-gradient-to-br from-green-600 to-green-800 rounded-full flex items-center justify-center text-white">
                      <CheckCircle className="w-4 h-4" />
                    </div>
                  </div>

                  {/* Desktop Year Label */}
                  <div className={`flex-1 hidden md:block ${i % 2 === 0 ? "md:text-left md:pl-12" : "md:text-right md:pr-12"}`}>
                    <div className="font-heading font-extrabold text-5xl text-gray-200 group-hover:text-amber-500/20 transition-colors duration-500">
                      {item.year}
                    </div>
                  </div>

                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Quality & Certifications */}
      <Section
        tone="light"
        spacing="lg"
        data-testid="certifications"
        className="bg-gradient-to-b from-amber-50/70 to-brand-bgLight"
      >
        <SectionTitle
          align="center"
          title={t("about", "certTitle")}
          titleClassName="text-brand-ink"
          className="mx-auto mb-12"
        />
        <div ref={certRef} className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {CERTS.map((cert, i) => {
            const Icon = cert.icon;
            return (
              <article
                key={cert.title}
                className={cn(
                  "group flex flex-col items-center rounded-2xl border border-amber-200/50 bg-white p-8 text-center shadow-soft transition-all duration-300 hover:-translate-y-1.5 hover:shadow-glass motion-reduce:transition-none",
                  revealClasses("fade-up", certVisible)
                )}
                style={{ transitionDelay: `${i * 100}ms` }}
              >
                <span className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-amber-100 text-amber-600 transition-transform duration-300 group-hover:scale-105">
                  <Icon className="h-7 w-7" strokeWidth={1.75} />
                </span>
                <h4 className="mb-2 font-heading text-lg font-bold text-brand-ink">{cert.title}</h4>
                <p className="text-sm leading-relaxed text-brand-muted">{cert.desc}</p>
              </article>
            );
          })}
        </div>
      </Section>

      {/* Core Values */}
      <Section tone="light" spacing="lg" data-testid="core-values">
        <SectionTitle
          align="center"
          title={t("about", "valuesTitle")}
          titleClassName="text-brand-ink"
          className="mx-auto mb-12"
        />
        <div ref={valuesRef} className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {VALUE_META.map((item, i) => {
            const Icon = item.icon;
            return (
              <article
                key={i}
                className={cn(
                  "group flex flex-col items-center rounded-2xl border border-black/[0.06] bg-white p-6 text-center shadow-[0_2px_12px_rgba(16,40,24,0.05)] transition-all duration-300 hover:-translate-y-1.5 hover:shadow-glass motion-reduce:transition-none",
                  revealClasses("fade-up", valuesVisible)
                )}
                style={{ transitionDelay: `${i * 80}ms` }}
              >
                <span className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-brand-green/10 text-brand-green transition-transform duration-300 group-hover:scale-105">
                  <Icon className="h-6 w-6" strokeWidth={1.75} />
                </span>
                <h4 className="font-heading text-base font-bold text-brand-ink">{item.title}</h4>
                <span className="mt-2 h-0.5 w-6 rounded-full bg-brand-green/70" aria-hidden="true" />
                <p className="mt-3 text-sm leading-relaxed text-brand-muted">{item.desc}</p>
              </article>
            );
          })}
        </div>
      </Section>
    </div>
  );
}
