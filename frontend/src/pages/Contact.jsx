import { useState } from "react";
import { motion } from "motion/react";
import {
  MapPin,
  Mail,
  Phone,
  Send,
  User,
  Tag,
  PencilLine,
  Leaf,
  ArrowRight,
  ArrowLeft,
  ExternalLink,
} from "lucide-react";
import { toast } from "sonner";
import { useLang } from "@/context/LanguageContext";
import SEO from "@/components/SEO";
import { SlideReveal } from "@/components/animations/SlideReveal";

// Re-animate whenever an element re-enters the viewport (scroll down or up); the
// 20% threshold keeps large sections from re-triggering/flickering.
const VIEWPORT = { once: false, amount: 0.2 };

// Fade + rise, used for the section title and as the base timing everywhere.
const fadeUp = {
  hidden: { opacity: 0, y: 26 },
  show: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: "easeOut", delay },
  }),
};

// Hero content enters from the left, staggered heading → paragraph (120ms apart).
const heroContainer = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
};
const heroItem = {
  hidden: { opacity: 0, x: -40 },
  show: { opacity: 1, x: 0, transition: { duration: 0.75, ease: "easeOut" } },
};

// Get-in-touch cards: 1 from the left, 2 fades up + scales, 3 from the right.
const cardsContainer = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};
const cardVariants = {
  hidden: (i) => ({
    opacity: 0,
    x: i === 0 ? -44 : i === 2 ? 44 : 0,
    y: i === 1 ? 24 : 0,
    scale: i === 1 ? 0.96 : 1,
  }),
  show: {
    opacity: 1,
    x: 0,
    y: 0,
    scale: 1,
    transition: { duration: 0.65, ease: "easeOut" },
  },
};

// Form fields reveal with a gentle 60ms stagger.
const fieldsContainer = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06 } },
};
const fieldItem = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

const HERO_IMG = "/unik/wheat-panorama";

const CONTACT_CARDS = [
  {
    icon: MapPin,
    labelKey: "addressLabel",
    linesKey: "addressLines",
  },
  {
    icon: Mail,
    labelKey: "emailUs",
    lines: ["Sales@unikbiotechresearch.com"],
    href: "mailto:Sales@unikbiotechresearch.com",
  },
  {
    icon: Phone,
    labelKey: "callUs",
    lines: ["+91 7666272741"],
    href: "tel:+917666272741",
  },
];

export default function Contact() {
  const { t, tArr, lang } = useLang();
  const mr = lang === "mr" ? "font-marathi" : "";
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.phone || !form.message) {
      toast.error(t("contact", "fillError"));
      return;
    }
    setLoading(true);
    try {
      const response = await fetch("https://formsubmit.co/ajax/Sales@unikbiotechresearch.com", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          _subject: `New Contact Inquiry from ${form.name}`,
          ...form,
          inquiry_type: "general",
        }),
      });

      if (response.ok) {
        toast.success(t("contact", "success"));
        setForm({ name: "", email: "", phone: "", subject: "", message: "" });
      } else {
        toast.error(t("contact", "error"));
      }
    } catch {
      toast.error(t("contact", "error"));
    } finally {
      setLoading(false);
    }
  };

  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "Unik Biotech Research",
    image: "https://unikbiotechresearch.com/official-logo.png",
    url: "https://unikbiotechresearch.com",
    telephone: "+91-7666272741",
    email: "Sales@unikbiotechresearch.com",
    priceRange: "$$",
    address: {
      "@type": "PostalAddress",
      streetAddress: "B-178, S.S. Co-Op. Ind. Estate, Pimpalgaon (B), Tal. Niphad",
      addressLocality: "Nashik",
      addressRegion: "Maharashtra",
      postalCode: "422209",
      addressCountry: "IN",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 20.16913,
      longitude: 73.99042,
    },
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      opens: "09:00",
      closes: "18:00",
    },
  };

  const contactFAQs = [
    {
      question: "What is Unik Biotech Research's phone number?",
      answer:
        "You can reach Unik Biotech Research at +91 7666272741 or via WhatsApp at +91-7666272741.",
    },
    {
      question: "What is Unik Biotech Research's email address?",
      answer:
        "You can email Unik Biotech Research at Sales@unikbiotechresearch.com for product inquiries, dealer information, or general questions.",
    },
    {
      question: "What is Unik Biotech Research's address?",
      answer:
        "Unik Biotech Research is located at B-178, S.S. Co-Op. Ind. Estate, Pimpalgaon (B), Tal. Niphad, Dist. Nashik - 422 209, Maharashtra, India.",
    },
  ];

  const inputBase =
    "w-full rounded-xl border border-white/12 bg-white/[0.06] py-3.5 pl-11 pr-4 text-sm text-farm-cream placeholder-white/40 outline-none transition-[background-color,border-color,box-shadow,color] duration-300 ease-out focus:border-brand-greenAccent/60 focus:bg-white/[0.1] focus:shadow-lg focus:shadow-brand-greenAccent/20 focus:ring-2 focus:ring-brand-greenAccent/25 focus:placeholder-white/25";

  return (
    <div className="page-enter bg-farm-forestDeep">
      <SEO
        title="Contact Us — Get in Touch"
        description="Contact Unik Biotech Research in Nashik, Maharashtra for inquiries about organic fertilizers, biostimulants, and agricultural products. Call +91 7666272741 or email Sales@unikbiotechresearch.com."
        keywords="contact Unik Biotech Research, Unik Biotech Research phone number, Unik Biotech Research email, agriculture products Nashik, Unik Biotech Research address, fertilizer manufacturer contact"
        url="https://unikbiotechresearch.com/contact"
        lang={lang}
        schema={localBusinessSchema}
        faqSchema={contactFAQs}
        breadcrumbs={[
          { name: "Home", url: "https://unikbiotechresearch.com/" },
          { name: "Contact Us", url: "https://unikbiotechresearch.com/contact" },
        ]}
      />

      {/* ================= HERO ================= */}
      <section className="relative isolate flex min-h-[62vh] w-full items-center overflow-hidden sm:min-h-[68vh]">
        {/* Background photograph with a slow, subtle zoom (parallax feel) */}
        <motion.div
          aria-hidden="true"
          className="absolute inset-0 -z-10 will-change-transform"
          initial={{ scale: 1.06 }}
          animate={{ scale: 1.14 }}
          transition={{ duration: 16, ease: "easeInOut", repeat: Infinity, repeatType: "reverse" }}
        >
          <picture>
            <source
              type="image/webp"
              srcSet={`${HERO_IMG}-1024.webp 1024w, ${HERO_IMG}-1600.webp 1600w, ${HERO_IMG}-2000.webp 2000w, ${HERO_IMG}-2560.webp 2560w`}
              sizes="100vw"
            />
            <img
              src={`${HERO_IMG}-1600.jpg`}
              alt="Golden agricultural fields at sunset"
              className="h-full w-full object-cover object-center"
              fetchPriority="high"
              decoding="async"
            />
          </picture>
        </motion.div>
        {/* Dark green overlay */}
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-10 bg-gradient-to-r from-farm-forestDeep/95 via-farm-forestDeep/80 to-farm-forest/40"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-10 bg-gradient-to-t from-farm-forestDeep/90 via-transparent to-farm-forestDeep/30"
        />

        <div className="mx-auto w-full max-w-6xl px-5 pt-28 pb-16 sm:px-6 sm:pt-32">
          <motion.div
            variants={heroContainer}
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT}
            className="max-w-2xl"
          >
            <motion.h1
              variants={heroItem}
              className={`font-heading text-5xl font-bold leading-[0.95] tracking-[-0.02em] text-farm-cream sm:text-6xl lg:text-7xl ${mr}`}
            >
              {t("contact", "title")}
            </motion.h1>
            <motion.p
              variants={heroItem}
              className={`mt-6 max-w-xl text-[15px] leading-relaxed text-farm-cream/80 sm:text-base ${mr}`}
            >
              {t("contact", "sub")}
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* ================= BODY ================= */}
      <section className="relative w-full overflow-hidden bg-farm-forestDeep py-20 sm:py-24 lg:py-28">
        {/* Soft colour blooms for depth */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute -left-24 top-40 h-72 w-72 rounded-full bg-farm-moss/30 blur-3xl"
        />
        <span
          aria-hidden="true"
          className="pointer-events-none absolute -right-16 top-1/2 h-80 w-80 rounded-full bg-farm-forest/50 blur-3xl"
        />
        <span
          aria-hidden="true"
          className="pointer-events-none absolute bottom-0 left-1/3 h-64 w-64 rounded-full bg-farm-gold/[0.06] blur-3xl"
        />

        <div className="relative mx-auto w-full max-w-6xl px-5 sm:px-6">
          {/* ---- Get in Touch ---- */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT}
            className="flex items-center justify-center gap-3 text-center"
          >
            <span className="h-px w-8 bg-farm-gold/50 sm:w-12" />
            <ArrowRight className="h-4 w-4 text-farm-gold" aria-hidden="true" />
            <h2 className={`font-heading text-2xl font-bold tracking-tight text-farm-cream sm:text-3xl ${mr}`}>
              {t("contact", "infoTitle")}
            </h2>
            <ArrowLeft className="h-4 w-4 text-farm-gold" aria-hidden="true" />
            <span className="h-px w-8 bg-farm-gold/50 sm:w-12" />
          </motion.div>

          {/* ---- Contact cards ---- */}
          <motion.div
            variants={cardsContainer}
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT}
            className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6"
          >
            {CONTACT_CARDS.map((card, index) => {
              const Icon = card.icon;
              const label = t("contact", card.labelKey);
              const lines = card.linesKey ? tArr("contact", card.linesKey) : card.lines;
              const body = (
                <>
                  <span className="relative mx-auto flex h-14 w-14 items-center justify-center">
                    <span
                      aria-hidden="true"
                      className="absolute inset-0 rounded-full bg-brand-greenAccent/25 opacity-0 blur-xl transition-opacity duration-300 ease-out group-hover:opacity-100"
                    />
                    <span className="relative flex h-14 w-14 items-center justify-center rounded-full border border-farm-gold/30 bg-farm-gold/10 text-farm-gold transition-transform duration-300 ease-out group-hover:scale-[1.08]">
                      <Icon className="h-6 w-6" strokeWidth={1.75} aria-hidden="true" />
                    </span>
                  </span>
                  <h3 className={`mt-5 text-center font-heading text-lg font-semibold text-farm-cream ${mr}`}>
                    {label}
                  </h3>
                  <div className={`mt-3 space-y-0.5 text-center text-sm leading-relaxed text-farm-cream/70 ${mr}`}>
                    {lines.map((line) => (
                      <p key={line}>{line}</p>
                    ))}
                  </div>
                  <span className="mx-auto mt-4 h-px w-10 bg-farm-gold/40" />
                </>
              );
              const shell =
                "group flex h-full flex-col items-center rounded-[24px] border border-white/12 bg-white/[0.06] p-7 shadow-glass backdrop-blur-xl transition-[transform,box-shadow,border-color,background-color] duration-300 ease-out hover:-translate-y-1.5 hover:border-farm-gold/30 hover:bg-white/[0.09] hover:shadow-[0_30px_60px_-24px_rgba(0,0,0,0.65)] sm:p-8";
              return (
                <motion.div key={card.labelKey} variants={cardVariants} custom={index}>
                  {card.href ? (
                    <a href={card.href} className={shell}>
                      {body}
                    </a>
                  ) : (
                    <div className={shell}>{body}</div>
                  )}
                </motion.div>
              );
            })}
          </motion.div>

          {/* ---- Contact form ---- */}
          <div className="relative mt-8 overflow-hidden rounded-[28px] border border-white/12 bg-white/[0.06] shadow-glass backdrop-blur-xl sm:mt-10 lg:rounded-[32px]">
            <div className="grid gap-0 lg:grid-cols-5">
              {/* Left panel */}
              <SlideReveal
                direction="left"
                className="relative flex flex-col justify-between overflow-hidden border-b border-white/10 bg-farm-forest/30 p-8 sm:p-10 lg:col-span-2 lg:border-b-0 lg:border-r"
              >
                <div className="relative z-10">
                  <span className={`inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-farm-gold ${mr}`}>
                    <Leaf className="h-3.5 w-3.5" aria-hidden="true" />
                    {t("contact", "formEyebrow")}
                  </span>
                  <h3 className={`mt-5 font-heading text-3xl font-bold leading-[1.1] tracking-[-0.01em] text-farm-cream sm:text-[2.25rem] ${mr}`}>
                    {t("contact", "formHeading")}
                  </h3>
                  <p className={`mt-5 max-w-sm text-[15px] leading-relaxed text-farm-cream/70 ${mr}`}>
                    {t("contact", "formIntro")}
                  </p>
                </div>

                {/* Decorative botanical illustration, bottom-left — fades in on its own */}
                <motion.div
                  aria-hidden="true"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={VIEWPORT}
                  transition={{ duration: 0.9, ease: "easeOut", delay: 0.35 }}
                  className="pointer-events-none relative z-0 mt-10 flex items-end gap-1 text-farm-gold/15"
                >
                  <Leaf className="h-20 w-20 -rotate-[20deg]" strokeWidth={1} />
                  <Leaf className="h-28 w-28 rotate-6" strokeWidth={1} />
                  <Leaf className="h-16 w-16 rotate-[40deg]" strokeWidth={1} />
                </motion.div>
              </SlideReveal>

              {/* Right panel — form */}
              <SlideReveal direction="right" className="p-8 sm:p-10 lg:col-span-3">
                <motion.form
                  onSubmit={handleSubmit}
                  variants={fieldsContainer}
                  initial="hidden"
                  whileInView="show"
                  viewport={VIEWPORT}
                  className="grid grid-cols-1 gap-5 sm:grid-cols-2"
                  data-testid="contact-form"
                >
                  <motion.div variants={fieldItem} className="relative">
                    <User className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-white/40" aria-hidden="true" />
                    <input
                      type="text"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      placeholder={t("contact", "namePlaceholder")}
                      data-testid="contact-name"
                      className={inputBase}
                    />
                  </motion.div>
                  <motion.div variants={fieldItem} className="relative">
                    <Mail className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-white/40" aria-hidden="true" />
                    <input
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      placeholder={t("contact", "emailPlaceholder")}
                      data-testid="contact-email"
                      className={inputBase}
                    />
                  </motion.div>
                  <motion.div variants={fieldItem} className="relative">
                    <Phone className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-white/40" aria-hidden="true" />
                    <input
                      type="tel"
                      name="phone"
                      value={form.phone}
                      onChange={handleChange}
                      placeholder={t("contact", "phonePlaceholder")}
                      data-testid="contact-phone"
                      className={inputBase}
                    />
                  </motion.div>
                  <motion.div variants={fieldItem} className="relative">
                    <Tag className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-white/40" aria-hidden="true" />
                    <input
                      type="text"
                      name="subject"
                      value={form.subject}
                      onChange={handleChange}
                      placeholder={t("contact", "subjectPlaceholder")}
                      data-testid="contact-subject"
                      className={inputBase}
                    />
                  </motion.div>

                  <motion.div variants={fieldItem} className="relative sm:col-span-2">
                    <PencilLine className="absolute left-4 top-4 h-4 w-4 text-white/40" aria-hidden="true" />
                    <textarea
                      name="message"
                      value={form.message}
                      onChange={handleChange}
                      placeholder={t("contact", "messagePlaceholder")}
                      rows={5}
                      data-testid="contact-message"
                      className="w-full resize-none rounded-xl border border-white/12 bg-white/[0.06] py-3.5 pl-11 pr-4 text-sm text-farm-cream placeholder-white/40 outline-none transition-[background-color,border-color,box-shadow,color] duration-300 ease-out focus:border-brand-greenAccent/60 focus:bg-white/[0.1] focus:shadow-lg focus:shadow-brand-greenAccent/20 focus:ring-2 focus:ring-brand-greenAccent/25 focus:placeholder-white/25"
                    />
                  </motion.div>

                  <motion.div variants={fieldItem} className="sm:col-span-2">
                    <button
                      type="submit"
                      disabled={loading}
                      data-testid="contact-submit"
                      className="group inline-flex items-center justify-center gap-2 rounded-full bg-farm-forest px-8 py-3.5 text-[15px] font-semibold text-farm-cream shadow-lg shadow-black/25 transition-[transform,background-color,box-shadow] duration-300 ease-out hover:-translate-y-1 hover:scale-[1.02] hover:bg-farm-moss hover:shadow-xl hover:shadow-black/30 disabled:cursor-not-allowed disabled:opacity-70 disabled:hover:translate-y-0 disabled:hover:scale-100"
                    >
                      {loading ? (
                        <span className={mr}>{t("contact", "sending")}</span>
                      ) : (
                        <>
                          <span className={mr}>{t("contact", "submit")}</span>
                          <Send className="h-4 w-4 transition-transform duration-300 ease-out group-hover:translate-x-[5px]" aria-hidden="true" />
                        </>
                      )}
                    </button>
                  </motion.div>
                </motion.form>
              </SlideReveal>
            </div>
          </div>

          {/* ---- Location ---- */}
          <div className="mt-8 overflow-hidden rounded-[28px] border border-white/12 bg-white/[0.06] shadow-glass backdrop-blur-xl transition-[transform,box-shadow] duration-300 ease-out hover:-translate-y-0.5 hover:shadow-[0_36px_70px_-30px_rgba(0,0,0,0.7)] sm:mt-10 lg:rounded-[32px]">
            <div className="grid gap-0 lg:grid-cols-5">
              {/* Left panel */}
              <SlideReveal
                direction="left"
                className="flex flex-col justify-center border-b border-white/10 bg-farm-forest/30 p-8 sm:p-10 lg:col-span-2 lg:border-b-0 lg:border-r"
              >
                <span className={`inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-farm-gold ${mr}`}>
                  <MapPin className="h-3.5 w-3.5" aria-hidden="true" />
                  {t("contact", "locationEyebrow")}
                </span>
                <h3 className={`mt-5 font-heading text-3xl font-bold leading-[1.1] tracking-[-0.01em] text-farm-cream sm:text-[2.25rem] ${mr}`}>
                  {t("contact", "locationHeading")}
                </h3>
                <p className={`mt-5 max-w-sm text-[15px] leading-relaxed text-farm-cream/70 ${mr}`}>
                  {t("contact", "locationText")}
                </p>
              </SlideReveal>

              {/* Right panel — map */}
              <SlideReveal
                direction="right"
                className="relative min-h-[320px] lg:col-span-3 lg:min-h-[420px]"
              >
                <iframe
                  title={t("contact", "mapTitle")}
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3748.6!2d74.09!3d20.07!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bddeb8b6c28d1e9%3A0x0!2sPimpalgaon+Baswant%2C+Nashik!5e0!3m2!1sen!2sin!4v1000000000000!5m2!1sen!2sin"
                  className="absolute inset-0 h-full w-full"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
                {/* Info overlay card */}
                <div className="pointer-events-none absolute left-4 top-4 max-w-[15rem] rounded-2xl border border-black/5 bg-white/95 p-4 shadow-xl backdrop-blur-sm sm:left-5 sm:top-5">
                  <p className="font-heading text-sm font-bold text-farm-ink">
                    Unik Biotech Research
                  </p>
                  <p className={`mt-1 text-xs leading-relaxed text-farm-ink/65 ${mr}`}>
                    {t("contact", "mapAddressShort")}
                  </p>
                  <a
                    href="https://www.google.com/maps/search/?api=1&query=Pimpalgaon+Baswant+Nashik"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`pointer-events-auto mt-2 inline-flex items-center gap-1 text-xs font-semibold text-farm-forest transition-colors hover:text-farm-moss ${mr}`}
                  >
                    {t("contact", "viewLargerMap")}
                    <ExternalLink className="h-3 w-3" aria-hidden="true" />
                  </a>
                </div>
              </SlideReveal>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
