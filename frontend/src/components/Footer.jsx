import { Link } from "react-router-dom";
import { ArrowRight, Mail, Phone } from "lucide-react";
import { cn } from "@/lib/utils";
import { useLang } from "@/context/LanguageContext";
import { Reveal, RevealItem } from "@/components/animations/Reveal";

const BASE = "/unik/tea-harvest-path";
const CONTACT_EMAIL = "Sales@unikbiotechresearch.com";
const CONTACT_PHONE_DISPLAY = "+91 7666272741";
const CONTACT_PHONE_TEL = "+917666272741";

/** Quick link with a smooth left-to-right underline animation on hover. */
function QuickLink({ to, children, mr }) {
  return (
    <Link
      to={to}
      className={cn(
        "group/link relative inline-block py-1 text-[15px] text-white/75 transition-[color,transform] duration-300 ease-out hover:translate-x-1 hover:text-white",
        mr
      )}
    >
      {children}
      <span
        aria-hidden="true"
        className="absolute -bottom-0.5 left-0 h-px w-full origin-left scale-x-0 bg-white/80 transition-transform duration-300 ease-out group-hover/link:scale-x-100"
      />
    </Link>
  );
}

export default function Footer() {
  const { t, lang } = useLang();
  const mr = lang === "mr" ? "font-marathi" : "";
  const year = new Date().getFullYear();

  const quickLinks = [
    { to: "/", label: t("nav", "home") },
    { to: "/about", label: t("nav", "about") },
    { to: "/products", label: t("nav", "products") },
    { to: "/dealer-locator", label: t("nav", "dealerLocator") },
    { to: "/contact", label: t("nav", "contact") },
  ];

  return (
    <footer className="relative isolate flex min-h-[520px] w-full flex-col overflow-hidden overflow-x-hidden text-white lg:min-h-[600px]">
      {/* Background — full-bleed tea plantation with a slow Ken Burns drift */}
      <img
        src={`${BASE}-1600.webp`}
        srcSet={`${BASE}-1024.webp 1024w, ${BASE}-1600.webp 1600w, ${BASE}-2000.webp 2000w, ${BASE}-2560.webp 2560w`}
        sizes="100vw"
        alt=""
        aria-hidden="true"
        className="absolute inset-0 h-full w-full origin-center animate-ken-burns object-cover motion-reduce:animate-none"
      />
      {/* Dark overlay for readability */}
      <div aria-hidden="true" className="absolute inset-0 bg-black/[0.62]" />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/25 to-black/40"
      />

      {/* Foreground */}
      <div className="relative z-10 flex flex-1 flex-col justify-end px-4 pb-10 pt-16 sm:px-6 lg:px-8">
        {/* Glass panel — columns reveal with a subtle stagger */}
        <Reveal
          className="relative z-10 mx-auto grid w-full max-w-[1400px] gap-10 rounded-[32px] border border-white/15 bg-white/[0.08] p-5 sm:p-8 sm:w-[90%] md:p-10 lg:w-[85%] lg:grid-cols-12 lg:gap-8 lg:p-14 shadow-[0_40px_100px_-30px_rgba(0,0,0,0.75)] backdrop-blur-[18px]"
        >
            {/* LEFT — brand + contact */}
            <RevealItem className="lg:col-span-7 lg:pr-8">
              <img
                src="/official-logo.png"
                alt="Unik Biotech Research Logo"
                className="h-16 w-auto object-contain object-center sm:h-20 md:h-24"
              />
              <p className={cn("mt-6 max-w-sm text-[15px] leading-7 text-white/75 break-words", mr)}>
                {t("footer", "desc")}
              </p>

              <div className="mt-8 space-y-3">
                <p className={cn("text-xs font-semibold uppercase tracking-[0.2em] text-white/50", mr)}>
                  {t("nav", "contact")}
                </p>
                <a
                  href={`mailto:${CONTACT_EMAIL}`}
                  className="group/contact flex items-start gap-3 text-[15px] text-white/80 transition-colors hover:text-white break-all"
                >
                  <Mail className="h-4 w-4 text-white/50 transition-[color,transform] duration-300 ease-out group-hover/contact:scale-110 group-hover/contact:text-white mt-1 shrink-0" strokeWidth={1.75} />
                  <span>{CONTACT_EMAIL}</span>
                </a>
                <a
                  href={`tel:${CONTACT_PHONE_TEL}`}
                  className="group/contact flex items-center gap-3 text-[15px] text-white/80 transition-colors hover:text-white"
                >
                  <Phone className="h-4 w-4 text-white/50 transition-[color,transform] duration-300 ease-out group-hover/contact:scale-110 group-hover/contact:text-white shrink-0" strokeWidth={1.75} />
                  {CONTACT_PHONE_DISPLAY}
                </a>
              </div>

              <Link
                to="/contact"
                className={cn(
                  "group/btn mt-8 inline-flex w-full items-center justify-center gap-2 rounded-full border border-white/40 px-6 py-3 text-sm font-semibold text-white transition-all duration-300 ease-out hover:-translate-y-0.5 hover:border-white hover:bg-white hover:text-brand-green motion-reduce:transform-none sm:w-auto",
                  mr
                )}
              >
                <span>{t("footer", "contactBtn")}</span>
                <ArrowRight
                  className="h-4 w-4 transition-transform duration-300 ease-out group-hover/btn:translate-x-1"
                  strokeWidth={2}
                  aria-hidden="true"
                />
              </Link>
            </RevealItem>

            {/* RIGHT — quick links */}
            <RevealItem className="lg:col-span-5">
              <p className={cn("text-xs font-semibold uppercase tracking-[0.2em] text-white/50", mr)}>
                {t("footer", "quickLinks")}
              </p>
              <nav className="mt-6 flex flex-col items-start gap-3">
                {quickLinks.map((l) => (
                  <QuickLink key={l.to} to={l.to} mr={mr}>
                    {l.label}
                  </QuickLink>
                ))}
              </nav>
            </RevealItem>
          </Reveal>

        {/* Bottom bar */}
        <div className="relative z-10 mx-auto mt-10 flex w-full max-w-[1400px] flex-col items-center gap-3 border-t border-farm-olive/40 pt-6 text-center sm:w-[90%] sm:flex-row sm:justify-center sm:text-left lg:w-[85%]">
          <p className={cn("text-xs text-white/60", mr)}>
            © {year} Unik Biotech Research. {t("footer", "rights")}
          </p>
        </div>
      </div>
    </footer>
  );
}
