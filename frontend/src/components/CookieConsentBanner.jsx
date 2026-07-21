import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const STORAGE_KEY = "cookieConsent";

export default function CookieConsentBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem(STORAGE_KEY)) {
      setVisible(true);
    }
  }, []);

  const saveChoice = (choice) => {
    localStorage.setItem(STORAGE_KEY, choice);
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-label="Cookie consent"
      className="fixed bottom-0 left-0 right-0 z-[9998] border-t border-gray-200 bg-white/95 px-4 py-4 shadow-[0_-8px_30px_-12px_rgba(0,0,0,0.2)] backdrop-blur-md sm:px-6"
    >
      <div className="mx-auto flex w-full max-w-6xl flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm leading-relaxed text-gray-700">
          We use cookies to improve your browsing experience.{" "}
          <Link to="/cookie-policy" className="font-semibold text-brand-green underline-offset-2 hover:underline">
            Cookie Policy
          </Link>
        </p>
        <div className="flex shrink-0 items-center gap-2">
          <Button variant="outline" size="sm" onClick={() => saveChoice("rejected")}>
            Reject
          </Button>
          <Button variant="primary" size="sm" onClick={() => saveChoice("accepted")}>
            Accept
          </Button>
        </div>
      </div>
    </div>
  );
}
