import { Link } from "react-router-dom";
import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { useLang } from "@/context/LanguageContext";
import FarmImage from "@/components/landing/FarmImage";
import { SlideReveal } from "@/components/animations/SlideReveal";
import CountUp from "@/components/animations/CountUp";

export default function About() {
  const { t } = useLang();
  const journey = t("footer", "journey");
  const journeyItems = Array.isArray(journey) ? journey : [];

  return (
    <section className="relative w-full overflow-hidden bg-farm-cream pb-24 pt-4 sm:pb-28 lg:pb-36">
      <div className="mx-auto max-w-6xl px-5 sm:px-6">
        <div className="grid gap-12 lg:grid-cols-12 lg:items-stretch lg:gap-14">
          {/* LEFT — About Us content + image */}
          <div className="flex flex-col lg:col-span-7">
            {/* Text + CTA slide in from the left (no shadow here, so the slide
                transform is safe). */}
            <SlideReveal direction="left" className="flex flex-col">
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-farm-oliveDeep">
                About Us
              </p>

              <h2 className="mt-6 font-heading text-[2rem] font-semibold leading-[1.08] tracking-[-0.02em] text-farm-ink sm:text-4xl lg:text-[2.75rem]">
                Growing With Farmers <span className="text-farm-forest">Since 2005</span>
              </h2>

              <p className="mt-7 max-w-xl text-[15px] leading-relaxed text-farm-ink/70 sm:text-base">
                Founded in 2005 in Pimpalgaon Baswant, Nashik, the heart of Maharashtra&rsquo;s grape
                and pomegranate belt, Unik Biotech Research began with a simple mission: to serve
                farmers with quality inputs they can trust.
              </p>

              <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-farm-ink/70 sm:text-base">
                Over two decades, we have grown from a small local manufacturer into an ISO-certified
                company with more than 100 products, proudly serving over 10,000 farmers across India
                through research-driven agricultural solutions.
              </p>

              <div className="mt-9">
                <Link
                  to="/about"
                  className="group inline-flex items-center gap-2 rounded-full bg-farm-forest px-6 py-3.5 text-[14px] font-semibold text-farm-cream transition-all duration-300 hover:-translate-y-0.5 hover:bg-farm-forestDeep"
                >
                  Know More About Our Milestones
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </div>
            </SlideReveal>

            {/* Editorial wide crop — a rounded, overflow-clipped image with a
                shadow. It fades in with opacity only (no transform): translating
                a clipped image + box-shadow at the subpixel level is what caused
                the shadow to flicker on first paint. Opacity keeps it rock-solid. */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className="relative mt-10 lg:mt-12"
            >
              <div className="overflow-hidden rounded-[28px] shadow-[0_24px_60px_-40px_rgba(27,26,22,0.5)]">
                <FarmImage
                  name="aerial-fields"
                  alt="Aerial view of lush Indian paddy fields threaded by a river at sunrise"
                  sizes="(max-width: 1024px) 100vw, 700px"
                  className="block aspect-[4/3] w-full lg:aspect-[16/9]"
                  imgClassName="h-full w-full object-cover"
                  objectPosition="50% 50%"
                />
              </div>
            </motion.div>
          </div>

          {/* RIGHT — Our Journey statistics card, slides in from the right */}
          <SlideReveal direction="right" className="relative lg:col-span-5">
            {/* Soft bloom gives the frosted card something to refract. */}
            <span
              aria-hidden="true"
              className="pointer-events-none absolute -right-4 top-8 -z-0 hidden h-48 w-48 rounded-full bg-farm-forest/15 blur-3xl lg:block"
            />
            {/* Hover lifts the card 4px with a smooth shadow transition. The lift
                lives on this inner element (not the entrance wrapper) so the two
                transforms never fight. */}
            <div className="relative flex h-full w-full flex-col rounded-[28px] border border-white/15 bg-farm-forest/95 p-8 shadow-glass transition-[transform,box-shadow] duration-300 ease-out hover:-translate-y-1 hover:shadow-[0_30px_70px_-28px_rgba(10,38,18,0.7)] sm:p-10">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-white/50">
                {t("footer", "journeyTitle")}
              </p>

              <div className="mt-4 flex flex-1 flex-col justify-center">
                {journeyItems.map((item, i) => (
                  <div
                    key={item.label}
                    className={cn(
                      "flex items-baseline gap-3 py-5",
                      i !== 0 && "border-t border-white/10"
                    )}
                  >
                    <CountUp
                      value={item.value}
                      className="shrink-0 text-2xl font-bold tracking-tight text-white sm:text-3xl"
                    />
                    <span className="text-sm text-white/60">{item.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </SlideReveal>
        </div>
      </div>
    </section>
  );
}
