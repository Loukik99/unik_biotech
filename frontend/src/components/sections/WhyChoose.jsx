import { Fragment } from "react";
import { Microscope, Leaf, ShieldCheck, Sprout, FlaskConical, Lightbulb, Award } from "lucide-react";
import { cn } from "@/lib/utils";
import { useLang } from "@/context/LanguageContext";
import Section from "@/components/common/Section";
import AnimatedHeading from "@/components/common/AnimatedHeading";
import { useReveal } from "@/components/hooks/useReveal";
import { revealClasses } from "@/components/animations/transitions";

// Real grown corn-field photo (rows of maize seedlings), served from /public.
const WHY_IMAGE = "/why-crops.jpg";

/** Line-art farmer (person wearing a wide-brim hat). lucide has no farmer glyph. */
function FarmerIcon({ className, strokeWidth = 1.6 }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M4 9h16" />
      <path d="M7.5 9a4.5 3.5 0 0 1 9 0" />
      <circle cx="12" cy="13" r="2.4" />
      <path d="M6 20.5a6 5 0 0 1 12 0" />
    </svg>
  );
}

// Icon order matches the reference card grid exactly.
const CARD_ICONS = [Microscope, Leaf, ShieldCheck, Sprout, FarmerIcon, FlaskConical, Lightbulb, Award];

/** Wrap the highlight word of a heading in brand green. */
function highlight(text, word) {
  if (!word || !text.includes(word)) return text;
  const parts = text.split(word);
  return parts.map((part, i) => (
    <Fragment key={i}>
      {part}
      {i < parts.length - 1 && <span className="text-brand-green">{word}</span>}
    </Fragment>
  ));
}

export default function WhyChoose() {
  const { t, lang } = useLang();
  const mr = lang === "mr" ? "font-marathi" : "";

  const [gridRef, gridVisible] = useReveal();

  const cards = t("why", "cards") || [];

  return (
    <Section tone="light" spacing="lg" data-testid="why-choose" className="overflow-hidden !pb-12">
      {/* Centered header: dashed eyebrow, heading with leaf accent, sprig, lede */}
      <div className="mx-auto mb-12 max-w-[720px] text-center">
        <div className="mb-4 flex items-center justify-center gap-3">
          <span className="h-px w-8 bg-brand-green/50" />
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-brand-green">
            {t("why", "eyebrow")}
          </span>
          <span className="h-px w-8 bg-brand-green/50" />
        </div>

        <AnimatedHeading
          as="h2"
          variant="blur-reveal"
          className={cn(
            "text-4xl font-extrabold leading-tight tracking-tight text-brand-ink sm:text-5xl",
            mr
          )}
        >
          {highlight(t("why", "heading"), t("why", "highlight"))}
          <Leaf className="ml-2 inline-block h-7 w-7 -rotate-12 align-middle text-brand-green" strokeWidth={1.75} />
        </AnimatedHeading>

        <div className="mt-4 flex justify-center" aria-hidden="true">
          <Sprout className="h-5 w-5 text-brand-green/50" strokeWidth={1.75} />
        </div>

        <p className={cn("mx-auto mt-5 max-w-[620px] text-base leading-relaxed text-brand-muted", mr)}>
          {t("why", "sub")}
        </p>
      </div>

      {/*
        Composition: 4x2 card grid on the left. A tall agriculture panel with a
        curved top-left edge sits on the right and the last card column floats
        over it, exactly like the reference.
      */}
      <div className="relative lg:pr-[30%]">
        {/* Desktop tall image panel (behind the grid) */}
        <div className="absolute right-0 top-0 z-0 hidden h-full w-[34%] overflow-hidden rounded-[28px] rounded-tl-[110px] shadow-soft lg:block">
          <img
            src={WHY_IMAGE}
            alt="Healthy green crops thriving in a well-managed field"
            loading="lazy"
            decoding="async"
            className="h-full w-full object-cover object-center"
          />
        </div>

        {/* Mobile / tablet image */}
        <div className="mb-6 overflow-hidden rounded-hero shadow-soft lg:hidden">
          <img
            src={WHY_IMAGE}
            alt="Healthy green crops thriving in a well-managed field"
            loading="lazy"
            decoding="async"
            className="h-56 w-full object-cover object-center sm:h-72"
          />
        </div>

        {/* Card grid */}
        <div ref={gridRef} className="relative z-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {cards.map((card, i) => {
            const Icon = CARD_ICONS[i] || ShieldCheck;
            return (
              <article
                key={card.title}
                className={cn(
                  "group flex flex-col items-center rounded-2xl border border-black/[0.06] bg-white p-5 text-center shadow-[0_2px_12px_rgba(16,40,24,0.05)] transition-all duration-300 hover:-translate-y-1.5 hover:shadow-glass motion-reduce:transition-none",
                  revealClasses("fade-up", gridVisible)
                )}
                style={{ transitionDelay: `${i * 60}ms` }}
              >
                <span
                  className={cn(
                    "mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-brand-green/10 text-brand-green transition-transform duration-500 ease-standard motion-reduce:transition-none",
                    gridVisible ? "scale-100" : "scale-95"
                  )}
                >
                  <Icon className="h-6 w-6" strokeWidth={1.6} />
                </span>
                <h3 className={cn("font-heading text-base font-bold text-brand-ink", mr)}>{card.title}</h3>
                <span className="mt-2 h-0.5 w-6 rounded-full bg-brand-green/70" aria-hidden="true" />
                <p className={cn("mt-3 text-sm leading-relaxed text-brand-muted", mr)}>{card.desc}</p>
              </article>
            );
          })}
        </div>
      </div>
    </Section>
  );
}
