import "@/App.css";
import { Suspense, lazy, useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { MotionConfig } from "motion/react";
import { LanguageProvider } from "@/context/LanguageContext";
import { Toaster } from "sonner";
import Navbar from "@/components/Navbar";
import LandingNav from "@/components/landing/LandingNav";
import Footer from "@/components/Footer";

const Home = lazy(() => import("@/pages/Home"));
const About = lazy(() => import("@/pages/About"));
const Products = lazy(() => import("@/pages/Products"));
const Contact = lazy(() => import("@/pages/Contact"));
const DealerLocator = lazy(() => import("@/pages/DealerLocator"));

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [pathname]);
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
      {!isLanding && (useOverlayNav ? <LandingNav /> : <Navbar />)}
      <main className="min-h-screen">
        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/products" element={<Products />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/dealer-locator" element={<DealerLocator />} />
            <Route path="*" element={<Home />} />
          </Routes>
        </Suspense>
      </main>
      {!isLanding && <Footer />}
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
