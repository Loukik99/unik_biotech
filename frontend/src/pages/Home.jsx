import { useLang } from "@/context/LanguageContext";
import SEO from "@/components/SEO";
import LandingNav from "@/components/landing/LandingNav";
import Hero from "@/components/landing/Hero";
import Mission from "@/components/landing/Mission";
import About from "@/components/landing/About";
import WhatWeOffer from "@/components/landing/WhatWeOffer";
import PanIndiaNetwork from "@/components/landing/PanIndiaNetwork";
import Testimonials from "@/components/landing/Testimonials";
import CallToAction from "@/components/landing/CallToAction";
import Footer from "@/components/Footer";

export default function Home() {
  const { lang } = useLang();

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Unik Biotech Research",
    "alternateName": "Unik Biotech Research",
    "url": "https://unikbiotechresearch.com",
    "logo": "https://unikbiotechresearch.com/official-logo.png",
    "foundingDate": "2005",
    "founder": {
      "@type": "Person",
      "name": "Vilas R. Damre"
    },
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "B-178, S.S. Co-Op. Ind. Estate, Pimpalgaon (B), Tal. Niphad",
      "addressLocality": "Nashik",
      "addressRegion": "Maharashtra",
      "postalCode": "422209",
      "addressCountry": "IN"
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+91-7666272741",
      "contactType": "customer service",
      "email": "Sales@unikbiotechresearch.com",
      "areaServed": "IN",
      "availableLanguage": ["English", "Hindi", "Marathi"]
    },
    "description": "ISO 9001:2008 certified manufacturer of organic fertilizers, biostimulants, micronutrient fertilizers, and crop protection products for Indian agriculture since 2005.",
    "numberOfEmployees": {
      "@type": "QuantitativeValue",
      "minValue": 50
    },
    "knowsAbout": ["Organic Fertilizers", "Biostimulants", "Micronutrient Fertilizers", "Crop Protection", "Soil Conditioners", "Bio Fertilizers", "Agricultural Inputs"],
    "hasCredential": {
      "@type": "EducationalOccupationalCredential",
      "credentialCategory": "certification",
      "name": "ISO 9001:2008"
    }
  };

  const homeFAQs = [
    {
      question: "What is Unik Biotech Research?",
      answer: "Unik Biotech Research is an ISO 9001:2008 certified agricultural inputs company established in 2005 in Nashik, Maharashtra, India. We manufacture over 100 products including organic fertilizers, biostimulants, micronutrient fertilizers, and crop protection solutions for farmers across India."
    },
    {
      question: "What products does Unik Biotech Research offer?",
      answer: "Unik Biotech Research offers a wide range of agricultural products including AMINORICH (80% amino acids), EXCESS (high-power biostimulant), UNISEARICH (organic seaweed extract), AGROMIC RICH (potassium humate), RHYZOMAX (root stimulant), micronutrient fertilizers, crop protection products, soil conditioners, and bio fertilizers."
    },
    {
      question: "Where is Unik Biotech Research located?",
      answer: "Unik Biotech Research is located at B-178, S.S. Co-Op. Ind. Estate, Pimpalgaon (B), Tal. Niphad, Dist. Nashik - 422 209, Maharashtra, India. You can reach us at +91 7666272741 or Sales@unikbiotechresearch.com."
    },
    {
      question: "Are Unik Biotech Research products organic and safe?",
      answer: "Yes, Unik Biotech Research specializes in environment-friendly and non-toxic agricultural inputs. Many of our products like UNISEARICH (100% organic seaweed extract), KUNDAL (natural herbal biocide), and our bio fertilizers are organic and safe for sustainable farming."
    },
    {
      question: "How can I become a Unik Biotech Research dealer?",
      answer: "You can apply to become a Unik Biotech Research dealer by visiting our Dealer Locator page at unikbiotechresearch.com/dealer-locator, filling out the dealer application form, or by contacting us directly at +91 7666272741. We have dealers across Maharashtra."
    }
  ];

  return (
    <div className="page-enter">
      <SEO
        title="Home"
        description="Unik Biotech Research — ISO 9001:2008 certified manufacturer of organic fertilizers, biostimulants, micronutrient fertilizers & crop protection products. Serving Indian farmers since 2005 from Nashik, Maharashtra."
        keywords="organic fertilizers Nashik, biostimulants India, micronutrient fertilizers, crop protection products, agricultural inputs manufacturer, humic acid fertilizer, fulvic acid, amino acid fertilizer, seaweed extract fertilizer, plant growth promoter India, best fertilizer company India"
        lang={lang}
        schema={organizationSchema}
        faqSchema={homeFAQs}
        breadcrumbs={[
          { name: "Home", url: "https://unikbiotechresearch.com/" }
        ]}
      />

      {/* Editorial homepage (VerdaAgro-inspired), built section by section. */}
      <LandingNav />
      <Hero />
      <Mission />
      <About />
      <WhatWeOffer />
      <PanIndiaNetwork />
      <Testimonials />
      <CallToAction />
      <Footer />
    </div>
  );
}
