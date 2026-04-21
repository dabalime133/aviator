import React, { useState, useEffect } from 'react';

const Header: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [lang, setLang] = useState('RU');

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Как играть', href: '#how-to-play' },
    { label: 'Стратегии', href: '#strategies' },
    { label: 'Предиктор', href: '#predictor' },
    { label: 'FAQ', href: '#faq' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-glass-dark shadow-lg shadow-black/40' : 'bg-transparent'
      }`}
    >
      <div className="container-xl flex items-center justify-between h-16 md:h-20">
        {/* Logo */}
        <a href="#" className="flex items-center gap-2 group">
          <div className="relative">
            <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M4 28L18 6L32 28H22L18 20L14 28H4Z" fill="#e21c21" />
              <path d="M4 28L18 6L22 28H14L18 20L4 28Z" fill="#ff4444" opacity="0.6" />
              <circle cx="18" cy="6" r="3" fill="#e21c21" className="animate-pulse" />
              {/* Trail */}
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
        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-gray-300 hover:text-white text-sm font-medium transition-colors hover:text-red-400"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Right Actions */}
        <div className="flex items-center gap-3">
          {/* Language Switcher */}
          <div className="relative hidden sm:block">
            <select
              value={lang}
              onChange={(e) => setLang(e.target.value)}
              className="bg-white/5 border border-white/10 text-white text-sm px-3 py-1.5 rounded-lg appearance-none cursor-pointer focus:outline-none focus:border-red-500"
            >
              <option value="RU">🇷🇺 RU</option>
              <option value="KZ">🇰🇿 KZ</option>
              <option value="UZ">🇺🇿 UZ</option>
              <option value="EN">🇬🇧 EN</option>
            </select>
          </div>

          {/* Register Button */}
          <a
            href="#play"
            className="relative inline-flex items-center gap-2 gradient-red text-white font-bold text-sm px-4 py-2 md:px-6 md:py-2.5 rounded-lg animate-pulse-glow transition-transform hover:scale-105 active:scale-95"
          >
            <span className="absolute inset-0 rounded-lg bg-white/10 animate-ping opacity-20" />
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" />
            </svg>
            <span className="hidden sm:inline">Регистрация</span>
            <span className="sm:hidden">Играть</span>
          </a>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden p-2 text-gray-300 hover:text-white"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
        <div className="md:hidden bg-glass-dark border-t border-white/5">
          <nav className="container-xl py-4 flex flex-col gap-3">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="text-gray-300 hover:text-red-400 py-2 font-medium transition-colors border-b border-white/5"
              >
                {link.label}
              </a>
            ))}
            <div className="flex gap-2 pt-2">
              {['🇷🇺 RU', '🇰🇿 KZ', '🇺🇿 UZ'].map((l) => (
                <button key={l} className="text-sm bg-white/5 px-3 py-1.5 rounded-lg text-gray-300 hover:text-white">
                  {l}
                </button>
              ))}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
