import { Fragment } from "react";
import { Phone, Leaf, Sprout } from "lucide-react";
import { cn } from "@/lib/utils";
import { useLang } from "@/context/LanguageContext";
import { Button } from "@/components/ui/button";
import Section from "@/components/common/Section";

// Young crop thriving at golden hour — matches the reference composition.
const CTA_IMAGE =
  "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1200&q=80";

const PHONE = "+918380017593";
const WHATSAPP = "https://wa.me/918380017593";

/** Official WhatsApp glyph (lucide has no brand icon). */
function WhatsAppIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51l-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.71.306 1.263.489 1.694.625.712.227 1.36.195 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
    </svg>
  );
}

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

export default function CTASection() {
  const { t, lang } = useLang();
  const mr = lang === "mr" ? "font-marathi" : "";

  return (
    <Section tone="light" spacing="sm" data-testid="cta-section" className="!pt-0">
      <div className="relative overflow-hidden rounded-[36px] bg-gradient-to-br from-[#EEF5EC] to-[#E1EEDF] shadow-soft">
        <div className="grid items-stretch lg:grid-cols-[1.05fr_0.95fr]">
          {/* LEFT: content */}
          <div className="px-8 py-12 sm:px-12 lg:py-16 lg:pl-16 lg:pr-10">
            <div className="mb-5 flex items-center gap-3">
              <span className="h-px w-7 bg-brand-green/50" />
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-brand-green">
                {t("home", "ctaEyebrow")}
              </span>
              <Sprout className="h-4 w-4 text-brand-green/70" strokeWidth={1.75} />
            </div>

            <h2
              className={cn(
                "max-w-[520px] text-4xl font-extrabold leading-[1.1] tracking-tight text-brand-ink sm:text-[2.75rem]",
                mr
              )}
            >
              {highlight(t("home", "ctaHeading"), t("home", "ctaHighlight"))}
              <Leaf className="ml-2 inline-block h-7 w-7 -rotate-12 align-middle text-brand-green" strokeWidth={1.75} />
            </h2>

            <p className={cn("mt-5 max-w-[440px] text-base leading-relaxed text-brand-muted", mr)}>
              {t("home", "ctaText")}
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Button asChild variant="primary" size="xl">
                <a href={`tel:${PHONE}`}>
                  <span className="mr-1 inline-flex h-6 w-6 items-center justify-center rounded-full bg-white/20">
                    <Phone className="h-3.5 w-3.5" />
                  </span>
                  <span>{t("home", "ctaCall")}</span>
                </a>
              </Button>

              <Button
                asChild
                variant="secondary"
                size="xl"
                className="border-brand-green/30 text-brand-green hover:bg-brand-green hover:text-white"
              >
                <a href={WHATSAPP} target="_blank" rel="noopener noreferrer" aria-label="Chat on WhatsApp">
                  <WhatsAppIcon className="h-5 w-5" />
                  <span>{t("home", "ctaWhatsapp")}</span>
                </a>
              </Button>
            </div>
          </div>

          {/* RIGHT: image with a large curved left edge */}
          <div className="relative min-h-[260px] lg:min-h-0">
            <img
              src={CTA_IMAGE}
              alt="Young crop thriving in a sunlit field at golden hour"
              loading="lazy"
              decoding="async"
              className="absolute inset-0 h-full w-full object-cover object-center lg:rounded-l-[120px]"
            />
          </div>
        </div>
      </div>
    </Section>
  );
}
