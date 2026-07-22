import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, ChevronDown, Phone } from "lucide-react";
import { useLang } from "@/context/LanguageContext";

const LANGUAGES = [
  { code: "en", label: "English" },
  { code: "hi", label: "हिंदी" },
  { code: "mr", label: "मराठी" },
];

export default function Navbar() {
  const { lang, setLang, t } = useLang();
  const [open, setOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const langRef = useRef(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => { setOpen(false); setLangOpen(false); }, [location]);

  // Close language menu on outside click or Escape
  useEffect(() => {
    const onClick = (e) => { if (langRef.current && !langRef.current.contains(e.target)) setLangOpen(false); };
    const onKey = (e) => { if (e.key === "Escape") { setLangOpen(false); setOpen(false); } };
    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onKey);
    return () => { document.removeEventListener("mousedown", onClick); document.removeEventListener("keydown", onKey); };
  }, []);

  // Prevent body scroll when the mobile menu is open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  const navLinks = [
    { to: "/", label: t("nav", "home") },
    { to: "/about", label: t("nav", "about") },
    { to: "/products", label: t("nav", "products") },
    { to: "/dealer-locator", label: t("nav", "dealerLocator") },
    { to: "/contact", label: t("nav", "contact") },
  ];

  const isActive = (path) => location.pathname === path;
  // One shared navbar for every page: the premium transparent glass pill at the
  // top, transitioning to the light glass bar on scroll — identical everywhere
  // (no per-page variation).
  const isScrolled = scrolled;
  const currentLangLabel = LANGUAGES.find((l) => l.code === lang)?.label || "English";

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? "glass-nav shadow-md shadow-green-900/5 border-b border-gray-100/80" : "bg-transparent pt-3 sm:pt-4"}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`flex items-center justify-between transition-all duration-300 ${isScrolled ? "h-16" : "h-16 rounded-full border border-white/10 bg-brand-bgDark/50 px-4 shadow-lg shadow-black/25 backdrop-blur-xl sm:px-6"}`}>
          {/* Logo */}
          <Link to="/" className="flex h-12 items-center gap-1 group shrink-0 max-w-[220px]" data-testid="navbar-logo">
            <img
              src="/logo2.png"
              alt={t("nav", "logoAlt")}
              className={`h-full w-auto shrink-0 object-contain object-center transition-all duration-300 group-hover:scale-105 ${isScrolled ? "max-h-10 sm:max-h-11" : "max-h-11 sm:max-h-12"}`}
            />
            <div className="flex min-w-0 flex-col justify-center leading-none">
              <span
                className={`whitespace-nowrap text-xs font-semibold transition-colors duration-300 sm:text-[13px] ${isScrolled ? "text-gray-800" : "text-white"}`}
              >
                Unik Biotech
              </span>
              <span
                className={`whitespace-nowrap text-[10px] font-normal transition-colors duration-300 sm:text-[11px] ${isScrolled ? "text-gray-500" : "text-white/65"}`}
              >
                Research
              </span>
            </div>
          </Link>

          {/* Desktop nav */}
          <div className="hidden lg:flex items-center gap-1 mx-auto">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                data-testid={`nav-${link.to.replace("/", "") || "home"}`}
                className={`relative px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 group ${isActive(link.to)
                  ? "bg-green-800 text-white shadow-md shadow-green-900/20"
                  : isScrolled
                    ? "text-gray-700 hover:bg-green-50 hover:text-green-800"
                    : "text-white/90 hover:bg-white/15 hover:text-white"
                  }`}
              >
                {link.label}
                {!isActive(link.to) && (
                  <span className={`absolute left-4 right-4 -bottom-0.5 h-0.5 rounded-full origin-center scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ${isScrolled ? "bg-green-700" : "bg-amber-400"}`}></span>
                )}
              </Link>
            ))}
          </div>

          {/* Right side: language + CTA + mobile menu */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            {/* Language toggle */}
            <div className="relative" ref={langRef}>
              <button
                onClick={() => setLangOpen(!langOpen)}
                data-testid="lang-toggle"
                aria-haspopup="true"
                aria-expanded={langOpen}
                aria-label={t("nav", "changeLanguage")}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-sm font-semibold transition-all duration-200 ${isScrolled
                  ? "border-gray-200 text-green-800 hover:border-green-800 hover:bg-green-50"
                  : "border-white/60 text-white hover:bg-white/15"
                  }`}
              >
                <span>{currentLangLabel}</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${langOpen ? "rotate-180" : ""}`} />
              </button>

              {langOpen && (
                <div className="absolute top-full right-0 mt-2 w-36 bg-white rounded-2xl shadow-xl shadow-green-900/10 border border-gray-100 py-2 animate-fadeIn z-50">
                  {LANGUAGES.map((l) => (
                    <button
                      key={l.code}
                      onClick={() => { setLang(l.code); setLangOpen(false); }}
                      className={`flex items-center justify-between w-full text-left px-4 py-2 text-sm transition-colors ${lang === l.code ? "bg-green-50 text-green-800 font-bold" : "text-gray-700 hover:bg-gray-50 hover:text-green-800"}`}
                    >
                      {l.label}
                      {lang === l.code && <span className="w-1.5 h-1.5 rounded-full bg-green-600"></span>}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Call CTA (desktop) */}
            <a
              href="tel:+917666272741"
              data-testid="navbar-cta"
              className={`hidden md:inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-200 hover:scale-105 ${isScrolled
                ? "bg-green-800 text-white hover:bg-green-700 shadow-md shadow-green-900/20"
                : "bg-brand-green text-white hover:bg-brand-greenDark shadow-lg shadow-black/25"
                }`}
            >
              <Phone className="w-4 h-4" />
              <span className="hidden lg:inline">+91 7666272741</span>
              <span className="lg:hidden">{t("nav", "contact")}</span>
            </a>

            {/* Mobile menu button */}
            <button
              onClick={() => setOpen(!open)}
              className={`lg:hidden p-2 rounded-xl transition-colors ${isScrolled ? "text-gray-700 hover:bg-gray-100" : "text-white hover:bg-white/15"}`}
              data-testid="mobile-menu-btn"
              aria-label={open ? t("nav", "closeMenu") : t("nav", "openMenu")}
              aria-expanded={open}
            >
              {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={`lg:hidden overflow-hidden transition-all duration-300 ease-out glass-nav border-t border-gray-100 ${open ? "max-h-[32rem] opacity-100" : "max-h-0 opacity-0"}`}
      >
        <div className="px-4 py-4 space-y-1">
          {navLinks.map((link, i) => (
            <Link
              key={link.to}
              to={link.to}
              data-testid={`mobile-nav-${link.to.replace("/", "") || "home"}`}
              style={{ transitionDelay: open ? `${i * 40}ms` : "0ms" }}
              className={`block px-4 py-3 rounded-xl text-base font-medium transition-all duration-300 ${open ? "translate-x-0 opacity-100" : "-translate-x-2 opacity-0"} ${isActive(link.to)
                ? "bg-green-800 text-white shadow-sm"
                : "text-gray-700 hover:bg-green-50 hover:text-green-800"
                }`}
            >
              {link.label}
            </Link>
          ))}
          <a
            href="tel:+917666272741"
            className="flex items-center justify-center gap-2 mt-3 px-4 py-3.5 rounded-xl bg-green-800 text-white font-semibold hover:bg-green-700 transition-colors"
          >
            <Phone className="w-4 h-4" />
            +91 7666272741
          </a>
        </div>
      </div>
    </nav>
  );
}
