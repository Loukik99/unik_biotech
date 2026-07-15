import { Phone } from "lucide-react";
import { SlideReveal } from "@/components/animations/SlideReveal";

const PHONE_DISPLAY = "+91 7666272741";
const PHONE_TEL = "+917666272741";
const WHATSAPP = "https://wa.me/917666272741";

/** Official WhatsApp glyph (lucide has no brand icon). */
function WhatsAppIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51l-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.71.306 1.263.489 1.694.625.712.227 1.36.195 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
    </svg>
  );
}

// A premium closing CTA that bridges the light testimonial section and the
// dark footer. It reuses the site's frosted-glass panel language (see Footer)
// on the deep-forest palette so it feels native to the rest of the homepage.
export default function CallToAction() {
  return (
    <section className="relative w-full overflow-hidden bg-farm-forestDeep py-24 sm:py-28 lg:py-32">
      {/* Soft colour blooms give the frosted panel something to refract. */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -left-24 top-1/4 h-72 w-72 rounded-full bg-farm-moss/40 blur-3xl"
      />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -right-16 bottom-0 h-80 w-80 rounded-full bg-farm-gold/15 blur-3xl"
      />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/3 h-64 w-64 -translate-x-1/2 rounded-full bg-farm-forest/60 blur-3xl"
      />

      <div className="relative mx-auto max-w-4xl px-5 sm:px-6">
        <SlideReveal direction="right" className="relative overflow-hidden rounded-[32px] border border-white/15 bg-white/[0.08] px-8 py-14 text-center shadow-glass backdrop-blur-2xl sm:rounded-[40px] sm:px-12 lg:px-16 lg:py-20">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-farm-gold">
            Grow With Unik Biotech Research
          </p>

          <h2 className="mx-auto mt-6 max-w-2xl font-heading text-[2rem] font-semibold leading-[1.1] tracking-[-0.02em] text-farm-cream sm:text-4xl lg:text-[2.75rem]">
            Ready to grow healthier crops and better yields?
          </h2>

          <p className="mx-auto mt-6 max-w-xl text-[15px] leading-relaxed text-white/75 sm:text-base">
            Partner with our agronomists to find the right inputs for your soil,
            season and crop, backed by trusted quality and dependable on-ground
            support.
          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <a
              href={`tel:${PHONE_TEL}`}
              className="group inline-flex items-center justify-center gap-2 rounded-full bg-farm-gold px-8 py-4 text-[15px] font-semibold text-farm-forestDeep shadow-lg shadow-black/25 transition-[transform,box-shadow,background-color] duration-300 ease-out hover:-translate-y-[3px] hover:scale-[1.02] hover:bg-farm-goldSoft hover:shadow-xl hover:shadow-black/30"
            >
              <Phone className="h-4 w-4 transition-transform duration-300 ease-out group-hover:-rotate-12" aria-hidden="true" />
              {PHONE_DISPLAY}
            </a>

            <a
              href={WHATSAPP}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center justify-center gap-2 rounded-full border border-white/35 bg-white/5 px-8 py-4 text-[15px] font-semibold text-farm-cream backdrop-blur-md transition-[transform,box-shadow,background-color] duration-300 ease-out hover:-translate-y-[3px] hover:scale-[1.02] hover:bg-white/12 hover:shadow-xl hover:shadow-black/20"
            >
              <WhatsAppIcon className="h-5 w-5 transition-transform duration-300 ease-out group-hover:scale-110" />
              Chat on WhatsApp
            </a>
          </div>
        </SlideReveal>
      </div>
    </section>
  );
}
