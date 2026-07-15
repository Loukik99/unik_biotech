import { useState } from "react";
import { motion } from "motion/react";
import { Search, X, ChevronRight, Package, Droplets, Layers, CheckCircle } from "lucide-react";
import { useLang } from "@/context/LanguageContext";
import { PRODUCTS, PRODUCT_CATEGORIES } from "@/data/products";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import ProductImage from "@/components/common/ProductImage";
import SEO from "@/components/SEO";

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
      {/* Header */}
      <section className="bg-green-800 px-4 pb-16 pt-28 text-center sm:pt-32">
        <h1 className="font-heading font-extrabold text-white text-4xl sm:text-5xl md:text-6xl mb-4 tracking-tight animate-fadeInUp">
          {t("products", "title")}
        </h1>
        <p className="text-green-200 text-base sm:text-lg max-w-2xl mx-auto animate-fadeInUp delay-200">
          {t("products", "sub")}
        </p>
      </section>

      {/* Filters */}
      <section className="sticky top-16 z-30 bg-white/95 backdrop-blur-md border-b border-gray-100 py-4 px-4 shadow-sm">
        <div className="max-w-7xl mx-auto">
          {/* Search */}
          <div className="relative max-w-sm mb-4">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder={t("products", "searchLabel")}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              data-testid="product-search"
              className="w-full pl-9 pr-4 py-2.5 rounded-full border border-gray-200 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm"
            />
            {search && (
              <button onClick={() => setSearch("")} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
          {/* Category filters */}
          <div className="flex flex-wrap gap-2">
            {PRODUCT_CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                data-testid={`filter-${cat.id}`}
                className={`px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200 ${activeCategory === cat.id
                  ? "bg-green-800 text-white shadow-md"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
              >
                {t("categories", cat.id)}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Product Grid */}
      <section className="py-12 px-4 bg-[#fcfdfa] min-h-[50vh]">
        <div className="max-w-7xl mx-auto">
          <p className="text-gray-400 text-sm mb-6">
            {filtered.length} {t("products", "productCountLabel")}
          </p>
          {filtered.length === 0 ? (
            <div className="text-center py-20">
              <Package className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-400">{t("products", "noResults")}</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {filtered.map((product, index) => {
                const catColor = PRODUCT_CATEGORIES.find((c) => c.id === product.category)?.color || "bg-gray-100 text-gray-700";
                return (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.15 }}
                    transition={{ duration: 0.5, ease: "easeOut", delay: (index % 4) * 0.08 }}
                    className="h-full"
                  >
                    <div
                      className="bg-white rounded-2xl border border-gray-100 p-5 group hover:shadow-2xl hover:border-green-200 hover:-translate-y-1.5 transition-all duration-300 ease-out cursor-pointer flex flex-col h-full"
                      onClick={() => setSelected(product)}
                      data-testid={`product-card-${product.id}`}
                    >
                      <div className="relative mb-4 aspect-[4/3] overflow-hidden rounded-xl bg-gray-50">
                        <ProductImage
                          src={product.image}
                          alt={product.name}
                          imgClassName="w-full h-full object-contain p-2 mix-blend-multiply transition-transform duration-500 ease-out group-hover:scale-110"
                          fallback={
                            <div className="w-full h-full flex items-center justify-center text-gray-300">
                              <Package className="w-12 h-12" />
                            </div>
                          }
                        />
                        <span className={`absolute top-2 right-2 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wide ${catColor}`}>
                          {product.category}
                        </span>
                      </div>

                      <div className="flex-1">
                        <span className={`inline-block text-xs font-semibold mb-2 ${catColor.replace('bg-', 'text-').replace('100', '600')}`}>
                          {product.tagline}
                        </span>
                        <h3 className="font-heading font-bold text-gray-900 text-lg mb-2 leading-tight group-hover:text-green-800 transition-colors">
                          {product.name}
                        </h3>
                        <p className="text-xs text-gray-500 leading-relaxed line-clamp-2">
                          {product.description}
                        </p>
                      </div>

                      <div className="mt-4 pt-4 border-t border-gray-50 flex items-center justify-between text-xs font-semibold text-green-700/80 transition-colors duration-300 group-hover:text-green-800">
                        <span>{t("products", "viewDetails")}</span>
                        <div className="w-6 h-6 rounded-full bg-green-50 flex items-center justify-center transition-all duration-300 group-hover:bg-green-100 group-hover:translate-x-0.5">
                          <ChevronRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5" />
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      <ProductDetailDialog
        product={selected}
        open={!!selected}
        onClose={() => setSelected(null)}
      />
    </div>
  );
}
