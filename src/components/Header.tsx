import React, { useState, useEffect, useRef } from 'react';
import { useTranslation } from './LanguageContext';

const HeroSection: React.FC = () => {
  const { t } = useTranslation();
  const [multiplier, setMultiplier] = useState(1.0);
  const [planePos, setPlanePos] = useState({ x: 5, y: 80 });
  const [isFlying, setIsFlying] = useState(true);
  
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const requestRef = useRef<number>();
  const startTimeRef = useRef<number>();

  const animate = (time: number) => {
    if (!startTimeRef.current) startTimeRef.current = time;
    const elapsed = (time - startTimeRef.current) / 1000;

    // Математика полета
    const newMult = parseFloat((1 + elapsed * 0.5 + elapsed * elapsed * 0.08).toFixed(2));
    const progress = Math.min(elapsed / 10, 1);
    const px = 5 + progress * 80;
    const py = 80 - (progress * 60 + Math.pow(progress, 2) * 15);

    if (newMult < 50) { // Имитируем бесконечный полет для фона
      setMultiplier(newMult);
      setPlanePos({ x: px, y: py });
      drawPath(px, py);
      requestRef.current = requestAnimationFrame(animate);
    } else {
      resetGame();
    }
  };

  const resetGame = () => {
    startTimeRef.current = undefined;
    requestRef.current = requestAnimationFrame(animate);
  };

  const drawPath = (x: number, y: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.beginPath();
    ctx.moveTo(0, canvas.height);
    // Простая кривая Безье для следа
    ctx.quadraticCurveTo(canvas.width * (x/200), canvas.height, canvas.width * (x/100), canvas.height * (y/100));
    ctx.strokeStyle = '#e21c21';
    ctx.lineWidth = 4;
    ctx.stroke();
  };

  useEffect(() => {
    requestRef.current = requestAnimationFrame(animate);
    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, []);

  return (
    <section className="relative pt-24 pb-12 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 grid lg:grid-cols-2 gap-12 items-center">
        <div className="z-10">
          <div className="inline-flex items-center gap-2 bg-red-600/10 border border-red-600/20 px-4 py-2 rounded-full mb-6">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
            </span>
            <span className="text-red-500 text-xs font-black uppercase tracking-widest">{t('safe')}</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-black text-white mb-6 leading-tight">
            AVIATOR <br /> <span className="text-red-600">GAME ONLINE</span>
          </h1>
          <p className="text-gray-400 text-lg mb-10 max-w-lg leading-relaxed">
            {t('bonus')} при регистрации. Успей забрать свой выигрыш до того, как самолет улетит!
          </p>
          <div className="flex flex-wrap gap-4">
            <a href="#play" className="gradient-red text-white px-10 py-5 rounded-2xl font-black text-lg shadow-2xl shadow-red-600/40 hover:scale-105 active:scale-95 transition-all">
              {t('play')}
            </a>
          </div>
        </div>

        <div className="relative aspect-video bg-[#1a1f29] rounded-[40px] border border-white/5 shadow-inner overflow-hidden">
          <canvas ref={canvasRef} width={800} height={450} className="absolute inset-0 w-full h-full" />
          
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
             <div className="text-center">
                <div className="text-6xl md:text-8xl font-black text-white font-mono tracking-tighter">
                  {multiplier.toFixed(2)}x
                </div>
             </div>
          </div>

          <div 
            className="absolute transition-all duration-100 ease-linear"
            style={{ left: `${planePos.x}%`, top: `${planePos.y}%`, transform: 'translate(-50%, -50%)' }}
          >
            <img src="https://raw.githubusercontent.com/AnahitNeural/assets/main/aviator-plane.png" className="w-16 md:w-24 drop-shadow-[0_0_15px_rgba(226,28,33,0.5)]" alt="Plane" />
          </div>

          <div className="absolute bottom-4 left-4 right-4 flex items-center gap-2 overflow-x-auto no-scrollbar">
            <span className="text-[10px] text-gray-500 font-bold uppercase">{t('lastRounds')}</span>
            {[2.45, 1.05, 15.30, 4.21, 1.88, 30.00].map((val, i) => (
              <div key={i} className={`px-3 py-1 rounded-full text-[10px] font-black border ${val > 10 ? 'bg-purple-600/20 border-purple-600/30 text-purple-400' : 'bg-blue-600/20 border-blue-600/30 text-blue-400'}`}>
                {val}x
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
