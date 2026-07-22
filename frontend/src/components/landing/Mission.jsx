import FarmImage from "@/components/landing/FarmImage";
import { SlideReveal } from "@/components/animations/SlideReveal";
import { useLang } from "@/context/LanguageContext";

export default function Mission() {
  const { t, lang } = useLang();
  const mr = lang === "mr" ? "font-marathi" : "";

  return (
    <section className="relative w-full overflow-hidden bg-farm-cream py-24 sm:py-28 lg:py-36">
      <div className="mx-auto max-w-6xl px-5 sm:px-6">
        <div className="grid items-center gap-14 lg:grid-cols-12 lg:gap-10">
          {/* Text — comfortable reading width, offset to the left */}
          <SlideReveal direction="left" className="lg:col-span-5 lg:pr-6">
            <p className={`text-xs font-semibold uppercase tracking-[0.28em] text-farm-oliveDeep ${mr}`}>
              {t("landing", "missionEyebrow")}
            </p>

            <h2 className={`mt-6 font-heading text-[2rem] font-semibold leading-[1.08] tracking-[-0.02em] text-farm-ink sm:text-4xl lg:text-[2.9rem] ${mr}`}>
              {t("landing", "missionHeadingBefore")}{" "}
              <span className="text-farm-forest">{t("landing", "missionHighlight")}</span>{" "}
              {t("landing", "missionHeadingAfter")}
            </h2>

            <p className={`mt-7 max-w-md text-[15px] leading-relaxed text-farm-ink/70 sm:text-base ${mr}`}>
              {t("landing", "missionText")}
            </p>
          </SlideReveal>

          {/* Image — fades in while sliding from the right, balancing the
              left-entering text for a two-column reveal. Safe to transform: this
              image has no shadow, so there's nothing to flicker. */}
          <SlideReveal direction="right" className="lg:col-span-6 lg:col-start-7">
            <div className="relative">
              <div className="overflow-hidden rounded-[26px]">
                <FarmImage
                  name="sugarcane-harvesting"
                  alt="Sugarcane harvesting in an Indian agricultural field"
                  sizes="(max-width: 1024px) 100vw, 640px"
                  className="block aspect-[4/5] w-full sm:aspect-[3/2] lg:aspect-[4/5]"
                  imgClassName="h-full w-full object-cover"
                  objectPosition="35% 50%"
                />
              </div>
            </div>
          </SlideReveal>
        </div>
      </div>
    </section>
  );
}
