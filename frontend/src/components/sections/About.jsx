import { Link } from "react-router-dom";
import { ArrowRight, ShieldCheck, FlaskConical, Calendar, Leaf } from "lucide-react";
import { cn } from "@/lib/utils";
import { useLang } from "@/context/LanguageContext";
import { Button } from "@/components/ui/button";
import Section from "@/components/common/Section";
import AnimatedHeading from "@/components/common/AnimatedHeading";
import { useReveal } from "@/components/hooks/useReveal";
import { revealClasses } from "@/components/animations/transitions";

// Agriculture crop rows leading to a bright horizon, matching the reference composition.
const ABOUT_IMAGE = "https://images.unsplash.com/photo-1560493676-04071c5f467b?w=1100&q=80";

// Icons paired by index with the localized stat cards.
const ACHIEVEMENT_ICONS = [ShieldCheck, FlaskConical, Calendar];

export default function About() {
  const { t, lang } = useLang();
  const mr = lang === "mr" ? "font-marathi" : "";

  const [textRef, textVisible] = useReveal();
  const [imgRef, imgVisible] = useReveal();

  const paragraphs = [t("home", "aboutP1"), t("home", "aboutP2"), t("home", "aboutP3")];
  const achievements = t("home", "aboutAchievements") || [];

  return (
    <Section tone="light" spacing="lg" data-testid="about-section" className="overflow-hidden !pb-16">
      <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-2 lg:gap-20">
        {/* LEFT: editorial content */}
        <div>
          <div className="mb-4">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-brand-green">
              {t("home", "aboutEyebrow")}
            </span>
          </div>

          <AnimatedHeading
            as="h2"
            variant="blur-reveal"
            className={cn(
              "max-w-[540px] text-4xl font-extrabold leading-[1.12] tracking-tight text-brand-ink sm:text-[2.75rem]",
              mr
            )}
          >
            {t("home", "aboutHeading")}
            <Leaf className="ml-2 inline-block h-7 w-7 -rotate-12 align-middle text-brand-green" strokeWidth={1.75} />
          </AnimatedHeading>

          <div ref={textRef} className={cn("mt-6", revealClasses("fade-up", textVisible))}>
            <div className="max-w-[540px] space-y-4">
              {paragraphs.map((p, i) => (
                <p key={i} className={cn("text-base leading-relaxed text-brand-muted", mr)}>
                  {p}
                </p>
              ))}
            </div>

            {/* Three stat cards in a row */}
            <div className="mt-8 grid max-w-[540px] grid-cols-3 gap-3 sm:gap-4">
              {achievements.map((a, i) => {
                const Icon = ACHIEVEMENT_ICONS[i] || ShieldCheck;
                return (
                  <div
                    key={a.title}
                    className="rounded-2xl border border-black/[0.06] bg-white p-4 shadow-[0_2px_12px_rgba(16,40,24,0.05)]"
                  >
                    <span className="mb-3 flex h-9 w-9 items-center justify-center rounded-lg bg-brand-green/10 text-brand-green">
                      <Icon className="h-5 w-5" strokeWidth={1.75} />
                    </span>
                    <div className={cn("font-heading text-sm font-bold leading-tight text-brand-ink", mr)}>
                      {a.title}
                    </div>
                    <div className={cn("mt-1 text-xs leading-snug text-brand-muted", mr)}>{a.sub}</div>
                  </div>
                );
              })}
            </div>

            {/* CTA */}
            <div className="mt-8">
              <Button asChild variant="primary" size="xl" data-testid="about-cta">
                <Link to="/about">
                  <span>{t("home", "aboutBtn")}</span>
                  <span className="ml-1 inline-flex h-6 w-6 items-center justify-center rounded-full bg-white/20">
                    <ArrowRight className="btn-arrow h-3.5 w-3.5" />
                  </span>
                </Link>
              </Button>
            </div>
          </div>
        </div>

        {/* RIGHT: image + floating cards */}
        <div className="relative">
          <div ref={imgRef} className="relative overflow-hidden rounded-[32px] shadow-soft">
            <img
              src={ABOUT_IMAGE}
              alt="Sunrise over healthy crop rows cultivated with Unik Biotech Research inputs"
              loading="lazy"
              decoding="async"
              className={cn(
                "h-[26rem] w-full object-cover transition-transform duration-1000 ease-standard motion-reduce:transition-none sm:h-[30rem] lg:h-[34rem]",
                imgVisible ? "scale-100" : "scale-[1.04]"
              )}
            />
          </div>
        </div>
      </div>
    </Section>
  );
}
