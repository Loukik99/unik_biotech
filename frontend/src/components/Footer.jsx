import { Link } from "react-router-dom";
import { Globe, Instagram, Linkedin, Mail, MapPin, Phone } from "lucide-react";
import { cn } from "@/lib/utils";
import { useLang } from "@/context/LanguageContext";
import { Reveal, RevealItem } from "@/components/animations/Reveal";

const BASE = "/unik/tea-harvest-path";
const CONTACT_EMAIL = "Sales@unikbiotechresearch.com";
const CONTACT_PHONE_DISPLAY = "+91 7666272741";
const CONTACT_PHONE_TEL = "+917666272741";
const CONTACT_WEBSITE_DISPLAY = "www.unikbiotechresearch.com";
const CONTACT_WEBSITE_URL = "https://unikbiotechresearch.com";

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
          className="relative z-10 mx-auto grid w-full max-w-[1400px] gap-10 rounded-[32px] border border-white/15 bg-white/[0.08] p-5 sm:p-8 sm:w-[90%] md:p-10 lg:w-[85%] lg:grid-cols-3 lg:gap-8 lg:p-14 shadow-[0_40px_100px_-30px_rgba(0,0,0,0.75)] backdrop-blur-[18px]"
        >
          {/* Column 1 — brand */}
          <RevealItem>
            <img
              src="/official-logo.png"
              alt={t("nav", "logoAlt")}
              className="h-16 w-auto object-contain object-center sm:h-20 md:h-24"
            />
            <p className={cn("mt-6 max-w-sm text-[15px] leading-7 text-white/75 break-words", mr)}>
              {t("footer", "desc")}
            </p>
            <div
              className={cn(
                "mt-8 inline-flex items-center rounded-full border border-white/40 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-white/80",
                mr
              )}
            >
              {t("hero", "badge")}
            </div>
          </RevealItem>

          {/* Column 2 — quick links */}
          <RevealItem>
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

          {/* Column 3 — address */}
          <RevealItem>
            <p className={cn("text-xs font-semibold uppercase tracking-[0.2em] text-white/50", mr)}>
              {t("footer", "address")}
            </p>
            <div className="mt-6 space-y-3">
              <div className="flex items-start gap-3 text-[15px] text-white/80">
                <MapPin
                  className="mt-1 h-4 w-4 shrink-0 text-white/50"
                  strokeWidth={1.75}
                  aria-hidden="true"
                />
                <span className="leading-7">{t("footer", "companyAddress")}</span>
              </div>
              <a
                href={`tel:${CONTACT_PHONE_TEL}`}
                className="group/contact flex items-center gap-3 text-[15px] text-white/80 transition-colors hover:text-white"
              >
                <Phone
                  className="h-4 w-4 shrink-0 text-white/50 transition-[color,transform] duration-300 ease-out group-hover/contact:scale-110 group-hover/contact:text-white"
                  strokeWidth={1.75}
                />
                {CONTACT_PHONE_DISPLAY}
              </a>
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className="group/contact flex items-start gap-3 text-[15px] text-white/80 transition-colors hover:text-white break-all"
              >
                <Mail
                  className="mt-1 h-4 w-4 shrink-0 text-white/50 transition-[color,transform] duration-300 ease-out group-hover/contact:scale-110 group-hover/contact:text-white"
                  strokeWidth={1.75}
                />
                <span>{CONTACT_EMAIL}</span>
              </a>
              <a
                href={CONTACT_WEBSITE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="group/contact flex items-center gap-3 text-[15px] text-white/80 transition-colors hover:text-white break-all"
              >
                <Globe
                  className="h-4 w-4 shrink-0 text-white/50 transition-[color,transform] duration-300 ease-out group-hover/contact:scale-110 group-hover/contact:text-white"
                  strokeWidth={1.75}
                />
                {CONTACT_WEBSITE_DISPLAY}
              </a>
            </div>
            {/* Social icons — brand colors */}
            <div className="mt-4 flex items-center gap-4">
              <a
                href="https://www.instagram.com/unikbiotechresearch?igsh=Z2F2MndoNzEyNThl&utm_source=qr"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="transition-transform duration-300 ease-out hover:scale-110"
                style={{ color: "#E1306C" }}
              >
                <Instagram className="h-5 w-5" strokeWidth={1.75} />
              </a>
              <a
                href="https://www.linkedin.com/in/vilas-damre-05488937?utm_source=share_via&utm_content=profile&utm_medium=member_ios"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="transition-transform duration-300 ease-out hover:scale-110"
                style={{ color: "#0A66C2" }}
              >
                <Linkedin className="h-5 w-5" strokeWidth={1.75} />
              </a>
              <a
                href="https://wa.me/917666272741"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                className="transition-transform duration-300 ease-out hover:scale-110"
                style={{ color: "#25D366" }}
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5" aria-hidden="true">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
              </a>
            </div>
          </RevealItem>
        </Reveal>

        {/* Bottom bar */}
        <div className="relative z-10 mx-auto mt-10 flex w-full max-w-[1400px] flex-col items-center justify-center gap-3 border-t border-farm-olive/40 pt-6 text-center sm:w-[90%] sm:flex-row sm:items-center sm:justify-between sm:text-left lg:w-[85%]">
          <p className={cn("text-xs text-white/60", mr)}>
            © {year} UNIK BIOTECH RESEARCH. {t("footer", "rights")}
          </p>
          <p className={cn("text-xs text-white/60 sm:text-right", mr)}>
            {t("footer", "estLine")}
          </p>
        </div>
      </div>
    </footer>
  );
}
