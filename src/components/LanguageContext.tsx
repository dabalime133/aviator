import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { translations, TranslationKeys } from './translations';

export type Language = 'RU' | 'EN' | 'KZ' | 'UZ' | 'TR';

interface LanguageContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  t: (key: keyof TranslationKeys) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  // Инициализация из localStorage, чтобы язык не сбрасывался при перезагрузке
  const [lang, setLang] = useState<Language>(() => {
    const saved = localStorage.getItem('site_lang');
    return (saved as Language) || 'RU';
  });

  useEffect(() => {
    localStorage.setItem('site_lang', lang);
    document.documentElement.lang = lang.toLowerCase();
  }, [lang]);

  const t = (key: keyof TranslationKeys) => {
    return translations[lang][key] || translations['RU'][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useTranslation = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useTranslation must be used within a LanguageProvider');
  }
  return context;
};
