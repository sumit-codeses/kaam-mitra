import React, { createContext, useContext, useState, useEffect } from 'react';
import { LanguageCode } from '../types';
import { defaultTranslations, TranslationDictionary } from './translations';

interface LanguageContextType {
  language: LanguageCode;
  setLanguage: (lang: LanguageCode) => void;
  t: (key: string, fallback?: string) => string;
  translations: Record<LanguageCode, TranslationDictionary>;
  updateTranslationKey: (lang: LanguageCode, key: string, value: string) => void;
  resetTranslations: () => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const STORAGE_LANG_KEY = 'kaam_sarthi_lang';
const STORAGE_TRANS_KEY = 'kaam_sarthi_custom_trans';

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<LanguageCode>(() => {
    const saved = localStorage.getItem(STORAGE_LANG_KEY) as LanguageCode | null;
    return saved && ['hi', 'en', 'sat'].includes(saved) ? saved : 'hi';
  });

  const [translations, setTranslations] = useState<Record<LanguageCode, TranslationDictionary>>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_TRANS_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        return {
          en: { ...defaultTranslations.en, ...(parsed.en || {}) },
          hi: { ...defaultTranslations.hi, ...(parsed.hi || {}) },
          sat: { ...defaultTranslations.sat, ...(parsed.sat || {}) },
        };
      }
    } catch {
      // ignore
    }
    return defaultTranslations;
  });

  const setLanguage = (lang: LanguageCode) => {
    setLanguageState(lang);
    localStorage.setItem(STORAGE_LANG_KEY, lang);
  };

  const t = (key: string, fallback?: string): string => {
    const dict = translations[language] || defaultTranslations[language] || defaultTranslations.en;
    if (dict && dict[key] !== undefined && dict[key] !== '') {
      return dict[key];
    }
    const enDict = translations.en || defaultTranslations.en;
    if (enDict && enDict[key] !== undefined) {
      return enDict[key];
    }
    return fallback || key;
  };

  const updateTranslationKey = (lang: LanguageCode, key: string, value: string) => {
    setTranslations((prev) => {
      const next = {
        ...prev,
        [lang]: {
          ...prev[lang],
          [key]: value,
        },
      };
      localStorage.setItem(STORAGE_TRANS_KEY, JSON.stringify(next));
      return next;
    });
  };

  const resetTranslations = () => {
    setTranslations(defaultTranslations);
    localStorage.removeItem(STORAGE_TRANS_KEY);
  };

  useEffect(() => {
    document.documentElement.lang = language === 'hi' ? 'hi' : language === 'sat' ? 'sat' : 'en';
  }, [language]);

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage,
        t,
        translations,
        updateTranslationKey,
        resetTranslations,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
