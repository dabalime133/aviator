import React, { createContext, useContext, useState, ReactNode } from 'react';
import { translations, TranslationKeys } from './translations';

type Language = 'RU' | 'EN' | 'KZ' | 'UZ' | 'TR';

interface LanguageContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  t: (key: keyof TranslationKeys) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [lang, setLang] = useState<Language>('RU');
  const t = (key: keyof TranslationKeys) => translations[lang][key] || translations['RU'][key];

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useTranslation = () => {
  const context = useContext(LanguageContext);
  if (!context) throw new Error('useTranslation must be used within LanguageProvider');
  return context;
};
