import { useState } from "react";
import { Phone, Mail, Globe, MapPin, Send, User, Sprout, Clock } from "lucide-react";
import { toast } from "sonner";
import { useLang } from "@/context/LanguageContext";
import SEO from "@/components/SEO";

/** Official WhatsApp glyph (lucide has no brand icon). */
function WhatsAppIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51l-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.71.306 1.263.489 1.694.625.712.227 1.36.195 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
    </svg>
  );
}

export default function Contact() {
  const { t, lang } = useLang();
  const cropList = t("crops") || [];
  const [form, setForm] = useState({ name: "", phone: "", email: "", crop_type: "", message: "" });
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
          "Accept": "application/json"
        },
        body: JSON.stringify({
          _subject: `New Contact Inquiry from ${form.name}`,
          ...form,
          inquiry_type: "general"
        })
      });

      if (response.ok) {
        toast.success(t("contact", "success"));
        setForm({ name: "", phone: "", email: "", crop_type: "", message: "" });
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
    "name": "Unik Biotech Research",
    "image": "https://unikbiotechresearch.com/official-logo.png",
    "url": "https://unikbiotechresearch.com",
    "telephone": "+91-7666272741",
    "email": "Sales@unikbiotechresearch.com",
    "priceRange": "$$",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "B-178, S.S. Co-Op. Ind. Estate, Pimpalgaon (B), Tal. Niphad",
      "addressLocality": "Nashik",
      "addressRegion": "Maharashtra",
      "postalCode": "422209",
      "addressCountry": "IN"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 20.169130,
      "longitude": 73.990420
    },
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      "opens": "09:00",
      "closes": "18:00"
    }
  };

  const contactFAQs = [
    {
      question: "What is Unik Biotech Research's phone number?",
      answer: "You can reach Unik Biotech Research at +91 7666272741 or via WhatsApp at +91-7666272741."
    },
    {
      question: "What is Unik Biotech Research's email address?",
      answer: "You can email Unik Biotech Research at Sales@unikbiotechresearch.com for product inquiries, dealer information, or general questions."
    },
    {
      question: "What is Unik Biotech Research's address?",
      answer: "Unik Biotech Research is located at B-178, S.S. Co-Op. Ind. Estate, Pimpalgaon (B), Tal. Niphad, Dist. Nashik - 422 209, Maharashtra, India."
    }
  ];

  const inputBase = "w-full pl-11 pr-4 py-3 rounded-xl border border-gray-200 bg-gray-50/70 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent focus:bg-white text-sm transition-all duration-200";

  return (
    <div className="page-enter">
      <SEO
        title="Contact Us — Get in Touch"
        description="Contact Unik Biotech Research in Nashik, Maharashtra for inquiries about organic fertilizers, biostimulants, and agricultural products. Call +91 7666272741 or email Sales@unikbiotechresearch.com."
        keywords="contact Unik Biotech Research, Unik Biotech Research phone number, Unik Biotech Research email, agriculture products Nashik, Unik Biotech Research address, fertilizer manufacturer contact, WhatsApp Unik Biotech Research"
        url="https://unikbiotechresearch.com/contact"
        lang={lang}
        schema={localBusinessSchema}
        faqSchema={contactFAQs}
        breadcrumbs={[
          { name: "Home", url: "https://unikbiotechresearch.com/" },
          { name: "Contact Us", url: "https://unikbiotechresearch.com/contact" }
        ]}
      />
      {/* Header */}
      <section className="relative bg-gradient-to-br from-green-900 via-green-800 to-green-900 px-4 pb-16 pt-28 text-center overflow-hidden sm:pb-20 sm:pt-32">
        <div className="absolute -top-16 -left-16 w-72 h-72 bg-green-500/15 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-16 -right-16 w-72 h-72 bg-amber-500/10 rounded-full blur-3xl"></div>
        <div className="relative max-w-3xl mx-auto">
          <h1 className={`font-heading font-extrabold text-white text-4xl sm:text-5xl md:text-6xl mb-4 tracking-tight animate-fadeInUp ${lang === "mr" ? "font-marathi" : ""}`}>
            {t("contact", "title")}
          </h1>
          <p className={`text-green-200 text-base sm:text-lg animate-fadeInUp delay-200 ${lang === "mr" ? "font-marathi" : ""}`}>
            {t("contact", "sub")}
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-12 md:py-16 px-4 bg-[#fcfdfa]">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-5 gap-6 md:gap-8">
          {/* Form */}
          <div className="lg:col-span-3 bg-white rounded-3xl border border-gray-100 p-5 sm:p-8 shadow-sm animate-fadeInUp">
            <h2 className={`font-heading font-bold text-gray-900 text-2xl mb-1 ${lang === "mr" ? "font-marathi" : ""}`}>{t("contact", "formTitle")}</h2>
            <div className="w-14 h-1 bg-amber-400 rounded-full mb-6"></div>
            <form onSubmit={handleSubmit} className="space-y-5" data-testid="contact-form">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    {t("contact", "name")} <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="text" name="name" value={form.name} onChange={handleChange}
                      placeholder={t("contact", "namePlaceholder")}
                      data-testid="contact-name"
                      className={inputBase}
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    {t("contact", "phone")} <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="tel" name="phone" value={form.phone} onChange={handleChange}
                      placeholder={t("contact", "phonePlaceholder")}
                      data-testid="contact-phone"
                      className={inputBase}
                    />
                  </div>
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">{t("contact", "email")}</label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="email" name="email" value={form.email} onChange={handleChange}
                    placeholder={t("contact", "emailPlaceholder")}
                    data-testid="contact-email"
                    className={inputBase}
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">{t("contact", "cropType")}</label>
                <div className="relative">
                  <Sprout className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <select
                    name="crop_type" value={form.crop_type} onChange={handleChange}
                    data-testid="contact-crop"
                    className={`${inputBase} appearance-none cursor-pointer`}
                  >
                    <option value="">{t("contact", "cropPlaceholder")}</option>
                    {cropList.map((c) => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  {t("contact", "message")} <span className="text-red-500">*</span>
                </label>
                <textarea
                  name="message" value={form.message} onChange={handleChange}
                  placeholder={t("contact", "messagePlaceholder")}
                  rows={5}
                  data-testid="contact-message"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50/70 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent focus:bg-white text-sm transition-all duration-200 resize-none"
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                data-testid="contact-submit"
                className="w-full flex items-center justify-center gap-3 py-4 rounded-full bg-green-800 text-white font-semibold hover:bg-green-700 transition-all duration-200 hover:scale-[1.02] disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:scale-100 shadow-lg shadow-green-900/20"
              >
                {loading ? (
                  <span>{t("contact", "sending")}</span>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>{t("contact", "submit")}</span>
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Contact Info */}
          <div className="lg:col-span-2 space-y-5 animate-fadeInUp delay-200">
            <div className="bg-gradient-to-br from-green-800 to-green-900 rounded-3xl p-5 md:p-7 text-white shadow-lg shadow-green-900/10">
              <h3 className={`font-heading font-bold text-xl mb-6 ${lang === "mr" ? "font-marathi" : ""}`}>{t("contact", "infoTitle")}</h3>
              <ul className="space-y-4">
                <li className="flex items-start gap-4 p-3 -mx-3 rounded-2xl hover:bg-white/5 transition-colors">
                  <div className="w-10 h-10 bg-white/15 rounded-xl flex items-center justify-center flex-shrink-0"><MapPin className="w-5 h-5" /></div>
                  <div>
                    <div className="text-green-300 text-xs font-semibold uppercase tracking-wide mb-1">{t("contact", "address")}</div>
                    <div className="text-white text-sm leading-relaxed">B-178, S.S. Co-Op. Ind. Estate,<br />Pimpalgaon (B), Tal. Niphad,<br />Dist. Nashik - 422 209</div>
                  </div>
                </li>
                <li className="flex items-start gap-4 p-3 -mx-3 rounded-2xl hover:bg-white/5 transition-colors">
                  <div className="w-10 h-10 bg-white/15 rounded-xl flex items-center justify-center flex-shrink-0"><Phone className="w-5 h-5" /></div>
                  <div>
                    <div className="text-green-300 text-xs font-semibold uppercase tracking-wide mb-1">{t("contact", "phone2")}</div>
                    <a href="tel:+917666272741" className="text-white hover:text-amber-300 transition-colors text-sm font-medium">+91 7666272741</a>
                  </div>
                </li>
                <li className="flex items-start gap-4 p-3 -mx-3 rounded-2xl hover:bg-white/5 transition-colors">
                  <div className="w-10 h-10 bg-white/15 rounded-xl flex items-center justify-center flex-shrink-0"><Mail className="w-5 h-5" /></div>
                  <div>
                    <div className="text-green-300 text-xs font-semibold uppercase tracking-wide mb-1">{t("contact", "emailLabel")}</div>
                    <a href="mailto:Sales@unikbiotechresearch.com" className="text-white hover:text-amber-300 transition-colors text-sm break-all">Sales@unikbiotechresearch.com</a>
                  </div>
                </li>
                <li className="flex items-start gap-4 p-3 -mx-3 rounded-2xl hover:bg-white/5 transition-colors">
                  <div className="w-10 h-10 bg-white/15 rounded-xl flex items-center justify-center flex-shrink-0"><Globe className="w-5 h-5" /></div>
                  <div>
                    <div className="text-green-300 text-xs font-semibold uppercase tracking-wide mb-1">{t("contact", "website")}</div>
                    <span className="text-white text-sm">www.unikbiotechresearch.com</span>
                  </div>
                </li>
                <li className="flex items-start gap-4 p-3 -mx-3 rounded-2xl">
                  <div className="w-10 h-10 bg-white/15 rounded-xl flex items-center justify-center flex-shrink-0"><Clock className="w-5 h-5" /></div>
                  <div>
                    <div className="text-green-300 text-xs font-semibold uppercase tracking-wide mb-1">Working Hours</div>
                    <span className="text-white text-sm">Mon – Sat · 9:00 AM – 6:00 PM</span>
                  </div>
                </li>
              </ul>
            </div>

            {/* WhatsApp CTA */}
            <a
              href="https://wa.me/917666272741"
              target="_blank"
              rel="noopener noreferrer"
              data-testid="whatsapp-cta"
              className="flex items-center gap-4 bg-[#25D366] text-white rounded-2xl p-5 hover:bg-[#20bf5b] transition-all duration-200 hover:scale-[1.02] shadow-lg shadow-[#25D366]/30"
            >
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center flex-shrink-0"><WhatsAppIcon className="w-6 h-6" /></div>
              <div>
                <div className="font-heading font-bold text-base">{t("contact", "whatsapp")}</div>
                <div className="text-green-50 text-sm">{t("contact", "whatsappSub")}</div>
              </div>
            </a>

            {/* Map */}
            <div className="rounded-2xl overflow-hidden border border-gray-100 shadow-sm h-56">
              <iframe
                title="Unik Biotech Research Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3748.6!2d74.09!3d20.07!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bddeb8b6c28d1e9%3A0x0!2sPimpalgaon+Baswant%2C+Nashik!5e0!3m2!1sen!2sin!4v1000000000000!5m2!1sen!2sin"
                width="100%" height="100%" style={{ border: 0 }} allowFullScreen="" loading="lazy"
              ></iframe>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
