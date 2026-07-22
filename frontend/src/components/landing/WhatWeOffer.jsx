import { Link } from "react-router-dom";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { SlideReveal } from "@/components/animations/SlideReveal";
import { useLang } from "@/context/LanguageContext";

const PRODUCT_META = [
  { no: "01", image: "/products/aminorich.png" },
  { no: "02", image: "/products/excess.png" },
  { no: "03", image: "/products/unisearich.png" },
];

export default function WhatWeOffer() {
  const { t, lang } = useLang();
  const mr = lang === "mr" ? "font-marathi" : "";
  const offerProducts = t("landing", "offerProducts");
  const products = Array.isArray(offerProducts)
    ? offerProducts.map((p, i) => ({ ...PRODUCT_META[i], ...p }))
    : [];

  return (
    <section className="relative w-full overflow-hidden bg-farm-cream py-24 sm:py-28 lg:py-32">
      <div className="mx-auto max-w-6xl px-5 sm:px-6">
        {/* Header — heading left, description right (editorial) */}
        <SlideReveal
          direction="left"
          className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between"
        >
          <div>
            <p className={`text-xs font-semibold uppercase tracking-[0.28em] text-farm-oliveDeep ${mr}`}>
              {t("landing", "offerEyebrow")}
            </p>
            <h2 className={`mt-5 font-heading text-[2.1rem] font-semibold leading-[1.05] tracking-[-0.02em] text-farm-ink sm:text-5xl lg:text-[3.25rem] ${mr}`}>
              {t("landing", "offerHeadingBefore")}{" "}
              <span className="text-farm-forest">{t("landing", "offerHighlight")}</span>
            </h2>
          </div>
          <p className={`max-w-sm text-[15px] leading-relaxed text-farm-ink/65 ${mr}`}>
            {t("landing", "offerSub")}
          </p>
        </SlideReveal>

        {/* Products — three equal-size editorial cards, each alternating direction */}
        <div className="mt-16 grid grid-cols-1 items-stretch gap-6 sm:grid-cols-2 lg:mt-20 lg:grid-cols-3 lg:gap-8">
          {products.map((p, index) => (
            <SlideReveal
              key={p.name}
              direction={index % 2 === 0 ? "left" : "right"}
              className="h-full"
            >
              <Link
                to="/products"
                className="group flex h-full flex-col rounded-[24px] border border-farm-ink/[0.07] bg-farm-beige/35 p-6 transition-[transform,box-shadow] duration-300 ease-out hover:-translate-y-1.5 hover:shadow-[0_30px_64px_-38px_rgba(27,26,22,0.6)] sm:p-7"
              >
                <div className="flex items-center justify-between">
                  <span className="font-heading text-sm font-semibold text-farm-ink/40">{p.no}</span>
                  <span className="flex h-9 w-9 items-center justify-center rounded-full border border-farm-ink/15 text-farm-forest transition-all duration-300 group-hover:border-farm-forest group-hover:bg-farm-forest group-hover:text-farm-cream">
                    <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </span>
                </div>

                <h3 className="mt-6 font-heading text-xl font-semibold text-farm-ink transition-colors duration-300 group-hover:text-farm-forest">
                  {p.name}
                </h3>
                <p className={`mt-2 text-[14px] leading-snug text-farm-ink/60 ${mr}`}>{p.line}</p>

                {/* Image fills the lower area — product packaging dominates, undistorted */}
                <div className="relative mt-8 aspect-[4/3] w-full flex-1">
                  <img
                    src={p.image}
                    alt={`${p.name} — ${p.category}`}
                    loading="lazy"
                    decoding="async"
                    draggable="false"
                    className="absolute inset-0 h-full w-full object-contain transition-transform duration-300 ease-out group-hover:scale-105"
                  />
                </div>
              </Link>
            </SlideReveal>
          ))}
        </div>

        {/* CTA */}
        <SlideReveal direction="right" className="mt-16 flex justify-center lg:mt-20">
          <Link
            to="/products"
            className={`group inline-flex items-center gap-2 rounded-full bg-farm-forest px-7 py-3.5 text-[14px] font-semibold text-farm-cream transition-all duration-300 hover:-translate-y-0.5 hover:bg-farm-forestDeep ${mr}`}
          >
            {t("landing", "offerCta")}
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </SlideReveal>
      </div>
    </section>
  );
}
