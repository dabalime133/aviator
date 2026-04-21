import React from 'react';
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
  return (
    <div className="min-h-screen bg-[#050b18] text-white overflow-x-hidden">
      <Header />
      <main>
        <HeroSection />
        <QuickInfo />
        <LiveWinners />
        <HowToPlay />
        <Strategies />
        <Predictor />
        <TrustSection />
        <FAQ />
      </main>
      <Footer />
      <StickyButton />
    </div>
  );
};

export default App;
