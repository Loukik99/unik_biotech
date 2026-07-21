import "@/App.css";
import { Suspense, lazy, useEffect, useCallback } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { MotionConfig } from "motion/react";
import { LanguageProvider } from "@/context/LanguageContext";
import { Toaster } from "sonner";
import Navbar from "@/components/Navbar";
import LandingNav from "@/components/landing/LandingNav";
import Footer from "@/components/Footer";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import CookieConsentBanner from "@/components/CookieConsentBanner";

const Home = lazy(() => import("@/pages/Home"));
const About = lazy(() => import("@/pages/About"));
const Products = lazy(() => import("@/pages/Products"));
const Contact = lazy(() => import("@/pages/Contact"));
const DealerLocator = lazy(() => import("@/pages/DealerLocator"));
const CookiePolicy = lazy(() => import("@/pages/CookiePolicy"));
const PrivacyPolicy = lazy(() => import("@/pages/PrivacyPolicy"));
const TermsAndConditions = lazy(() => import("@/pages/TermsAndConditions"));

function ScrollToTop() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    // If there's a hash in the URL, let HashScroll handle it instead
    if (hash) return;
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [pathname, hash]);
  return null;
}

/** Scrolls to the element matching the URL hash after navigation completes. */
function HashScroll() {
  const { hash } = useLocation();
  const scrollToHash = useCallback(() => {
    if (!hash) return;
    const id = hash.replace("#", "");
    // Small delay to let the page render and ScrollToTop settle
    const timer = setTimeout(() => {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }, 100);
    return () => clearTimeout(timer);
  }, [hash]);

  useEffect(() => {
    scrollToHash();
  }, [scrollToHash]);

  return null;
}

function PageLoader() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#fcfdfa]">
      <div className="w-10 h-10 rounded-full border-4 border-green-100 border-t-green-700 animate-spin"></div>
    </div>
  );
}

// Pages that lead with a full-bleed dark hero reuse the homepage's floating
// glass navbar (transparent overlay at the top → cream glass pill on scroll)
// so they feel like a seamless extension of the landing page.
const OVERLAY_NAV_ROUTES = ["/about", "/contact", "/products", "/dealer-locator"];

function AppShell() {
  const { pathname } = useLocation();
  // The editorial homepage ships its own floating nav (and, later, footer),
  // so suppress the global chrome there while keeping it on every other page.
  const isLanding = pathname === "/";
  const useOverlayNav = OVERLAY_NAV_ROUTES.includes(pathname);

  return (
    <>
      <ScrollToTop />
      <HashScroll />
      {!isLanding && (useOverlayNav ? <LandingNav /> : <Navbar />)}
      <main className="min-h-screen">
        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/products" element={<Products />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/dealer-locator" element={<DealerLocator />} />
            <Route path="/cookie-policy" element={<CookiePolicy />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
            <Route path="*" element={<Home />} />
          </Routes>
        </Suspense>
      </main>
      {!isLanding && <Footer />}
      <CookieConsentBanner />
      <FloatingWhatsApp />
      <Toaster position="top-right" richColors />
    </>
  );
}

function App() {
  return (
    <LanguageProvider>
      {/* reducedMotion="user" makes every Framer Motion animation (reveals,
          hero, etc.) automatically drop transforms and only cross-fade when the
          visitor has requested reduced motion. */}
      <MotionConfig reducedMotion="user">
        <BrowserRouter>
          <AppShell />
        </BrowserRouter>
      </MotionConfig>
    </LanguageProvider>
  );
}

export default App;
