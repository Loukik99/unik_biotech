import { useState } from "react";
import { MapPin, Phone, Search, Users, ArrowRight, CheckCircle, Send } from "lucide-react";
import { toast } from "sonner";
import { useLang } from "@/context/LanguageContext";
import SEO from "@/components/SEO";

const DISTRICTS = [
  "Nashik", "Pune", "Chhatrapati Sambhajinagar", "Ahilyanagar", "Solapur", "Satara", "Sangli", "Kolhapur",
  "Jalgaon", "Dhule", "Nandurbar", "Nagpur", "Amravati", "Akola", "Buldhana", "Dharashiv",
  "Latur", "Nanded", "Parbhani", "Hingoli", "Beed", "Jalna", "Washim", "Yavatmal",
  "Wardha", "Chandrapur", "Gadchiroli", "Gondiya", "Bhandara", "Raigad", "Ratnagiri",
  "Sindhudurg", "Thane", "Mumbai", "Palghar"
];

export default function DealerLocator() {
  const { t, lang } = useLang();
  const districtList = DISTRICTS;
  const [searchDistrict, setSearchDistrict] = useState("");
  const [searchResult, setSearchResult] = useState(null);
  const [form, setForm] = useState({ name: "", phone: "", district: "", village: "" });
  const [loading, setLoading] = useState(false);

  const handleSearch = (e) => {
    e.preventDefault();
    if (!searchDistrict.trim()) return;
    const found = DISTRICTS.find((d) => d.toLowerCase().includes(searchDistrict.toLowerCase()));
    setSearchResult(found ? "found" : "contact");
  };

  const handleDealerSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.phone || !form.district) {
      toast.error(t("dealer", "applyErrFill"));
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
          _subject: `New Dealer Inquiry from ${form.name} in ${form.district}`,
          ...form,
          inquiry_type: "dealer"
        })
      });

      if (response.ok) {
        toast.success(t("dealer", "applySuccess"));
        setForm({ name: "", phone: "", district: "", village: "" });
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
      answer: "Visit our Dealer Locator page at unikbiotechresearch.com/dealer-locator and search by your district. Unik Biotech Research has dealers across 35+ districts in Maharashtra including Nashik, Pune, Chhatrapati Sambhajinagar, Solapur, Satara, Sangli, Kolhapur, and more."
    },
    {
      question: "How do I become a Unik Biotech Research dealer?",
      answer: "To become a Unik Biotech Research dealer, fill out the dealer application form on our Dealer Locator page with your name, phone number, district, and village. You can also call us directly at +91 7666272741. Benefits include exclusive distribution rights, marketing support, and access to 100+ quality agricultural products."
    },
    {
      question: "In which districts does Unik Biotech Research have dealers?",
      answer: "Unik Biotech Research has dealers across Maharashtra including Nashik, Pune, Chhatrapati Sambhajinagar, Ahilyanagar, Solapur, Satara, Sangli, Kolhapur, Jalgaon, Dhule, Nandurbar, Nagpur, Amravati, Akola, Buldhana, and many more districts."
    }
  ];

  return (
    <div className="page-enter">
      <SEO
        title="Dealer Locator — Find a Dealer or Become One"
        description="Find a Unik Biotech Research dealer near you across 35+ districts in Maharashtra. Or apply to become a dealer of our premium organic fertilizers, biostimulants & agricultural products."
        keywords="Unik Biotech Research dealers, find fertilizer dealer Maharashtra, buy Unik Biotech Research products, become a fertilizer dealer, Unik Biotech Research distributors, agricultural products dealer, Nashik fertilizer dealer, organic fertilizer distributor"
        url="https://unikbiotechresearch.com/dealer-locator"
        lang={lang}
        faqSchema={dealerFAQs}
        breadcrumbs={[
          { name: "Home", url: "https://unikbiotechresearch.com/" },
          { name: "Dealer Locator", url: "https://unikbiotechresearch.com/dealer-locator" }
        ]}
      />
      {/* Header */}
      <section className="bg-green-800 px-4 pb-16 pt-28 text-center sm:pt-32">
        <h1 className="font-heading font-extrabold text-white text-4xl sm:text-5xl md:text-6xl mb-4 tracking-tight animate-fadeInUp">
          {t("dealer", "title")}
        </h1>
        <p className="text-green-200 text-base sm:text-lg max-w-2xl mx-auto animate-fadeInUp delay-200">
          {t("dealer", "sub")}
        </p>
      </section>

      <section className="py-16 px-4 bg-[#fcfdfa]">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Find a Dealer */}
          <div className="bg-white rounded-3xl border border-gray-100 p-8 shadow-sm">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center">
                <Search className="w-5 h-5 text-green-800" />
              </div>
              <h2 className="font-heading font-bold text-gray-900 text-2xl">{t("dealer", "searchTitle")}</h2>
            </div>
            <p className="text-gray-500 text-sm mb-6">{t("dealer", "searchSub")}</p>
            <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-3 mb-6" data-testid="dealer-search-form">
              <div className="relative flex-1">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  value={searchDistrict}
                  onChange={(e) => { setSearchDistrict(e.target.value); setSearchResult(null); }}
                  placeholder={t("dealer", "districtPlaceholder")}
                  data-testid="dealer-search-input"
                  className="w-full pl-9 pr-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-green-500 text-sm"
                />
              </div>
              <button
                type="submit"
                data-testid="dealer-search-btn"
                className="w-full sm:w-auto px-5 py-3 rounded-xl bg-green-800 text-white font-semibold hover:bg-green-700 transition-colors"
              >
                {t("dealer", "searchBtn")}
              </button>
            </form>

            {/* Search Result */}
            {searchResult === "found" && (
              <div className="bg-green-50 border border-green-200 rounded-2xl p-5 animate-fadeIn mb-6">
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-700 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-green-800 mb-1">
                      {t("dealer", "foundTitle")}
                    </p>
                    <p className="text-green-700 text-sm">
                      {t("dealer", "foundDesc")}
                    </p>
                    <a href="tel:+917666272741" className="inline-flex items-center gap-2 mt-3 px-4 py-2 rounded-full bg-green-800 text-white text-sm font-semibold hover:bg-green-700 transition-colors">
                      <Phone className="w-4 h-4" /> +91 7666272741
                    </a>
                  </div>
                </div>
              </div>
            )}
            {searchResult === "contact" && (
              <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5 animate-fadeIn mb-6">
                <p className="font-semibold text-amber-800 mb-1">
                  {t("dealer", "notFoundTitle")}
                </p>
                <p className="text-amber-700 text-sm">
                  {t("dealer", "notFoundDesc")}
                </p>
              </div>
            )}

            {/* District list */}
            <div>
              <p className="text-xs text-gray-400 font-semibold uppercase tracking-wider mb-3">
                {t("dealer", "districtsServes")}
              </p>
              <div className="flex flex-wrap gap-2 max-h-48 overflow-y-auto">
                {districtList.map((d) => (
                  <span key={d} className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-xs font-medium cursor-pointer hover:bg-green-50 hover:text-green-800 transition-colors"
                    onClick={() => { setSearchDistrict(d); setSearchResult(null); }}>
                    {d}
                  </span>
                ))}
              </div>
            </div>

            {/* Head Office */}
            <div className="mt-6 bg-gray-50 rounded-2xl p-5 border border-gray-100">
              <h4 className="font-heading font-bold text-gray-900 mb-3">
                {t("dealer", "headOffice")}
              </h4>
              <div className="space-y-2 text-sm text-gray-600">
                <div className="flex items-start gap-2"><MapPin className="w-4 h-4 text-green-700 mt-0.5 flex-shrink-0" />
                  <span>B-178, S.S. Co-Op. Ind. Estate, Pimpalgaon (B), Nashik - 422 209</span></div>
                <div className="flex items-center gap-2"><Phone className="w-4 h-4 text-green-700" />
                  <a href="tel:+917666272741" className="text-green-700 font-medium hover:underline">+91 7666272741</a></div>
              </div>
            </div>
          </div>

          {/* Become a Dealer */}
          <div>
            <div className="bg-white rounded-3xl border border-gray-100 p-8 shadow-sm mb-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-amber-100 rounded-xl flex items-center justify-center">
                  <Users className="w-5 h-5 text-amber-700" />
                </div>
                <h2 className="font-heading font-bold text-gray-900 text-2xl">{t("dealer", "becomeTitle")}</h2>
              </div>
              <p className="text-gray-500 text-sm mb-5">{t("dealer", "becomeSub")}</p>

              {/* Benefits */}
              <ul className="space-y-2.5 mb-6">
                {(t("dealer", "benefits") || []).map((b, i) => (
                  <li key={i} className="flex items-start gap-2.5">
                    <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-gray-600">{b}</span>
                  </li>
                ))}
              </ul>

              <form onSubmit={handleDealerSubmit} className="space-y-4" data-testid="dealer-apply-form">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">{t("dealer", "applyName")} *</label>
                    <input type="text" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
                      data-testid="dealer-name"
                      placeholder={t("dealer", "namePlaceholder")}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-green-500 text-sm" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">{t("dealer", "applyPhone")} *</label>
                    <input type="tel" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      data-testid="dealer-phone"
                      placeholder="+91 XXXXX XXXXX"
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-green-500 text-sm" />
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">{t("dealer", "applyDistrict")} *</label>
                    <input type="text" value={form.district} onChange={(e) => setForm({ ...form, district: e.target.value })}
                      data-testid="dealer-district"
                      placeholder={t("dealer", "districtPlaceholder")}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-green-500 text-sm" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">{t("dealer", "applyVillage")}</label>
                    <input type="text" value={form.village} onChange={(e) => setForm({ ...form, village: e.target.value })}
                      data-testid="dealer-village"
                      placeholder={t("dealer", "villagePlaceholder")}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-green-500 text-sm" />
                  </div>
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  data-testid="dealer-submit"
                  className="w-full flex items-center justify-center gap-3 py-4 rounded-full bg-amber-500 text-white font-semibold hover:bg-amber-600 transition-all duration-200 hover:scale-[1.02] disabled:opacity-70 shadow-lg shadow-amber-500/30"
                >
                  <Send className="w-4 h-4" />
                  <span>{loading ? t("dealer", "applyBtnSubmitting") : t("dealer", "applySubmit")}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
