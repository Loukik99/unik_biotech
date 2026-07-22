import { Link } from "react-router-dom";
import { ArrowRight, Handshake, ShieldCheck, Sprout, UsersRound } from "lucide-react";
import { SlideReveal } from "@/components/animations/SlideReveal";
import { useLang } from "@/context/LanguageContext";

const FEATURE_ICONS = [Handshake, UsersRound, ShieldCheck, Sprout];

function FeatureItem({ feature, isLast, ctaLabel, mr }) {
  const Icon = feature.icon;

  return (
    <div className={isLast ? "flex flex-col gap-5 py-5" : "flex gap-5 border-b border-farm-ink/10 py-5"}>
      <div className="flex gap-5">
        <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-farm-forest/10 text-farm-forest sm:h-14 sm:w-14">
          <Icon className="h-5 w-5" strokeWidth={1.8} aria-hidden="true" />
        </span>
        <div className="min-w-0 pt-0.5">
          <h3 className={`font-heading text-base font-semibold text-farm-forest ${mr}`}>
            {feature.title}
          </h3>
          <p className={`mt-1.5 max-w-sm text-[14px] leading-relaxed text-farm-ink/65 ${mr}`}>
            {feature.text}
          </p>
        </div>
      </div>
      {isLast && (
        <Link
          to="/dealer-locator"
          className={`group mt-1 inline-flex w-fit items-center gap-2 self-start rounded-full bg-farm-forest px-7 py-3.5 text-sm font-semibold text-farm-cream shadow-lg shadow-farm-forest/25 transition-all duration-300 hover:-translate-y-0.5 hover:bg-farm-forestDeep ${mr}`}
        >
          {ctaLabel}
          <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
        </Link>
      )}
    </div>
  );
}

function IndiaMap({ ariaLabel }) {
  // Embedded as an <object> (not <img>) so the SVG stays interactive: each pin
  // reveals its label and animates on hover. Rendering is visually identical.
  return (
    <object
      type="image/svg+xml"
      data="/india-network-map.svg"
      aria-label={ariaLabel}
      className="relative z-10 block h-auto w-full max-w-[520px] sm:max-w-[560px]"
      style={{ aspectRatio: "620 / 720" }}
    >
      {ariaLabel}
    </object>
  );
}

export default function PanIndiaNetwork() {
  const { t, lang } = useLang();
  const mr = lang === "mr" ? "font-marathi" : "";
  const networkFeatures = t("landing", "networkFeatures");
  const features = Array.isArray(networkFeatures)
    ? networkFeatures.map((f, i) => ({ ...f, icon: FEATURE_ICONS[i] }))
    : [];

  return (
    <section className="relative w-full overflow-hidden bg-white py-24 sm:py-28 lg:py-32">
      <div className="mx-auto max-w-6xl px-5 sm:px-6">
        <div className="grid gap-14 lg:grid-cols-12 lg:items-center lg:gap-10">
          <div className="lg:col-span-5 lg:pr-6">
            <SlideReveal direction="left">
              <p className={`text-xs font-semibold uppercase tracking-[0.28em] text-farm-oliveDeep ${mr}`}>
                {t("landing", "networkEyebrow")}
              </p>

              <h2 className={`mt-6 font-heading text-[2.25rem] font-semibold leading-[1.05] tracking-[-0.02em] text-farm-ink sm:text-5xl lg:text-[3.25rem] ${mr}`}>
                {t("landing", "networkHeading")}
                <br />
                <span className="text-farm-forest">{t("landing", "networkHighlight")}</span>
              </h2>

              <p className={`mt-7 max-w-md text-[15px] leading-relaxed text-farm-ink/70 sm:text-base ${mr}`}>
                {t("landing", "networkSub")}
              </p>
            </SlideReveal>

            {/* Feature list — each row alternates its entrance direction */}
            <div className="mt-9 max-w-md">
              {features.map((feature, index) => (
                <SlideReveal
                  key={feature.title}
                  direction={index % 2 === 0 ? "left" : "right"}
                >
                  <FeatureItem
                    feature={feature}
                    isLast={index === features.length - 1}
                    ctaLabel={t("landing", "networkCta")}
                    mr={mr}
                  />
                </SlideReveal>
              ))}
            </div>
          </div>

          <SlideReveal direction="right" className="lg:col-span-7">
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
                <IndiaMap ariaLabel={t("landing", "networkMapAria")} />
              </div>
            </div>
          </SlideReveal>
        </div>
      </div>
    </section>
  );
}
