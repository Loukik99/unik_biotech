import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X, ChevronDown } from "lucide-react";
import { useLang } from "@/context/LanguageContext";

const LANGUAGES = [
  { code: "en", label: "EN" },
  { code: "hi", label: "हि" },
  { code: "mr", label: "मर" },
];

/**
 * Floating glass pill navigation, faithful to the VerdaAgro reference:
 * logo (left) · centered links · language + gold "Get in Touch" pill (right).
 *
 * Over the dark hero it renders as translucent dark glass with cream text;
 * once the page scrolls past the hero it fades into a light cream glass with
 * ink text so it stays legible over the editorial light sections below.
 */
export default function LandingNav() {
  const { lang, setLang, t } = useLang();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const location = useLocation();
  const langRef = useRef(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
    setLangOpen(false);
  }, [location]);

  useEffect(() => {
    const onClick = (e) => {
      if (langRef.current && !langRef.current.contains(e.target)) setLangOpen(false);
    };
    const onKey = (e) => e.key === "Escape" && (setLangOpen(false), setOpen(false));
    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => (document.body.style.overflow = "");
  }, [open]);

  const links = [
    { to: "/", label: t("nav", "home") },
    { to: "/about", label: t("nav", "about") },
    { to: "/products", label: t("nav", "products") },
    { to: "/dealer-locator", label: t("nav", "dealerLocator") },
    { to: "/contact", label: t("nav", "contact") },
  ];

  const isActive = (to) => location.pathname === to;
  const currentLang = LANGUAGES.find((l) => l.code === lang)?.label || "EN";

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-4 pt-3 sm:px-6 sm:pt-5">
      <nav
        className={`mx-auto flex max-w-6xl items-center justify-between rounded-full border pl-4 pr-3 transition-colors duration-500 ${
          scrolled
            ? "border-farm-ink/10 bg-farm-cream/85 py-2 shadow-[0_10px_40px_-16px_rgba(27,26,22,0.35)] backdrop-blur-xl"
            : "border-white/15 bg-black/25 py-2.5 shadow-[0_16px_50px_-20px_rgba(0,0,0,0.6)] backdrop-blur-xl"
        }`}
      >
        {/* Logo — official Unik Biotech lockup. A warm-cream chip keeps the
            dark artwork legible over the hero; it dissolves once the nav turns cream. */}
        <Link to="/" className="group flex shrink-0 items-center" aria-label="Unik Biotech Research — home">
          <span
            className={`flex h-11 items-center rounded-xl transition-all duration-500 ${
              scrolled ? "px-0 py-0" : "bg-farm-cream/95 px-2.5 py-1.5 shadow-sm"
            }`}
          >
            <img
              src="/official-logo.jpg"
              alt="Unik Biotech Logo"
              className="h-full max-h-8 w-auto object-contain object-center sm:max-h-9"
              draggable="false"
            />
          </span>
        </Link>

        {/* Center links */}
        <div className="hidden items-center gap-1 lg:flex">
          {links.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`relative rounded-full px-3.5 py-2 text-[13.5px] font-medium transition-colors duration-300 ${
                scrolled
                  ? isActive(link.to)
                    ? "text-farm-forest"
                    : "text-farm-ink/70 hover:text-farm-forest"
                  : isActive(link.to)
                    ? "text-farm-cream"
                    : "text-farm-cream/75 hover:text-farm-cream"
              }`}
            >
              {link.label}
              {isActive(link.to) && (
                <motion.span
                  layoutId="nav-active"
                  className={`absolute inset-0 -z-10 rounded-full ${scrolled ? "bg-farm-forest/10" : "bg-white/12"}`}
                  transition={{ type: "spring", stiffness: 380, damping: 32 }}
                />
              )}
            </Link>
          ))}
        </div>

        {/* Right cluster */}
        <div className="flex items-center gap-2">
          {/* Language */}
          <div className="relative" ref={langRef}>
            <button
              onClick={() => setLangOpen((v) => !v)}
              aria-haspopup="true"
              aria-expanded={langOpen}
              aria-label="Change language"
              className={`flex items-center gap-1 rounded-full border px-2.5 py-1.5 text-xs font-semibold transition-colors duration-300 ${
                scrolled
                  ? "border-farm-ink/15 text-farm-ink/80 hover:border-farm-forest/40 hover:text-farm-forest"
                  : "border-white/25 text-farm-cream/90 hover:border-white/60"
              }`}
            >
              {currentLang}
              <ChevronDown className={`h-3 w-3 transition-transform duration-200 ${langOpen ? "rotate-180" : ""}`} />
            </button>
            <AnimatePresence>
              {langOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 6, scale: 0.97 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 6, scale: 0.97 }}
                  transition={{ duration: 0.16 }}
                  className="absolute right-0 top-full mt-2 w-28 overflow-hidden rounded-2xl border border-farm-ink/10 bg-farm-cream py-1.5 shadow-xl"
                >
                  {LANGUAGES.map((l) => (
                    <button
                      key={l.code}
                      onClick={() => {
                        setLang(l.code);
                        setLangOpen(false);
                      }}
                      className={`block w-full px-4 py-1.5 text-left text-sm transition-colors ${
                        lang === l.code
                          ? "font-bold text-farm-forest"
                          : "text-farm-ink/70 hover:bg-farm-sand/60 hover:text-farm-forest"
                      }`}
                    >
                      {l.label === "EN" ? "English" : l.code === "hi" ? "हिंदी" : "मराठी"}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            className={`flex h-9 w-9 items-center justify-center rounded-full transition-colors lg:hidden ${
              scrolled ? "text-farm-ink hover:bg-farm-ink/5" : "text-farm-cream hover:bg-white/10"
            }`}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            className="mx-auto mt-2 max-w-6xl overflow-hidden rounded-3xl border border-farm-ink/10 bg-farm-cream/95 p-3 shadow-2xl backdrop-blur-xl lg:hidden"
          >
            {links.map((link, i) => (
              <motion.div
                key={link.to}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.04 * i }}
              >
                <Link
                  to={link.to}
                  className={`block rounded-2xl px-4 py-3 text-[15px] font-medium transition-colors ${
                    isActive(link.to)
                      ? "bg-farm-forest text-farm-cream"
                      : "text-farm-ink/80 hover:bg-farm-sand/60 hover:text-farm-forest"
                  }`}
                >
                  {link.label}
                </Link>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
