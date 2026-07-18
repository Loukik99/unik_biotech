import { Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, ShieldCheck, Sprout, Package, Users, Award } from "lucide-react";
import { cn } from "@/lib/utils";
import { useLang } from "@/context/LanguageContext";
import { Button } from "@/components/ui/button";
import Container from "@/components/common/Container";
import AnimatedHeading from "@/components/common/AnimatedHeading";
import SideRays from "@/components/common/SideRays";
import { useReveal } from "@/components/hooks/useReveal";
import { revealClasses } from "@/components/animations/transitions";

// Existing farm photograph, reused as the Hero background (not blurred, not replaced).
const HERO_IMAGE = "https://images.unsplash.com/photo-1560493676-04071c5f467b?w=1920&q=80";

// Layered cinematic overlays (blended, not a single flat gradient).
// 1) Diagonal darkening: heavy at the bottom-left (text side), clearing toward the bright top-right sun.
const OVERLAY_DARK =
  "linear-gradient(118deg, rgba(5,16,9,.95) 0%, rgba(5,16,9,.82) 26%, rgba(5,16,9,.52) 50%, rgba(6,22,11,.18) 74%, rgba(6,22,11,0) 100%)";
// 2) Warm green sunlight glow anchored to the top-right corner.
const OVERLAY_GREEN =
  "radial-gradient(120% 95% at 100% 0%, rgba(150,214,120,.42) 0%, rgba(93,187,99,.16) 34%, rgba(93,187,99,0) 64%)";
// 3) Darken the very top (navbar legibility) and the very bottom (stat bar legibility).
const OVERLAY_EDGES =
  "linear-gradient(180deg, rgba(5,14,8,.55) 0%, rgba(5,14,8,0) 22%, rgba(5,14,8,0) 66%, rgba(4,12,7,.85) 100%)";
const OVERLAY_MOBILE =
  "linear-gradient(180deg, rgba(6,20,11,.55) 0%, rgba(6,20,11,.32) 45%, rgba(6,20,11,.75) 100%)";

// Large, soft, slow sunlight from the upper-right (bigger + gentler than before).
const RAY_PROPS = {
  speed: 0.8,
  rayColor1: "#5DBB63",
  rayColor2: "#BBF7D0",
  intensity: 1.35,
  spread: 2.0,
  blend: 0.65,
  falloff: 1.4,
  opacity: 0.5,
  origin: "top-right",
};

/** Render a headline, wrapping the highlight word in brand green. */
function renderHeadline(text, highlight) {
  if (!highlight || !text.includes(highlight)) return text;
  const parts = text.split(highlight);
  return parts.map((part, i) => (
    <Fragment key={i}>
      {part}
      {i < parts.length - 1 && <span className="text-brand-greenAccent">{highlight}</span>}
    </Fragment>
  ));
}

/** Subtle SVG outline decorations (kept under 8% opacity). */
function HeroDecor() {
  return (
    <svg
      aria-hidden="true"
      className="pointer-events-none absolute right-6 top-1/2 z-[5] hidden h-[34rem] w-[34rem] -translate-y-1/2 text-brand-greenAccent opacity-[0.06] lg:block"
      viewBox="0 0 400 400"
      fill="none"
      stroke="currentColor"
      strokeWidth="1"
    >
      <circle cx="200" cy="200" r="150" />
      <circle cx="200" cy="200" r="110" />
      <circle cx="200" cy="200" r="70" />
      <path d="M200 40 C120 120 120 280 200 360 C280 280 280 120 200 40 Z" />
    </svg>
  );
}

export default function Hero() {
  const { t, lang } = useLang();
  const [reducedMotion, setReducedMotion] = useState(false);
  const isMr = lang === "mr";

  // Reveal hooks with stagger
  const [badgeRef, badgeVisible] = useReveal();
  const [subRef, subVisible] = useReveal({ threshold: 0.1 });
  const [ctasRef, ctasVisible] = useReveal({ threshold: 0.1 });
  const [statsRef, statsVisible] = useReveal({ threshold: 0.1 });

  useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) return undefined;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onChange = () => setReducedMotion(mq.matches);
    onChange();
    mq.addEventListener?.("change", onChange);
    return () => mq.removeEventListener?.("change", onChange);
  }, []);

  const stats = [
    { value: t("stats", "years"), label: t("stats", "yearsLabel"), Icon: Sprout },
    { value: t("stats", "products"), label: t("stats", "productsLabel"), Icon: Package },
    { value: t("stats", "customers"), label: t("stats", "customersLabel"), Icon: Users },
    { value: t("stats", "cert"), label: t("stats", "certLabel"), Icon: ShieldCheck },
  ];

  return (
    <section
      data-testid="hero-section"
      className="relative w-full bg-brand-bgDark text-white"
    >
      {/*
        Desktop full-bleed background stack. Layer order:
        image (0) -> side rays (1, illuminate image) -> dark-left overlay (2)
        -> green top-right glow (3) -> vignette (4) -> subtle decor (5).
      */}
      <div aria-hidden="true" className="absolute inset-0 hidden overflow-hidden lg:block">
        <img
          src={HERO_IMAGE}
          alt=""
          className="absolute inset-0 z-0 h-full w-full object-cover object-[50%_62%]"
          style={{ filter: "saturate(1.12) contrast(1.06) brightness(.92)" }}
        />
        {!reducedMotion && <SideRays {...RAY_PROPS} />}
        <div className="absolute inset-0 z-[2]" style={{ background: OVERLAY_DARK }} />
        <div className="absolute inset-0 z-[3]" style={{ background: OVERLAY_GREEN }} />
        <div className="absolute inset-0 z-[4]" style={{ background: OVERLAY_EDGES }} />
        <HeroDecor />
      </div>

      <Container className="relative z-10 flex min-h-screen flex-col">
        <div className="grid flex-1 items-start gap-12 pt-28 lg:grid-cols-[3fr_2fr] lg:gap-10 lg:pt-36">
            {/* LEFT: content */}
            <div className="max-w-[620px]">
              <div
                ref={badgeRef}
                className={cn(
                  "mb-6 inline-flex items-center gap-2 rounded-full border border-white/15 bg-black/25 px-4 py-2 shadow-soft backdrop-blur-md",
                  revealClasses("fade-up", badgeVisible || reducedMotion)
                )}
              >
                <Award className="h-4 w-4 text-amber-300" />
                <span className="text-xs font-semibold tracking-wide text-amber-100 sm:text-sm">
                  {t("hero", "badge")}
                </span>
              </div>

              <AnimatedHeading
                as="h1"
                variant="blur-reveal"
                className={`mb-5 text-4xl font-extrabold leading-[1.1] tracking-tight text-white sm:text-5xl lg:text-[3.25rem] xl:text-[3.5rem] ${isMr ? "font-marathi" : ""}`}
              >
                {renderHeadline(t("hero", "headline"), t("hero", "highlight"))}
              </AnimatedHeading>

              <p
                ref={subRef}
                className={cn(
                  `mb-8 max-w-[500px] text-base leading-relaxed text-white/80 sm:text-lg ${isMr ? "font-marathi" : ""}`,
                  revealClasses("fade-up", subVisible || reducedMotion)
                )}
              >
                {t("hero", "sub")}
              </p>

              <div
                ref={ctasRef}
                className={cn(
                  "flex flex-col gap-4 sm:flex-row",
                  revealClasses("fade-up", ctasVisible || reducedMotion)
                )}
              >
                <Button asChild variant="primary" size="xl" data-testid="hero-cta-products">
                  <Link to="/products">
                    <span>{t("hero", "cta1")}</span>
                    <span className="ml-1 inline-flex h-6 w-6 items-center justify-center rounded-full bg-white/20">
                      <ArrowRight className="btn-arrow h-3.5 w-3.5" />
                    </span>
                  </Link>
                </Button>
                <Button
                  asChild
                  variant="secondary"
                  size="xl"
                  className="border-white/30 text-white hover:bg-white/10"
                  data-testid="hero-cta-contact"
                >
                  <Link to="/contact">
                    <span>{t("hero", "cta2")}</span>
                    <span className="ml-1 inline-flex h-6 w-6 items-center justify-center rounded-full bg-white/10">
                      <ArrowRight className="btn-arrow h-3.5 w-3.5" />
                    </span>
                  </Link>
                </Button>
              </div>
            </div>

            {/* RIGHT visual: on mobile the image sits below the text as its own block */}
            <div className="lg:hidden">
              <div className="relative overflow-hidden rounded-hero border border-white/15 shadow-glass">
                <img
                  src={HERO_IMAGE}
                  alt="Agricultural field"
                  className="h-64 w-full object-cover object-center sm:h-80"
                />
                {!reducedMotion && <SideRays {...RAY_PROPS} />}
                <div className="absolute inset-0 z-[2]" style={{ background: OVERLAY_MOBILE }} />
              </div>
            </div>
          </div>

          {/*
            Statistics bar integrated at the bottom of the Hero: dark glass with
            rounded green icon tiles and thin dividers (matches the reference).
          */}
          <div
            ref={statsRef}
            className={cn(
              "pb-10 pt-6 lg:pb-12",
              revealClasses("fade-up", statsVisible || reducedMotion)
            )}
          >
            <div className="grid grid-cols-2 gap-y-6 rounded-[28px] border border-white/10 bg-black/25 p-5 backdrop-blur-xl sm:p-6 md:grid-cols-4 md:gap-y-0 md:divide-x md:divide-white/10">
              {stats.map(({ value, label, Icon }) => (
                <div key={label} className="flex items-center gap-3 md:justify-center md:px-4">
                  <span className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-2xl bg-brand-green/25 text-brand-greenAccent ring-1 ring-white/10">
                    <Icon className="h-6 w-6" strokeWidth={1.75} />
                  </span>
                  <div>
                    <div className={cn("font-heading text-xl font-extrabold leading-none text-white sm:text-2xl", isMr && "font-marathi")}>
                      {value}
                    </div>
                    <div className={cn("mt-1 text-xs text-white/70", isMr && "font-marathi")}>{label}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Container>
    </section>
  );
}
