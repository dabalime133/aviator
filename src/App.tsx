import React, { useState } from 'react'; // Добавили useState сюда
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import QuickInfo from './components/QuickInfo';
import LiveWinners from './components/LiveWinners';
import HowToPlay from './components/HowToPlay';
import Strategies from './components/Strategies';
import Predictor from './components/Predictor';
import TrustSection from './components/TrustSection';
import FAQ from './components/FAQ';
import Footer from './components/Footer';
import StickyButton from './components/StickyButton';

const App: React.FC = () => {
  // Теперь useState определен и ошибки "Cannot find name 'useState'" не будет
  const [lang, setLang] = useState('RU'); 

  return (
    <div className="min-h-screen bg-[#050b18] text-white overflow-x-hidden">
      {/* Передаем состояние и функцию смены языка */}
      <Header currentLang={lang} onLangChange={setLang} />
      
      <main>
        <HeroSection lang={lang} />
        <QuickInfo lang={lang} />
        <LiveWinners lang={lang} />
        <HowToPlay lang={lang} />
        <Strategies lang={lang} />
        <Predictor lang={lang} />
        <TrustSection lang={lang} />
        <FAQ lang={lang} />
      </main>
      
      <Footer lang={lang} />
      <StickyButton lang={lang} />
    </div>
  );
};

export default App;