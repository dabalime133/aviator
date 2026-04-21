import React, { useState, useEffect } from 'react';
import { useTranslation } from './LanguageContext';

const StickyButton: React.FC = () => {
  const [visible, setVisible] = useState(false);
  const { t } = useTranslation();

  useEffect(() => {
    const handleScroll = () => setVisible(window.scrollY > 400);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden p-3 bg-glass-dark border-t border-white/10">
      <a href="#play" className="flex items-center justify-center gap-3 gradient-red text-white font-black py-4 rounded-xl w-full animate-pulse-glow uppercase text-sm">
        🚀 {t('play')}
      </a>
    </div>
  );
};

export default StickyButton;
