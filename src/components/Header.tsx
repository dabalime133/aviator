import React, { useState, useEffect, useRef } from 'react';

// Объект переводов для хедера
const translations = {
  RU: {
    howToPlay: 'Как играть',
    strategies: 'Стратегии',
    predictor: 'Предиктор',
    faq: 'FAQ',
    register: 'Регистрация',
    play: 'Играть'
  },
  KZ: {
    howToPlay: 'Қалай ойнау керек',
    strategies: 'Стратегиялар',
    predictor: 'Предиктор',
    faq: 'FAQ',
    register: 'Тіркелу',
    play: 'Ойнау'
  },
  UZ: {
    howToPlay: "Qanday o'ynash kerak",
    strategies: 'Strategiyalar',
    predictor: 'Prediktor',
    faq: 'FAQ',
    register: "Ro'yxatdan o'tish",
    play: "O'ynash"
  },
  EN: {
    howToPlay: 'How to play',
    strategies: 'Strategies',
    predictor: 'Predictor',
    faq: 'FAQ',
    register: 'Registration',
    play: 'Play'
  }
};

const languages = [
  { code: 'RU', label: 'RU', flag: 'https://flagcdn.com/w40/ru.png' },
  { code: 'KZ', label: 'KZ', flag: 'https://flagcdn.com/w40/kz.png' },
  { code: 'UZ', label: 'UZ', flag: 'https://flagcdn.com/w40/uz.png' },
  { code: 'EN', label: 'EN', flag: 'https://flagcdn.com/w40/gb.png' },
];

const Header: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  // Загружаем язык из localStorage или ставим RU по умолчанию
  const [lang, setLang] = useState(() => localStorage.getItem('siteLang') || 'RU');
  const langRef = useRef<HTMLDivElement>(null);

  const t = translations[lang as keyof typeof translations];

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 30);
    const handleClickOutside = (event: MouseEvent) => {
      if (langRef.current && !langRef.current.contains(event.target as Node)) {
        setLangOpen(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const changeLanguage = (code: string) => {
    setLang(code);
    localStorage.setItem('siteLang', code);
    setLangOpen(false);
  };

  const navLinks = [
    { label: t.howToPlay, href: '#how-to-play' },
    { label: t.strategies, href: '#strategies' },
    { label: t.predictor, href: '#predictor' },
    { label: t.faq, href: '#faq' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-300 ${
        scrolled ? 'bg-black/80 backdrop-blur-md shadow-lg border-b border-white/5' : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4 flex items-center justify-between h-16 md:h-20">
        {/* Logo */}
        <a href="#" className="flex items-center gap-2 group">
          <div className="relative">
            <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M4 28L18 6L32 28H22L18 20L14 28H4Z" fill="#e21c21" />
              <path d="M4 28L18 6L22 28H14L18 20L4 28Z" fill="#ff4444" opacity="0.6" />
              <circle cx="18" cy="6" r="3" fill="#e21c21" className="animate-pulse" />
              <line x1="18" y1="8" x2="18" y2="28" stroke="#e21c21" strokeWidth="1" strokeOpacity="0.3" />
            </svg>
            <div className="absolute inset-0 bg-red-500/20 blur-xl rounded-full" />
          </div>
          <span className="font-orbitron font-black text-xl tracking-widest">
            <span className="text-white">AVI</span>
            <span className="text-red-500">ATOR</span>
          </span>
        </a>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-gray-300 hover:text-red-500 text-sm font-bold uppercase tracking-wider transition-colors"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Right Actions */}
        <div className="flex items-center gap-4">
          {/* Language Dropdown */}
          <div className="relative" ref={langRef}>
            <button
              onClick={() => setLangOpen(!langOpen)}
              className="flex items-center gap-2 bg-white/5 border border-white/10 hover:border-red-500/50 transition-all px-3 py-1.5 rounded-lg text-white text-sm"
            >
              <img 
                src={languages.find(l => l.code === lang)?.flag} 
                alt={lang} 
                className="w-5 h-3.5 object-cover rounded-sm"
              />
              <span className="font-bold">{lang}</span>
              <svg className={`w-3 h-3 transition-transform ${langOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {langOpen && (
              <div className="absolute top-full mt-2 right-0 w-32 bg-gray-900 border border-white/10 rounded-xl overflow-hidden shadow-2xl animate-in fade-in slide-in-from-top-2">
                {languages.map((l) => (
                  <button
                    key={l.code}
                    onClick={() => changeLanguage(l.code)}
                    className={`flex items-center gap-3 w-full px-4 py-2.5 text-sm transition-colors hover:bg-red-500/10 ${
                      lang === l.code ? 'text-red-500 bg-red-500/5' : 'text-gray-300'
                    }`}
                  >
                    <img src={l.flag} alt={l.label} className="w-5 h-3.5 object-cover rounded-sm" />
                    <span className="font-bold">{l.label}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Register Button */}
          <a
            href="https://lkiv.cc/dea2"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative inline-flex items-center gap-2 bg-gradient-to-r from-red-600 to-red-500 text-white font-black text-sm px-5 py-2.5 rounded-lg transition-all hover:scale-105 active:scale-95 shadow-[0_0_20px_rgba(226,28,33,0.4)]"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" />
            </svg>
            <span className="hidden sm:inline uppercase">{t.register}</span>
            <span className="sm:hidden uppercase">{t.play}</span>
          </a>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="lg:hidden p-2 text-gray-300 hover:text-white transition-colors"
          >
            <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {menuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="lg:hidden bg-gray-950 border-t border-white/5 animate-in slide-in-from-top-full duration-300">
          <nav className="container mx-auto px-4 py-6 flex flex-col gap-4">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="text-gray-300 hover:text-red-500 text-lg font-bold uppercase tracking-widest py-3 border-b border-white/5 transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
