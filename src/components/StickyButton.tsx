import React, { useState, useEffect } from 'react';

const StickyButton: React.FC = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden">
      <div className="bg-glass-dark border-t border-white/10 p-3">
        <a
          href="#play"
          className="flex items-center justify-center gap-3 gradient-red text-white font-black text-base py-3.5 rounded-xl w-full animate-pulse-glow"
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
          </svg>
          🚀 ИГРАТЬ В АВИАТОР
          <span className="bg-white/20 text-xs px-2 py-0.5 rounded-full">+200%</span>
        </a>
      </div>
    </div>
  );
};

export default StickyButton;
