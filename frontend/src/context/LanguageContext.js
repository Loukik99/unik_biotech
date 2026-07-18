import { createContext, useContext, useState, useCallback, useEffect } from "react";

import { en } from "../locales/en";
import { mr } from "../locales/mr";
import { hi } from "../locales/hi";

const translations = {
  en,
  mr,
  hi
};

const STORAGE_KEY = "unik-lang";
const DEFAULT_LANG = "en";
const SUPPORTED = Object.keys(translations); // ["en", "mr", "hi"]

/**
 * Read the saved language synchronously (runs before first paint, so the app
 * initializes directly in the saved language with no English flash). Falls back
 * to English when there is no valid saved preference or storage is unavailable.
 */
function getInitialLang() {
  if (typeof window === "undefined") return DEFAULT_LANG;
  try {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    return saved && SUPPORTED.includes(saved) ? saved : DEFAULT_LANG;
  } catch {
    return DEFAULT_LANG;
  }
}

const LanguageContext = createContext(null);

export function LanguageProvider({ children }) {
  const [lang, setLangState] = useState(getInitialLang);

  // Persist the choice and keep <html lang> in sync for accessibility/SEO.
  const setLang = useCallback((next) => {
    if (!SUPPORTED.includes(next)) return;
    setLangState(next);
    try {
      window.localStorage.setItem(STORAGE_KEY, next);
    } catch {
      /* storage unavailable (private mode, etc.) — state still updates */
    }
  }, []);

  useEffect(() => {
    if (typeof document !== "undefined") {
      document.documentElement.lang = lang;
    }
  }, [lang]);

  // Reflect language changes made in other tabs/windows (same browser session).
  useEffect(() => {
    const onStorage = (e) => {
      if (e.key === STORAGE_KEY && e.newValue && SUPPORTED.includes(e.newValue)) {
        setLangState(e.newValue);
      }
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  const t = (section, key) => {
    try { return translations[lang][section][key] || translations["en"][section][key] || key; }
    catch { return key; }
  };
  const tArr = (section, key) => {
    try { return translations[lang][section][key] || translations["en"][section][key] || []; }
    catch { return []; }
  };
  return (
    <LanguageContext.Provider value={{ lang, setLang, t, tArr, translations: translations[lang] }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLang() {
  return useContext(LanguageContext);
}
