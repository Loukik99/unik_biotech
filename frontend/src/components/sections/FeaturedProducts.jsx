import { Link } from "react-router-dom";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { useLang } from "@/context/LanguageContext";
import { Button } from "@/components/ui/button";
import Section from "@/components/common/Section";
import { useReveal } from "@/components/hooks/useReveal";
import { revealClasses } from "@/components/animations/transitions";

/**
 * Editorial product showcase modelled on the Behance "VerdaAgro" reference:
 * a left-aligned header over a row of tall, magazine-style category panels
 * with a large crop photograph filling the lower half of each card.
 *
 * Card imagery uses the local editorial crop set in /public/unik. Each card
 * gets a different crop and a different visible crop of the image so the row
 * never reads like a grid of identical feature cards.
 */
const CARDS = [
  {
    key: "biofertilizer",
    num: "01",
    href: "/products",
    image: "/unik/paddy-transplanting-1024.webp",
    imgHeight: "h-[54%]",
    objectPos: "object-center",
    highlight: true,
  },
  {
    key: "biostimulant",
    num: "02",
    href: "/products",
    image: "/unik/wheat-golden-1024.webp",
    imgHeight: "h-[50%]",
    objectPos: "object-bottom",
  },
  {
    key: "protection",
    num: "03",
    href: "/products",
    image: "/unik/rice-spraying-1024.webp",
    imgHeight: "h-[58%]",
    objectPos: "object-center",
  },
  {
    key: "micronutrient",
    num: "04",
    href: "/products",
    image: "/unik/rice-macro-1024.webp",
    imgHeight: "h-[52%]",
    objectPos: "object-top",
  },
];

export default function FeaturedProducts() {
  const { t, lang } = useLang();
  const mr = lang === "mr" ? "font-marathi" : "";
  const [revealRef, revealed] = useReveal();

  const titles = t("home", "featuredCards");

  return (
    <Section
      tone="light"
      spacing="lg"
      data-testid="featured-products"
      className="bg-white"
    >
      <div ref={revealRef}>
        {/* Header — left aligned, editorial whitespace */}
        <div
          className={cn("max-w-3xl", revealClasses("fade-up", revealed))}
        >
          <span className="inline-flex items-center rounded-full border border-black/10 px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.22em] text-brand-green">
            {t("home", "featuredLabel")}
          </span>
          <h2
            className={cn(
              "mt-6 max-w-2xl font-heading text-4xl font-extrabold leading-[1.08] tracking-tight text-brand-ink sm:text-5xl",
              mr
            )}
          >
            {t("home", "featuredTitle")}
          </h2>
          <p
            className={cn(
              "mt-5 max-w-xl text-base leading-relaxed text-brand-muted sm:text-lg",
              mr
            )}
          >
            {t("home", "featuredSub")}
          </p>
        </div>

        {/* Cards */}
        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {CARDS.map((card, i) => (
            <div
              key={card.key}
              className={revealClasses("fade-up", revealed)}
              style={{ transitionDelay: `${120 + i * 90}ms` }}
            >
              <Link
                to={card.href}
                aria-label={titles?.[i]}
                className={cn(
                  "group relative flex min-h-[380px] flex-col overflow-hidden rounded-[26px] border p-6 transition-[transform,border-color] duration-350 ease-out",
                  "hover:-translate-y-2 motion-reduce:transform-none motion-reduce:transition-none",
                  card.highlight
                    ? "border-[#E7D588] bg-[#F5E8A8]"
                    : "border-black/[0.08] bg-white",
                  "hover:border-[#7d8b3a]"
                )}
              >
                {/* Number */}
                <span className="text-sm font-semibold tracking-wide text-brand-ink/40">
                  {card.num}
                </span>

                {/* Title */}
                <h3
                  className={cn(
                    "mt-3 max-w-[90%] font-heading text-xl font-bold leading-snug text-brand-ink",
                    mr
                  )}
                >
                  {titles?.[i]}
                </h3>

                {/* Arrow (lower-left of the content area, above the image) */}
                <span className="mt-5 inline-flex h-9 w-9 items-center justify-center rounded-full border border-black/10 bg-white/70 text-brand-ink transition-colors duration-350 ease-out group-hover:border-[#7d8b3a] group-hover:bg-[#7d8b3a] group-hover:text-white">
                  <ArrowUpRight className="h-4 w-4" strokeWidth={2} aria-hidden="true" />
                </span>

                {/* Crop image — fills the lower half, bleeds to the card edges */}
                <div
                  className={cn(
                    "pointer-events-none absolute inset-x-0 bottom-0 overflow-hidden",
                    card.imgHeight
                  )}
                >
                  <img
                    src={card.image}
                    alt=""
                    loading="lazy"
                    decoding="async"
                    className={cn(
                      "h-full w-full object-cover transition-transform duration-350 ease-out group-hover:scale-105 motion-reduce:transform-none motion-reduce:transition-none",
                      card.objectPos
                    )}
                  />
                </div>
              </Link>
            </div>
          ))}
        </div>

        {/* Bottom row — centered note with an aligned CTA on the right */}
        <div
          className={cn(
            "mt-14 flex flex-col items-center gap-6 border-t border-black/[0.08] pt-8 sm:flex-row sm:justify-between",
            revealClasses("fade-up", revealed)
          )}
          style={{ transitionDelay: "220ms" }}
        >
          <span aria-hidden="true" className="hidden sm:block sm:w-52" />
          <p
            className={cn(
              "text-center text-sm font-medium text-brand-muted sm:text-base",
              mr
            )}
          >
            {t("home", "featuredNote")}
          </p>
          <div className="flex sm:w-52 sm:justify-end">
            <Button asChild variant="primary" size="lg" data-testid="products-cta">
              <Link to="/products">
                <span>{t("home", "featuredExploreAll")}</span>
                <span className="ml-1 inline-flex h-6 w-6 items-center justify-center rounded-full bg-white/20">
                  <ArrowRight className="btn-arrow h-3.5 w-3.5" aria-hidden="true" />
                </span>
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </Section>
  );
}
