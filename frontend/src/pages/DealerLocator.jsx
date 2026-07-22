import { useState } from "react";
import { motion } from "motion/react";
import {
  MapPin,
  Phone,
  Mail,
  Users,
  ArrowRight,
  Send,
  BadgeCheck,
  ShieldCheck,
  Handshake,
  Store,
  Navigation,
  Headphones,
  Sprout,
  Leaf,
  Warehouse,
} from "lucide-react";
import { toast } from "sonner";
import { useLang } from "@/context/LanguageContext";
import SEO from "@/components/SEO";
import CountUp from "@/components/animations/CountUp";
import { SlideReveal } from "@/components/animations/SlideReveal";
import DealerFAQ from "@/components/sections/DealerFAQ";

const HERO_IMG = "/unik/aerial-fields";

const DISTRICTS = [
  "Nashik", "Pune", "Chhatrapati Sambhajinagar", "Ahilyanagar", "Solapur", "Satara", "Sangli", "Kolhapur",
  "Jalgaon", "Dhule", "Nandurbar", "Nagpur", "Amravati", "Akola", "Buldhana", "Dharashiv",
  "Latur", "Nanded", "Parbhani", "Hingoli", "Beed", "Jalna", "Washim", "Yavatmal",
  "Wardha", "Chandrapur", "Gadchiroli", "Gondiya", "Bhandara", "Raigad", "Ratnagiri",
  "Sindhudurg", "Thane", "Mumbai", "Palghar",
];

const STATES = [
  "Maharashtra", "Gujarat", "Madhya Pradesh", "Karnataka", "Rajasthan",
  "Telangana", "Andhra Pradesh", "Chhattisgarh", "Other",
];

const EXPERIENCE = [
  "Less than 1 year", "1 – 3 years", "3 – 5 years", "5 – 10 years", "10+ years",
];

const PRODUCT_INTERESTS = [
  "Bio Fertilizers", "Plant Growth Promoters", "Crop Protection",
  "Micronutrients", "Seaweed Extracts", "All Products",
];

const STATS = [
  { icon: Users, value: "6+", labelKey: "statsDealers" },
  { icon: MapPin, value: "35+", labelKey: "statsDistricts" },
  { icon: ShieldCheck, value: "20+", labelKey: "statsYears" },
];

const DEALERS = [
  {
    name: "Shree Ganesh Agro Centre",
    person: "Mr. Pravin Patil",
    city: "Nashik, Maharashtra",
    address: "Shop No. 12, Market Yard, Nashik, Maharashtra",
    phone: "+91 98765 43210",
    email: "ganeshagro@gmail.com",
    products: ["Micronutrients", "Biostimulants", "Bio Fertilisers"],
  },
  {
    name: "Sai Krushi Seva Kendra",
    person: "Mr. Santosh Shinde",
    city: "Ahilyanagar, Maharashtra",
    address: "Station Road, Ahilyanagar, Maharashtra",
    phone: "+91 98223 34455",
    email: "saikrushi@gmail.com",
    products: ["Crop Protection", "Micronutrients"],
  },
  {
    name: "Green Field Agro",
    person: "Mr. Rajesh Pawar",
    city: "Pune, Maharashtra",
    address: "Shivaji Nagar, Pune, Maharashtra",
    phone: "+91 91999 89998",
    email: "greenfield@gmail.com",
    products: ["Biostimulants", "Spreaders", "Soil Conditioners"],
  },
  {
    name: "Krishna Agri Solutions",
    person: "Mr. Amit Deshmukh",
    city: "Kolhapur, Maharashtra",
    address: "Rajarampuri, Kolhapur, Maharashtra",
    phone: "+91 90210 11223",
    email: "krishnaagri@gmail.com",
    products: ["Bio Fertilisers", "Micronutrients"],
  },
  {
    name: "Balaji Krushi Kendra",
    person: "Mr. Vijay Jadhav",
    city: "Chhatrapati Sambhajinagar, Maharashtra",
    address: "Jalna Road, Chhatrapati Sambhajinagar, Maharashtra",
    phone: "+91 98900 22110",
    email: "balajikrushi@gmail.com",
    products: ["Crop Protection", "Growth Promoters"],
  },
  {
    name: "Samrudhi Agro Agency",
    person: "Mr. Nitin More",
    city: "Solapur, Maharashtra",
    address: "Market Yard, Solapur, Maharashtra",
    phone: "+91 97654 88990",
    email: "samrudhiagro@gmail.com",
    products: ["Seaweed Extracts", "Micronutrients", "Bio Fertilisers"],
  },
];

// --- Motion presets (match the homepage: fade + slide, easeOut, replay on re-entry) ---
const VIEWPORT = { once: false, amount: 0.2 };

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
};

const heroContainer = { hidden: {}, show: { transition: { staggerChildren: 0.12 } } };
const heroItem = {
  hidden: { opacity: 0, x: -44 },
  show: { opacity: 1, x: 0, transition: { duration: 0.75, ease: "easeOut" } },
};

const fieldsContainer = { hidden: {}, show: { transition: { staggerChildren: 0.06 } } };
const fieldItem = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

const gridContainer = { hidden: {}, show: { transition: { staggerChildren: 0.09 } } };
const dealerCardVariants = {
  hidden: (i) => ({ opacity: 0, x: i % 2 === 0 ? -46 : 46 }),
  show: { opacity: 1, x: 0, transition: { duration: 0.65, ease: "easeOut" } },
};

const scrollToId = (id) => {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
};

export default function DealerLocator() {
  const { t, tArr, lang } = useLang();
  const mr = lang === "mr" ? "font-marathi" : "";
  const experienceLabels = tArr("dealer", "experienceOptions");
  const productLabels = tArr("dealer", "productInterests");
  const [form, setForm] = useState({
    name: "",
    firm: "",
    phone: "",
    email: "",
    city: "",
    district: "",
    state: "",
    pincode: "",
    experience: "",
    products: "",
    existingCustomer: "yes",
    message: "",
    agree: false,
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((f) => ({ ...f, [name]: type === "checkbox" ? checked : value }));
  };

  const handleDealerSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.phone || !form.city || !form.district) {
      toast.error(t("dealer", "applyErrFill"));
      return;
    }
    if (!form.agree) {
      toast.error(t("dealer", "applyErrAgree"));
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
          _subject: `New Dealer Inquiry from ${form.name} in ${form.district}`,
          ...form,
          existingCustomer: form.existingCustomer === "yes" ? "Yes" : "No",
          inquiry_type: "dealer",
        }),
      });

      if (response.ok) {
        toast.success(t("dealer", "applySuccess"));
        setForm({
          name: "", firm: "", phone: "", email: "", city: "", district: "",
          state: "", pincode: "", experience: "", products: "",
          existingCustomer: "yes", message: "", agree: false,
        });
      } else {
        toast.error(t("dealer", "applyErrSub"));
      }
    } catch {
      toast.error(t("dealer", "applyErrSub"));
    } finally {
      setLoading(false);
    }
  };

  const dealerFAQs = [
    {
      question: "How can I find a Unik Biotech Research dealer near me?",
      answer:
        "Visit our Dealer Locator page at unikbiotechresearch.com/dealer-locator and browse our authorized dealers. Unik Biotech Research has dealers across 35+ districts in Maharashtra including Nashik, Pune, Chhatrapati Sambhajinagar, Solapur, Satara, Sangli, Kolhapur, and more.",
    },
    {
      question: "How do I become a Unik Biotech Research dealer?",
      answer:
        "To become a Unik Biotech Research dealer, fill out the dealer application form on our Dealer Locator page with your details. You can also call us directly at +91 7666272741. Benefits include exclusive distribution rights, marketing support, and access to 100+ quality agricultural products.",
    },
    {
      question: "In which districts does Unik Biotech Research have dealers?",
      answer:
        "Unik Biotech Research has dealers across Maharashtra including Nashik, Pune, Chhatrapati Sambhajinagar, Ahilyanagar, Solapur, Satara, Sangli, Kolhapur, Jalgaon, Dhule, Nandurbar, Nagpur, Amravati, Akola, Buldhana, and many more districts.",
    },
  ];

  const labelBase = "block text-[13px] font-semibold text-gray-700 mb-1.5";
  const inputBase =
    "w-full rounded-xl border border-gray-200 bg-gray-50/70 px-4 py-3 text-sm text-gray-800 placeholder-gray-400 outline-none transition-[background-color,border-color,box-shadow,color] duration-300 ease-out focus:border-brand-green/60 focus:bg-white focus:shadow-lg focus:shadow-brand-green/15 focus:ring-2 focus:ring-brand-green/20 focus:placeholder-gray-300";
  const selectBase = `${inputBase} appearance-none cursor-pointer bg-[url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 fill=%22none%22 viewBox=%220 0 24 24%22 stroke=%22%236b7280%22 stroke-width=%222%22><path stroke-linecap=%22round%22 stroke-linejoin=%22round%22 d=%22M19 9l-7 7-7-7%22/></svg>')] bg-[length:1.1rem] bg-[right_0.9rem_center] bg-no-repeat pr-10`;

  return (
    <div className="page-enter bg-[#fcfdfa]">
      <SEO
        title="Dealer Locator — Find a Dealer or Become One"
        description="Find a Unik Biotech Research dealer near you across 35+ districts in Maharashtra. Or apply to become a dealer of our premium organic fertilizers, biostimulants & agricultural products."
        keywords="Unik Biotech Research dealers, find fertilizer dealer Maharashtra, buy Unik Biotech Research products, become a fertilizer dealer, Unik Biotech Research distributors, agricultural products dealer, Nashik fertilizer dealer, organic fertilizer distributor"
        url="https://unikbiotechresearch.com/dealer-locator"
        lang={lang}
        faqSchema={dealerFAQs}
        breadcrumbs={[
          { name: "Home", url: "https://unikbiotechresearch.com/" },
          { name: "Dealer Locator", url: "https://unikbiotechresearch.com/dealer-locator" },
        ]}
      />

      {/* ================= HERO ================= */}
      <section className="relative isolate flex min-h-[560px] w-full items-center overflow-hidden lg:min-h-[600px]">
        {/* Background photograph with a slow, subtle zoom */}
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
              alt="Aerial view of lush agricultural fields at sunrise"
              className="h-full w-full object-cover object-center"
              fetchPriority="high"
              decoding="async"
            />
          </picture>
        </motion.div>
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-10 bg-gradient-to-r from-farm-forestDeep/95 via-farm-forestDeep/80 to-farm-forest/30"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-10 bg-gradient-to-t from-farm-forestDeep/85 via-transparent to-farm-forestDeep/30"
        />

        <div className="mx-auto w-full max-w-6xl px-5 pt-28 pb-24 sm:px-6 sm:pt-32 lg:pb-28">
          <motion.div
            variants={heroContainer}
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT}
            className="max-w-2xl"
          >
            <motion.h1
              variants={heroItem}
              className={`font-heading text-5xl font-bold leading-[0.98] tracking-[-0.02em] text-farm-cream sm:text-6xl lg:text-[4.25rem] ${mr}`}
            >
              {t("dealer", "heroHeadingBefore")}
              <br />
              <span className="text-brand-greenAccent">{t("dealer", "heroHighlight")}</span> {t("dealer", "heroHeadingAfter")}
            </motion.h1>
            <motion.p
              variants={heroItem}
              className={`mt-6 max-w-xl text-[15px] leading-relaxed text-farm-cream/80 sm:text-base ${mr}`}
            >
              {t("dealer", "sub")}
            </motion.p>
            <motion.div variants={heroItem} className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
              <button
                type="button"
                onClick={() => scrollToId("apply")}
                className={`group inline-flex items-center justify-center gap-2 rounded-full bg-brand-green px-7 py-3.5 text-[15px] font-semibold text-white shadow-lg shadow-black/25 transition-[transform,background-color,box-shadow] duration-300 ease-out hover:scale-[1.03] hover:bg-brand-greenDark ${mr}`}
              >
                {t("dealer", "becomeTitle")}
                <ArrowRight className="h-4 w-4 transition-transform duration-300 ease-out group-hover:translate-x-1" />
              </button>
              <button
                type="button"
                onClick={() => scrollToId("dealers")}
                className={`group inline-flex items-center justify-center gap-2 rounded-full border border-white/40 bg-white/5 px-7 py-3.5 text-[15px] font-semibold text-farm-cream backdrop-blur-md transition-[transform,background-color] duration-300 ease-out hover:scale-[1.03] hover:bg-white/12 ${mr}`}
              >
                {t("dealer", "findTitle")}
                <ArrowRight className="h-4 w-4 transition-transform duration-300 ease-out group-hover:translate-x-1" />
              </button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ================= FLOATING STATS ================= */}
      <div className="relative z-20 mx-auto -mt-16 w-full max-w-5xl px-5 sm:-mt-20 sm:px-6">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={VIEWPORT}
          className="grid grid-cols-1 gap-2 rounded-[24px] border border-gray-100 bg-white p-6 shadow-[0_30px_70px_-30px_rgba(16,20,24,0.35)] sm:grid-cols-3 sm:p-8"
        >
          {STATS.map(({ icon: Icon, value, labelKey }, i) => (
            <div
              key={labelKey}
              className={`flex items-center justify-center gap-4 py-3 sm:flex-col sm:gap-3 sm:py-0 ${
                i < STATS.length - 1 ? "sm:border-r sm:border-gray-100" : ""
              }`}
            >
              <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-green-50 text-brand-green">
                <Icon className="h-7 w-7" strokeWidth={1.75} />
              </span>
              <div className="text-center">
                <CountUp
                  value={value}
                  className="font-heading text-3xl font-extrabold text-gray-900 sm:text-4xl"
                />
                <p className={`mt-0.5 text-sm font-medium text-gray-500 ${mr}`}>{t("dealer", labelKey)}</p>
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* ================= CHOICE ================= */}
      <section className="mx-auto w-full max-w-5xl px-5 pt-10 sm:px-6 sm:pt-14">
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 md:gap-0">
          {/* Left card */}
          <SlideReveal
            direction="left"
            className="relative rounded-[24px] border border-gray-100 bg-white p-7 shadow-soft transition-[transform,box-shadow] duration-300 ease-out hover:-translate-y-1 hover:shadow-glass sm:p-9 md:rounded-r-none md:border-r-0"
          >
            <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-green-50 text-brand-green">
              <Handshake className="h-7 w-7" strokeWidth={1.75} />
            </span>
            <h3 className={`mt-5 font-heading text-2xl font-bold text-gray-900 ${mr}`}>{t("dealer", "becomeTitle")}</h3>
            <p className={`mt-3 text-sm leading-relaxed text-gray-500 ${mr}`}>
              {t("dealer", "becomeSub")}
            </p>
            <button
              type="button"
              onClick={() => scrollToId("apply")}
              className={`group mt-6 inline-flex items-center gap-2 rounded-full bg-brand-green px-6 py-3 text-sm font-semibold text-white shadow-md shadow-green-900/20 transition-[transform,background-color] duration-300 ease-out hover:scale-[1.03] hover:bg-brand-greenDark ${mr}`}
            >
              {t("dealer", "applyNow")}
              <ArrowRight className="h-4 w-4 transition-transform duration-300 ease-out group-hover:translate-x-1" />
            </button>
          </SlideReveal>

          {/* Right card */}
          <SlideReveal
            direction="right"
            className="relative rounded-[24px] border border-gray-100 bg-white p-7 shadow-soft transition-[transform,box-shadow] duration-300 ease-out hover:-translate-y-1 hover:shadow-glass sm:p-9 md:rounded-l-none"
          >
            <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-amber-50 text-amber-600">
              <Store className="h-7 w-7" strokeWidth={1.75} />
            </span>
            <h3 className={`mt-5 font-heading text-2xl font-bold text-gray-900 ${mr}`}>{t("dealer", "findTitle")}</h3>
            <p className={`mt-3 text-sm leading-relaxed text-gray-500 ${mr}`}>
              {t("dealer", "findSub")}
            </p>
            <button
              type="button"
              onClick={() => scrollToId("dealers")}
              className={`group mt-6 inline-flex items-center gap-2 rounded-full bg-gray-900 px-6 py-3 text-sm font-semibold text-white shadow-md shadow-black/20 transition-[transform,background-color] duration-300 ease-out hover:scale-[1.03] hover:bg-gray-800 ${mr}`}
            >
              {t("dealer", "findTitle")}
              <ArrowRight className="h-4 w-4 transition-transform duration-300 ease-out group-hover:translate-x-1" />
            </button>
          </SlideReveal>

        </div>
      </section>

      {/* ================= APPLICATION FORM ================= */}
      <section id="apply" className="mx-auto w-full max-w-6xl scroll-mt-28 px-5 pt-14 sm:px-6 sm:pt-20">
        <div className="overflow-hidden rounded-[28px] border border-gray-100 bg-white shadow-soft lg:rounded-[32px]">
          <div className="grid gap-0 lg:grid-cols-5">
            {/* Left panel */}
            <SlideReveal
              direction="left"
              className="relative flex flex-col justify-between overflow-hidden border-b border-green-100/70 bg-gradient-to-br from-green-50 to-[#f2f7ee] p-8 sm:p-10 lg:col-span-2 lg:border-b-0 lg:border-r"
            >
              <div className="relative z-10">
                <span className={`inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-brand-green ${mr}`}>
                  <Sprout className="h-3.5 w-3.5" />
                  {t("dealer", "formEyebrow")}
                </span>
                <h2 className={`mt-5 font-heading text-3xl font-bold leading-[1.1] tracking-[-0.01em] text-gray-900 sm:text-[2.25rem] ${mr}`}>
                  {t("dealer", "formHeading")}
                </h2>
                <p className={`mt-5 max-w-sm text-[15px] leading-relaxed text-gray-500 ${mr}`}>
                  {t("dealer", "formIntro")}
                </p>
              </div>

              {/* Decorative farming illustration */}
              <motion.div
                aria-hidden="true"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={VIEWPORT}
                transition={{ duration: 0.9, ease: "easeOut", delay: 0.35 }}
                className="pointer-events-none relative z-0 mt-10 flex items-end gap-2 text-brand-green/15"
              >
                <Warehouse className="h-24 w-24" strokeWidth={0.9} />
                <Sprout className="h-16 w-16 rotate-3" strokeWidth={0.9} />
                <Leaf className="h-20 w-20 -rotate-12" strokeWidth={0.9} />
              </motion.div>
            </SlideReveal>

            {/* Right panel — form */}
            <SlideReveal direction="right" className="p-8 sm:p-10 lg:col-span-3">
              <motion.form
                onSubmit={handleDealerSubmit}
                variants={fieldsContainer}
                initial="hidden"
                whileInView="show"
                viewport={VIEWPORT}
                className="grid grid-cols-1 gap-5 sm:grid-cols-2"
                data-testid="dealer-apply-form"
              >
                <motion.div variants={fieldItem}>
                  <label className={`${labelBase} ${mr}`}>{t("dealer", "applyName")} <span className="text-red-500">*</span></label>
                  <input type="text" name="name" value={form.name} onChange={handleChange} placeholder={t("dealer", "namePlaceholder")} data-testid="dealer-name" className={inputBase} />
                </motion.div>
                <motion.div variants={fieldItem}>
                  <label className={`${labelBase} ${mr}`}>{t("dealer", "firmLabel")} <span className="text-red-500">*</span></label>
                  <input type="text" name="firm" value={form.firm} onChange={handleChange} placeholder={t("dealer", "firmPlaceholder")} className={inputBase} />
                </motion.div>

                <motion.div variants={fieldItem}>
                  <label className={`${labelBase} ${mr}`}>{t("dealer", "mobileLabel")} <span className="text-red-500">*</span></label>
                  <input type="tel" name="phone" value={form.phone} onChange={handleChange} placeholder="+91 XXXXX XXXXX" data-testid="dealer-phone" className={inputBase} />
                </motion.div>
                <motion.div variants={fieldItem}>
                  <label className={`${labelBase} ${mr}`}>{t("dealer", "emailLabel")}</label>
                  <input type="email" name="email" value={form.email} onChange={handleChange} placeholder="your@email.com" className={inputBase} />
                </motion.div>

                <motion.div variants={fieldItem}>
                  <label className={`${labelBase} ${mr}`}>{t("dealer", "cityLabel")} <span className="text-red-500">*</span></label>
                  <input type="text" name="city" value={form.city} onChange={handleChange} placeholder={t("dealer", "cityPlaceholder")} className={inputBase} />
                </motion.div>
                <motion.div variants={fieldItem}>
                  <label className={`${labelBase} ${mr}`}>{t("dealer", "applyDistrict")} <span className="text-red-500">*</span></label>
                  <select name="district" value={form.district} onChange={handleChange} data-testid="dealer-district" className={selectBase}>
                    <option value="">{t("dealer", "selectDistrict")}</option>
                    {DISTRICTS.map((d) => <option key={d} value={d}>{d}</option>)}
                  </select>
                </motion.div>

                <motion.div variants={fieldItem}>
                  <label className={`${labelBase} ${mr}`}>{t("dealer", "stateLabel")}</label>
                  <select name="state" value={form.state} onChange={handleChange} className={selectBase}>
                    <option value="">{t("dealer", "selectState")}</option>
                    {STATES.map((s) => <option key={s} value={s}>{s}</option>)}
                  </select>
                </motion.div>
                <motion.div variants={fieldItem}>
                  <label className={`${labelBase} ${mr}`}>{t("dealer", "pinLabel")}</label>
                  <input type="text" name="pincode" value={form.pincode} onChange={handleChange} placeholder={t("dealer", "pinPlaceholder")} className={inputBase} />
                </motion.div>

                <motion.div variants={fieldItem}>
                  <label className={`${labelBase} ${mr}`}>{t("dealer", "experienceLabel")} <span className="text-red-500">*</span></label>
                  <select name="experience" value={form.experience} onChange={handleChange} className={selectBase}>
                    <option value="">{t("dealer", "selectExperience")}</option>
                    {EXPERIENCE.map((x, i) => <option key={x} value={x}>{experienceLabels[i] || x}</option>)}
                  </select>
                </motion.div>
                <motion.div variants={fieldItem}>
                  <label className={`${labelBase} ${mr}`}>{t("dealer", "productsLabel")} <span className="text-red-500">*</span></label>
                  <select name="products" value={form.products} onChange={handleChange} className={selectBase}>
                    <option value="">{t("dealer", "selectProducts")}</option>
                    {PRODUCT_INTERESTS.map((p, i) => <option key={p} value={p}>{productLabels[i] || p}</option>)}
                  </select>
                </motion.div>

                <motion.div variants={fieldItem}>
                  <span className={`${labelBase} ${mr}`}>{t("dealer", "existingCustomer")} <span className="text-red-500">*</span></span>
                  <div className="flex items-center gap-6 pt-1.5">
                    {["yes", "no"].map((v) => (
                      <label key={v} className={`inline-flex cursor-pointer items-center gap-2 text-sm text-gray-700 ${mr}`}>
                        <input
                          type="radio"
                          name="existingCustomer"
                          value={v}
                          checked={form.existingCustomer === v}
                          onChange={handleChange}
                          className="h-4 w-4 accent-brand-green"
                        />
                        {v === "yes" ? t("common", "yes") : t("common", "no")}
                      </label>
                    ))}
                  </div>
                </motion.div>
                <motion.div variants={fieldItem}>
                  <label className={`${labelBase} ${mr}`}>{t("dealer", "messageLabel")}</label>
                  <input type="text" name="message" value={form.message} onChange={handleChange} placeholder={t("dealer", "messagePlaceholder")} className={inputBase} />
                </motion.div>

                <motion.label variants={fieldItem} className="flex cursor-pointer items-start gap-3 sm:col-span-2">
                  <input
                    type="checkbox"
                    name="agree"
                    checked={form.agree}
                    onChange={handleChange}
                    className="mt-0.5 h-4 w-4 rounded accent-brand-green"
                  />
                  <span className={`text-sm text-gray-500 ${mr}`}>
                    {t("dealer", "agreeText")}
                  </span>
                </motion.label>

                <motion.div variants={fieldItem} className="sm:col-span-2">
                  <button
                    type="submit"
                    disabled={loading}
                    data-testid="dealer-submit"
                    className="group inline-flex w-full items-center justify-center gap-2 rounded-full bg-brand-green px-8 py-4 text-[15px] font-semibold text-white shadow-lg shadow-green-900/25 transition-[transform,background-color,box-shadow] duration-300 ease-out hover:scale-[1.02] hover:bg-brand-greenDark hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-70 disabled:hover:scale-100 sm:w-auto"
                  >
                    <Send className="h-4 w-4" />
                    <span className={mr}>{loading ? t("dealer", "applyBtnSubmitting") : t("dealer", "applySubmit")}</span>
                    <ArrowRight className="h-4 w-4 transition-transform duration-300 ease-out group-hover:translate-x-1" />
                  </button>
                </motion.div>
              </motion.form>
            </SlideReveal>
          </div>
        </div>
      </section>

      {/* ================= RESPONSE STRIP ================= */}
      <section className="mx-auto w-full max-w-6xl px-5 pt-8 sm:px-6">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={VIEWPORT}
          className="flex flex-col items-center gap-4 rounded-[24px] bg-gradient-to-br from-green-900 to-green-800 px-6 py-7 text-center shadow-glass sm:flex-row sm:justify-center sm:text-left"
        >
          <span className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-white/15 text-white">
            <Headphones className="h-6 w-6" />
          </span>
          <div>
            <h3 className={`font-heading text-lg font-bold text-white ${mr}`}>
              {t("dealer", "respondTitleBefore")} <span className="text-amber-300">{t("dealer", "respondHighlight")}</span>
            </h3>
            <p className={`text-sm text-green-100/80 ${mr}`}>{t("dealer", "respondSub")}</p>
          </div>
        </motion.div>
      </section>

      {/* ================= AVAILABLE DEALERS ================= */}
      <section id="dealers" className="mx-auto w-full max-w-6xl scroll-mt-24 px-5 py-16 sm:px-6 sm:py-20">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={VIEWPORT}
          className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between"
        >
          <div>
            <div className={`inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-brand-green ${mr}`}>
              <Sprout className="h-3.5 w-3.5" />
              {t("dealer", "availableEyebrow")}
            </div>
            <h2 className={`mt-3 font-heading text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl ${mr}`}>
              {t("dealer", "availableTitle")}
            </h2>
            <p className={`mt-3 max-w-xl text-[15px] leading-relaxed text-gray-500 ${mr}`}>
              {t("dealer", "availableSub")}
            </p>
          </div>
          <p className={`shrink-0 text-sm text-gray-500 ${mr}`}>
            {t("dealer", "showing")} <span className="font-bold text-gray-900">{DEALERS.length} {t("dealer", "dealersCount")}</span>
          </p>
        </motion.div>

        <motion.div
          variants={gridContainer}
          initial="hidden"
          whileInView="show"
          viewport={VIEWPORT}
          className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-7"
        >
          {DEALERS.map((d, i) => (
            <motion.article
              key={d.name}
              variants={dealerCardVariants}
              custom={i}
              className="group flex h-full flex-col rounded-[24px] border border-gray-100 bg-white p-6 shadow-soft transition-[transform,box-shadow,border-color] duration-300 ease-out hover:-translate-y-1.5 hover:border-green-200 hover:shadow-[0_34px_70px_-30px_rgba(16,20,24,0.4)]"
            >
              <span className={`inline-flex w-fit items-center gap-1.5 rounded-full bg-green-100 px-3 py-1 text-[11px] font-semibold text-green-800 ${mr}`}>
                <BadgeCheck className="h-3.5 w-3.5" />
                {t("dealer", "authorizedBadge")}
              </span>

              <h3 className="mt-4 font-heading text-lg font-bold text-gray-900">{d.name}</h3>
              <p className="mt-1 text-sm font-semibold text-brand-green">{d.person}</p>

              <div className="mt-4 space-y-2.5 text-sm text-gray-600">
                <p className="flex items-start gap-2.5">
                  <MapPin className="mt-0.5 h-4 w-4 flex-shrink-0 text-brand-green" />
                  <span>{d.address}</span>
                </p>
                <p className="flex items-center gap-2.5">
                  <Phone className="h-4 w-4 flex-shrink-0 text-brand-green" />
                  <a href={`tel:${d.phone.replace(/\s+/g, "")}`} className="transition-colors hover:text-brand-green">
                    {d.phone}
                  </a>
                </p>
                <p className="flex items-center gap-2.5">
                  <Mail className="h-4 w-4 flex-shrink-0 text-brand-green" />
                  <a href={`mailto:${d.email}`} className="break-all transition-colors hover:text-brand-green">
                    {d.email}
                  </a>
                </p>
              </div>

              <div className="mt-4">
                <p className={`mb-2 text-[11px] font-semibold uppercase tracking-wider text-gray-400 ${mr}`}>
                  {t("dealer", "availableProducts")}
                </p>
                <div className="flex flex-wrap gap-2">
                  {d.products.map((p) => (
                    <span key={p} className="rounded-full border border-green-100 bg-green-50 px-2.5 py-1 text-xs font-medium text-green-700">
                      {p}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-6 flex items-center gap-3 pt-2">
                <a
                  href={`tel:${d.phone.replace(/\s+/g, "")}`}
                  className="group/btn inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-brand-green px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-[transform,background-color] duration-300 ease-out hover:scale-[1.03] hover:bg-brand-greenDark"
                >
                  <Phone className="h-4 w-4" />
                  <span className={mr}>{t("dealer", "callDealer")}</span>
                </a>
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(d.address)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex flex-1 items-center justify-center gap-2 rounded-full border border-gray-200 px-4 py-2.5 text-sm font-semibold text-gray-700 transition-[transform,border-color,color] duration-300 ease-out hover:scale-[1.03] hover:border-brand-green hover:text-brand-green"
                >
                  <Navigation className="h-4 w-4" />
                  <span className={mr}>{t("dealer", "directions")}</span>
                </a>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </section>

      {/* ================= FAQ ================= */}
      <DealerFAQ />
    </div>
  );
}
