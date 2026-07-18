import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "motion/react";
import { Search, X, ArrowRight, Package, Droplets, Layers, CheckCircle, Sparkles, Leaf } from "lucide-react";
import { useLang } from "@/context/LanguageContext";
import { PRODUCTS, PRODUCT_CATEGORIES } from "@/data/products";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import ProductImage from "@/components/common/ProductImage";
import SEO from "@/components/SEO";

const HERO_IMG = "/unik/mustard-field";

// Compact, editorial badge labels for the product cards (data unchanged).
const BADGE_LABEL = {
  micronutrient: "Micronutrient",
  biostimulant: "Biostimulant",
  protection: "Protection",
  soil: "Soil Conditioner",
  biofertilizer: "Bio Fertilizer",
  spreader: "Spreader & Sticker",
};

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

const pillsContainer = { hidden: {}, show: { transition: { staggerChildren: 0.05 } } };
const pillItem = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
};

// Cards alternate: even index enters from the left, odd from the right, with a
// gentle per-row stagger.
const cardVariants = {
  hidden: (i) => ({ opacity: 0, x: i % 2 === 0 ? -46 : 46 }),
  show: (i) => ({
    opacity: 1,
    x: 0,
    transition: { duration: 0.7, ease: "easeOut", delay: (i % 4) * 0.05 },
  }),
};

function ProductDetailDialog({ product, open, onClose }) {
  const { t } = useLang();
  if (!product) return null;
  const formIcon = product.form === "Liquid" ? Droplets : product.form === "Granules" ? Layers : Package;
  const FormIcon = formIcon;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto" data-testid="product-detail-dialog">
        <DialogHeader>
          <div className="flex flex-col md:flex-row gap-6 mt-2">
            <div className="w-full md:w-1/3 aspect-square bg-white rounded-xl border border-gray-100 p-4 flex items-center justify-center relative overflow-hidden">
              <ProductImage
                src={product.image}
                alt={product.name}
                imgClassName="w-full h-full object-contain mix-blend-multiply"
                fallback={<Package className="w-16 h-16 text-gray-200" />}
              />
            </div>
            <div className="flex-1">
              <span className={`inline-block px-2.5 py-1 rounded-full text-xs font-semibold mb-3 ${PRODUCT_CATEGORIES.find(c => c.id === product.category)?.color || "bg-gray-100 text-gray-700"
                }`}>
                {product.tagline}
              </span>
              <DialogTitle className="font-heading text-3xl font-bold text-gray-900 mb-2">{product.name}</DialogTitle>
              <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
                <FormIcon className="w-4 h-4" />
                <span>{product.form}</span>
                {product.packing && (
                  <>
                    <span className="w-1 h-1 rounded-full bg-gray-300" />
                    <span>{product.packing}</span>
                  </>
                )}
              </div>
            </div>
          </div>
        </DialogHeader>
        <div className="space-y-5 mt-2">
          <p className="text-gray-600 leading-relaxed">{product.description}</p>
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-gray-50 rounded-xl p-3 flex items-center gap-3">
              <FormIcon className="w-5 h-5 text-green-700" />
              <div>
                <div className="text-xs text-gray-400">{t("products", "form")}</div>
                <div className="font-semibold text-gray-800 text-sm">{product.form}</div>
              </div>
            </div>
            {product.packing && (
              <div className="bg-gray-50 rounded-xl p-3">
                <div className="text-xs text-gray-400 mb-1">{t("products", "packing")}</div>
                <div className="font-semibold text-gray-800 text-sm">{product.packing}</div>
              </div>
            )}
          </div>
          <div>
            <h4 className="font-heading font-bold text-gray-900 mb-3">{t("products", "benefits")}</h4>
            <ul className="space-y-2">
              {product.benefits.map((b, i) => (
                <li key={i} className="flex items-start gap-2.5 text-gray-600 text-sm">
                  <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                  {b}
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-green-50 rounded-xl p-4">
            <h4 className="font-heading font-bold text-gray-900 mb-2 text-sm">{t("products", "composition")}</h4>
            <p className="text-gray-600 text-sm">{product.composition}</p>
          </div>
          <div className="bg-amber-50 rounded-xl p-4">
            <h4 className="font-heading font-bold text-gray-900 mb-2 text-sm">{t("products", "dosage")}</h4>
            <p className="text-gray-600 text-sm leading-relaxed">{product.dosage}</p>
          </div>
          {product.crops?.length > 0 && (
            <div>
              <h4 className="font-heading font-bold text-gray-900 mb-3 text-sm">{t("products", "crops")}</h4>
              <div className="flex flex-wrap gap-2">
                {product.crops.map((crop) => (
                  <span key={crop} className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">{crop}</span>
                ))}
              </div>
            </div>
          )}
          <a
            href="tel:+917666272741"
            data-testid="product-enquire-btn"
            className="block w-full text-center py-3.5 rounded-full bg-green-800 text-white font-semibold hover:bg-green-700 transition-colors"
          >
            {t("products", "enquireCall")}
          </a>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default function Products() {
  const { t, lang } = useLang();
  const [activeCategory, setActiveCategory] = useState("all");
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState(null);

  const filtered = PRODUCTS.filter((p) => {
    const matchCat = activeCategory === "all" || p.category === activeCategory;
    const q = search.toLowerCase();
    const matchSearch = !q || p.name.toLowerCase().includes(q) || p.description.toLowerCase().includes(q) || p.tagline.toLowerCase().includes(q);
    return matchCat && matchSearch;
  });

  const productListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "Unik Biotech Research Product Catalog",
    "description": "Complete catalog of agricultural products by Unik Biotech Research including organic fertilizers, biostimulants, micronutrient fertilizers, crop protection, soil conditioners, and bio fertilizers.",
    "numberOfItems": PRODUCTS.length,
    "itemListElement": PRODUCTS.filter(p => p.featured).map((product, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "item": {
        "@type": "Product",
        "name": product.name,
        "description": product.description,
        "brand": {
          "@type": "Brand",
          "name": "Unik Biotech Research"
        },
        "manufacturer": {
          "@type": "Organization",
          "name": "Unik Biotech Research"
        },
        "category": product.category,
        ...(product.image ? { "image": `https://unikbiotechresearch.com${product.image}` } : {})
      }
    }))
  };

  const productFAQs = [
    {
      question: "What are the best organic fertilizers from Unik Biotech Research?",
      answer: "Unik Biotech Research's top organic fertilizers include AMINORICH (80% amino acids with 18 types), AGROMIC RICH (potassium humate with 71-72% humic acid), UNISEARICH (100% organic seaweed extract from Ascophyllum nodosum), and BROUN GOLD (80% fulvic acid). All are designed for sustainable, high-yield farming."
    },
    {
      question: "What is AMINORICH and how does it help crops?",
      answer: "AMINORICH is a powerful product containing 80% amino acids in powder form with 18 different types. It speeds up plant metabolism, helps in all growth stages, increases microflora and microfauna in soil, and 2-3 sprays show a sizable yield increase. It is suitable for all crops including cotton, banana, pomegranate, grapes, tomato, soybean, and chili."
    },
    {
      question: "Does Unik Biotech Research offer crop protection products?",
      answer: "Yes, Unik Biotech Research offers herbal and organic crop protection products including SUCCESS (herbal thrips and mites control), REMEDY (herbal larvae control), UNILEXIN (downy mildew fungicide), FAST-40 (potassium phosphonate), UNIBACT (bactericide), KUNDAL (100% natural herbal biocide), and ANTINEMATODE (nematode and root rot control)."
    },
    {
      question: "Which Unik Biotech Research product is best for grape cultivation?",
      answer: "For grape cultivation, Unik Biotech Research recommends ROYAL PLUS (zinc amino acids for bunch quality), LONGER-E (berry elongation), UNIBORO ZINC (prevents short berries), UNISEARICH (seaweed extract for micro-bunch formation), FERROUS EDDHA (iron for high pH soils), and FAST-40 (downy mildew control)."
    }
  ];

  return (
    <div className="page-enter">
      <SEO
        title="Our Products — Organic Fertilizers, Biostimulants & Crop Protection"
        description="Explore 100+ agricultural products by Unik Biotech Research: AMINORICH, EXCESS, UNISEARICH, AGROMIC RICH, RHYZOMAX, micronutrient fertilizers, herbal crop protection, soil conditioners & bio fertilizers for all crops."
        keywords="Unik Biotech Research products, AMINORICH amino acid fertilizer, EXCESS biostimulant, UNISEARICH seaweed extract, AGROMIC RICH potassium humate, RHYZOMAX root stimulant, organic fertilizer India, crop protection herbal, micronutrient chelated fertilizer, grape fertilizer, pomegranate fertilizer, cotton fertilizer"
        url="https://unikbiotechresearch.com/products"
        lang={lang}
        schema={productListSchema}
        faqSchema={productFAQs}
        breadcrumbs={[
          { name: "Home", url: "https://unikbiotechresearch.com/" },
          { name: "Products", url: "https://unikbiotechresearch.com/products" }
        ]}
      />
      {/* ================= HERO ================= */}
      <section className="relative isolate flex min-h-[520px] w-full items-center overflow-hidden lg:min-h-[600px]">
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
              alt="Blooming mustard field at golden hour"
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

        <div className="mx-auto w-full max-w-6xl px-5 pt-28 pb-28 sm:px-6 sm:pt-32">
          <motion.div
            variants={heroContainer}
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT}
            className="max-w-2xl"
          >
            <motion.h1
              variants={heroItem}
              className="font-heading text-5xl font-bold leading-[0.98] tracking-[-0.02em] text-farm-cream sm:text-6xl lg:text-7xl"
            >
              {t("products", "title")}
            </motion.h1>
            <motion.p
              variants={heroItem}
              className="mt-6 max-w-xl text-[15px] leading-relaxed text-farm-cream/80 sm:text-base"
            >
              {t("products", "sub")}
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* ================= SEARCH + FILTERS (floating) ================= */}
      <div className="relative z-20 mx-auto -mt-14 w-full max-w-6xl px-5 sm:-mt-20 sm:px-6">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={VIEWPORT}
          className="rounded-[24px] border border-gray-100 bg-white p-5 shadow-[0_30px_70px_-30px_rgba(16,20,24,0.35)] sm:p-6"
        >
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            {/* Search */}
            <div className="relative w-full sm:max-w-sm">
              <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder={t("products", "searchLabel")}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                data-testid="product-search"
                className="w-full rounded-full border border-gray-200 bg-gray-50/70 py-3 pl-11 pr-10 text-sm text-gray-800 placeholder-gray-400 outline-none transition-[background-color,border-color,box-shadow] duration-300 ease-out focus:border-brand-green/60 focus:bg-white focus:shadow-lg focus:shadow-brand-green/15 focus:ring-2 focus:ring-brand-green/20"
              />
              {search && (
                <button
                  onClick={() => setSearch("")}
                  aria-label="Clear search"
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 transition-colors hover:text-gray-600"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>
            {/* Count badge */}
            <div className="inline-flex shrink-0 items-center gap-2 rounded-full border border-green-100 bg-green-50 px-4 py-2 text-sm font-semibold text-green-800">
              <Sparkles className="h-4 w-4" />
              {filtered.length} {t("products", "productCountLabel")}
            </div>
          </div>

          {/* Category pills */}
          <motion.div
            variants={pillsContainer}
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT}
            className="mt-5 flex flex-wrap gap-2"
          >
            {PRODUCT_CATEGORIES.map((cat) => (
              <motion.button
                key={cat.id}
                variants={pillItem}
                onClick={() => setActiveCategory(cat.id)}
                data-testid={`filter-${cat.id}`}
                className={`rounded-full px-4 py-2 text-sm font-semibold transition-[background-color,color,box-shadow,transform] duration-200 ease-out ${
                  activeCategory === cat.id
                    ? "bg-brand-green text-white shadow-md shadow-green-900/20"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {t("categories", cat.id)}
              </motion.button>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* ================= PRODUCT GRID ================= */}
      <section className="bg-[#fcfdfa] px-5 pb-6 pt-10 sm:px-6 sm:pt-12">
        <div className="mx-auto min-h-[40vh] max-w-6xl">
          {filtered.length === 0 ? (
            <div className="py-20 text-center">
              <Package className="mx-auto mb-4 h-12 w-12 text-gray-300" />
              <p className="text-gray-400">{t("products", "noResults")}</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {filtered.map((product, index) => {
                const catColor =
                  PRODUCT_CATEGORIES.find((c) => c.id === product.category)?.color ||
                  "bg-gray-100 text-gray-700";
                return (
                  <motion.div
                    key={product.id}
                    custom={index}
                    variants={cardVariants}
                    initial="hidden"
                    whileInView="show"
                    viewport={VIEWPORT}
                    className="h-full"
                  >
                    <div
                      className="group flex h-full cursor-pointer flex-col rounded-[28px] border border-gray-100 bg-white p-5 shadow-soft transition-[transform,box-shadow,border-color] duration-300 ease-out hover:-translate-y-2.5 hover:border-green-200 hover:shadow-[0_40px_80px_-30px_rgba(16,20,24,0.4)]"
                      onClick={() => setSelected(product)}
                      data-testid={`product-card-${product.id}`}
                    >
                      {/* Image */}
                      <div className="relative mb-4 flex aspect-square items-center justify-center overflow-hidden rounded-2xl">
                        <span
                          aria-hidden="true"
                          className="absolute inset-5 rounded-full bg-gradient-to-b from-gray-50 to-green-50/50"
                        />
                        <ProductImage
                          src={product.image}
                          alt={product.name}
                          imgClassName="relative h-full w-full object-contain p-4 mix-blend-multiply transition-transform duration-500 ease-out group-hover:scale-105"
                          fallback={
                            <div className="flex h-full w-full items-center justify-center text-gray-300">
                              <Package className="h-12 w-12" />
                            </div>
                          }
                        />
                        <span
                          className={`absolute right-3 top-3 rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide ${catColor}`}
                        >
                          {BADGE_LABEL[product.category] || product.category}
                        </span>
                      </div>

                      {/* Body */}
                      <div className="flex-1 px-1">
                        <h3 className="font-heading text-lg font-bold leading-tight text-gray-900 transition-colors duration-300 group-hover:text-brand-green">
                          {product.name}
                        </h3>
                        <p className="mt-1.5 text-xs font-semibold text-brand-green/80">
                          {product.tagline}
                        </p>
                        <p className="mt-2 text-sm leading-relaxed text-gray-500 line-clamp-2">
                          {product.description}
                        </p>
                      </div>

                      {/* Footer */}
                      <div className="mt-5 flex items-center justify-between px-1">
                        <span className="text-sm font-semibold text-brand-green">
                          {t("products", "viewDetails")}
                        </span>
                        <span className="flex h-8 w-8 items-center justify-center rounded-full border border-green-100 bg-green-50 text-brand-green transition-[transform,background-color] duration-300 ease-out group-hover:translate-x-1 group-hover:bg-green-100">
                          <ArrowRight className="h-4 w-4" />
                        </span>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* ================= BOTTOM CTA ================= */}
      <section className="bg-[#fcfdfa] px-5 pb-20 pt-8 sm:px-6">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={VIEWPORT}
          className="relative mx-auto max-w-6xl overflow-hidden rounded-[28px] border border-gray-100 bg-white p-8 shadow-soft sm:p-10"
        >
          {/* Decorative leaf illustration */}
          <Leaf
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-6 -right-4 h-40 w-40 rotate-12 text-brand-green/[0.06]"
            strokeWidth={0.9}
          />
          <div className="relative z-10 flex flex-col items-start gap-6 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-start gap-4">
              <span className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-2xl bg-green-50 text-brand-green">
                <Leaf className="h-6 w-6" strokeWidth={1.75} />
              </span>
              <div>
                <h3 className="font-heading text-xl font-bold text-gray-900 sm:text-2xl">
                  Can&rsquo;t find what you&rsquo;re looking for?
                </h3>
                <p className="mt-1.5 text-sm leading-relaxed text-gray-500">
                  Our team is here to help you choose the right solution for your crops.
                </p>
              </div>
            </div>
            <Link
              to="/contact"
              className="group inline-flex flex-shrink-0 items-center gap-2 rounded-full bg-brand-green px-7 py-3.5 text-[15px] font-semibold text-white shadow-lg shadow-green-900/25 transition-[transform,background-color,box-shadow] duration-300 ease-out hover:scale-[1.03] hover:bg-brand-greenDark"
            >
              Talk to Our Experts
              <ArrowRight className="h-4 w-4 transition-transform duration-300 ease-out group-hover:translate-x-1" />
            </Link>
          </div>
        </motion.div>
      </section>

      <ProductDetailDialog
        product={selected}
        open={!!selected}
        onClose={() => setSelected(null)}
      />
    </div>
  );
}
