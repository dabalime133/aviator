import React, { useState, useEffect, useRef } from 'react';

const HeroSection: React.FC = () => {
  const [multiplier, setMultiplier] = useState(1.0);
  const [crashed, setCrashed] = useState(false);
  const [planePos, setPlanePos] = useState({ x: 5, y: 80 });
  const animRef = useRef<number | null>(null);
  const startTimeRef = useRef<number | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pathPointsRef = useRef<{x: number, y: number}[]>([]);

  // Animate multiplier and plane
  useEffect(() => {
    let mult = 1.0;
    let crashAt = 1.5 + Math.random() * 8;
    pathPointsRef.current = [];

    const animate = (ts: number) => {
      if (!startTimeRef.current) startTimeRef.current = ts;
      const elapsed = (ts - startTimeRef.current) / 1000;

      mult = parseFloat((1 + elapsed * 0.6 + elapsed * elapsed * 0.12).toFixed(2));

      const progress = Math.min(elapsed / 8, 1);
      const px = 5 + progress * 80;
      const py = 80 - (progress * 70 + progress * progress * 10);

      setPlanePos({ x: Math.min(px, 88), y: Math.max(py, 5) });
      setMultiplier(Math.min(mult, crashAt));

      if (canvasRef.current) {
        const ctx = canvasRef.current.getContext('2d');
        const w = canvasRef.current.width;
        const h = canvasRef.current.height;
        if (ctx) {
          ctx.clearRect(0, 0, w, h);

          const cx = (px / 100) * w;
          const cy = (py / 100) * h;
          pathPointsRef.current.push({ x: cx, y: cy });

          // Draw grid lines
          ctx.strokeStyle = 'rgba(255,255,255,0.04)';
          ctx.lineWidth = 1;
          for (let i = 0; i < 6; i++) {
            ctx.beginPath();
            ctx.moveTo(0, (i / 5) * h);
            ctx.lineTo(w, (i / 5) * h);
            ctx.stroke();
            ctx.beginPath();
            ctx.moveTo((i / 5) * w, 0);
            ctx.lineTo((i / 5) * w, h);
            ctx.stroke();
          }

          if (pathPointsRef.current.length > 1) {
            // Glow trail
            ctx.shadowColor = '#e21c21';
            ctx.shadowBlur = 15;
            const gradient = ctx.createLinearGradient(0, h, cx, cy);
            gradient.addColorStop(0, 'rgba(226,28,33,0)');
            gradient.addColorStop(1, 'rgba(226,28,33,0.9)');

            ctx.beginPath();
            ctx.moveTo(pathPointsRef.current[0].x, pathPointsRef.current[0].y);
            for (const p of pathPointsRef.current) {
              ctx.lineTo(p.x, p.y);
            }
            ctx.strokeStyle = gradient;
            ctx.lineWidth = 3;
            ctx.stroke();
            ctx.shadowBlur = 0;

            // Fill below curve
            ctx.beginPath();
            ctx.moveTo(pathPointsRef.current[0].x, h);
            for (const p of pathPointsRef.current) {
              ctx.lineTo(p.x, p.y);
            }
            ctx.lineTo(cx, h);
            ctx.closePath();
            const fillGrad = ctx.createLinearGradient(0, h * 0.2, 0, h);
            fillGrad.addColorStop(0, 'rgba(226,28,33,0.15)');
            fillGrad.addColorStop(1, 'rgba(226,28,33,0)');
            ctx.fillStyle = fillGrad;
            ctx.fill();
          }
        }
      }

      if (mult >= crashAt) {
        setCrashed(true);
        setTimeout(() => {
          setCrashed(false);
          mult = 1.0;
          crashAt = 1.5 + Math.random() * 8;
          startTimeRef.current = null;
          pathPointsRef.current = [];
          setMultiplier(1.0);
          setPlanePos({ x: 5, y: 80 });
          if (canvasRef.current) {
            const ctx = canvasRef.current.getContext('2d');
            if (ctx) ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
          }
          animRef.current = requestAnimationFrame(animate);
        }, 2500);
        return;
      }

      animRef.current = requestAnimationFrame(animate);
    };

    animRef.current = requestAnimationFrame(animate);
    return () => {
      if (animRef.current) cancelAnimationFrame(animRef.current);
    };
  }, []);

  const getMultiplierColor = () => {
    if (crashed) return 'text-red-500';
    if (multiplier >= 5) return 'text-yellow-400';
    if (multiplier >= 2) return 'text-green-400';
    return 'text-white';
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden pt-20"
      style={{
        background: 'radial-gradient(ellipse at 60% 0%, #1a0508 0%, #050b18 45%, #020710 100%)',
      }}
    >
      {/* Background hero image */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: 'url(/images/aviator-hero.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center top',
        }}
      />

      {/* Stars */}
      <div className="absolute inset-0 overflow-hidden">
        {Array.from({ length: 60 }).map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-white"
            style={{
              width: Math.random() * 2 + 1 + 'px',
              height: Math.random() * 2 + 1 + 'px',
              top: Math.random() * 100 + '%',
              left: Math.random() * 100 + '%',
              opacity: Math.random() * 0.6 + 0.1,
              animation: `pulse ${Math.random() * 3 + 2}s ease-in-out infinite`,
              animationDelay: Math.random() * 3 + 's',
            }}
          />
        ))}
      </div>

      <div className="relative z-10 container-xl w-full">
        <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12">

          {/* Left: Text Content */}
          <div className="flex-1 text-center lg:text-left">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-red-500/10 border border-red-500/30 rounded-full px-4 py-1.5 mb-6">
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              <span className="text-green-400 text-sm font-medium">Онлайн сейчас: 124,832 игрока</span>
            </div>

            {/* H1 */}
            <h1 className="font-orbitron font-black text-3xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-6xl leading-tight mb-4">
              <span className="block text-white">AVIATOR GAME</span>
              <span className="block shimmer-text mt-1">Официальный слот</span>
              <span className="block text-red-400 text-glow-red mt-1">Авиатор Online</span>
            </h1>

            {/* Subtitle */}
            <p className="text-gray-300 text-base md:text-lg mb-6 max-w-xl mx-auto lg:mx-0">
              🚀 Crash-игра от <strong className="text-white">Spribe</strong> с RTP 97% и
              максимальным множителем <strong className="text-yellow-400">x1,000,000</strong>.
              Нажми кэшаут раньше самолёта — и забери выигрыш!
            </p>

            {/* Bonus Badge */}
            <div className="inline-flex items-center gap-3 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border border-yellow-500/30 rounded-xl px-5 py-3 mb-8">
              <span className="text-2xl">🎁</span>
              <div className="text-left">
                <div className="text-yellow-400 font-bold text-lg">+200% на первый депозит</div>
                <div className="text-gray-400 text-xs">До 500$ бонус • Без вейджера на первые 24 часа</div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start mb-8" id="play">
              <a
                href="#"
                className="relative group inline-flex items-center justify-center gap-2 gradient-red text-white font-black text-lg px-8 py-4 rounded-xl animate-pulse-glow transition-all hover:scale-105 active:scale-95 overflow-hidden"
              >
                <span className="absolute inset-0 bg-white/0 group-hover:bg-white/10 transition-all" />
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                </svg>
                ИГРАТЬ СЕЙЧАС
              </a>
              <a
                href="#"
                className="inline-flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 border border-white/15 text-white font-bold text-base px-6 py-4 rounded-xl transition-all hover:scale-105"
              >
                <svg className="w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                  <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                </svg>
                Демо-версия
              </a>
            </div>

            {/* Trust indicators */}
            <div className="flex flex-wrap items-center gap-4 justify-center lg:justify-start text-sm text-gray-400">
              <div className="flex items-center gap-1.5">
                <svg className="w-4 h-4 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 1l2.39 4.843L18 6.747l-4 3.9.944 5.507L10 13.547 5.056 16.154 6 10.647 2 6.747l5.61-.904L10 1z" clipRule="evenodd" />
                </svg>
                Рейтинг 4.9/5
              </div>
              <div className="flex items-center gap-1.5">
                <svg className="w-4 h-4 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                Provably Fair
              </div>
              <div className="flex items-center gap-1.5">
                <svg className="w-4 h-4 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z" />
                </svg>
                Мгновенный вывод
              </div>
              <div className="flex items-center gap-1.5">
                <span className="text-green-400">✓</span>
                Лицензия MGA
              </div>
            </div>
          </div>

          {/* Right: Live Game Widget */}
          <div className="w-full lg:w-[480px] xl:w-[520px]">
            <div className="bg-glass border border-white/10 rounded-2xl overflow-hidden">
              {/* Game Header */}
              <div className="flex items-center justify-between px-4 py-3 bg-black/30 border-b border-white/5">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                  <span className="text-xs text-gray-400 font-medium uppercase tracking-wider">Live Game</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="text-xs text-gray-500">Round #</span>
                  <span className="text-xs text-gray-300 font-mono">
                    {Math.floor(Math.random() * 90000 + 10000)}
                  </span>
                </div>
              </div>

              {/* Canvas Area */}
              <div className="relative bg-gradient-to-b from-[#0a1628] to-[#050b18] h-48 sm:h-56">
                <canvas
                  ref={canvasRef}
                  width={520}
                  height={224}
                  className="absolute inset-0 w-full h-full"
                />

                {/* Plane */}
                {!crashed && (
                  <div
                    className="absolute transition-all duration-100"
                    style={{
                      left: `${planePos.x}%`,
                      top: `${planePos.y}%`,
                      transform: 'translate(-50%, -50%)',
                    }}
                  >
                    <img
                      src="/images/aviator-plane.png"
                      alt="Aviator plane"
                      className="w-16 h-16 drop-shadow-lg"
                      style={{ filter: 'drop-shadow(0 0 12px #e21c21)' }}
                    />
                  </div>
                )}

                {/* Crash overlay */}
                {crashed && (
                  <div className="absolute inset-0 flex flex-col items-center justify-center bg-red-900/30 backdrop-blur-sm">
                    <div className="text-5xl font-orbitron font-black text-red-500 text-glow-red animate-bounce">
                      УЛЕТЕЛ! 💥
                    </div>
                    <div className="text-gray-300 text-sm mt-2">Новый раунд скоро...</div>
                  </div>
                )}

                {/* Multiplier Display */}
                {!crashed && (
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <div className={`font-orbitron font-black text-4xl sm:text-5xl ${getMultiplierColor()} text-glow-white`}>
                      {multiplier.toFixed(2)}x
                    </div>
                  </div>
                )}

                {/* Y Axis Labels */}
                <div className="absolute right-2 top-0 bottom-0 flex flex-col justify-between py-2 pointer-events-none">
                  {['5x', '4x', '3x', '2x', '1x'].map((v) => (
                    <span key={v} className="text-xs text-gray-600 font-mono">{v}</span>
                  ))}
                </div>
              </div>

              {/* Bet Panel */}
              <div className="p-4 bg-black/20">
                <div className="grid grid-cols-2 gap-3 mb-3">
                  <div>
                    <div className="text-xs text-gray-500 mb-1">Ставка</div>
                    <div className="flex items-center bg-white/5 border border-white/10 rounded-lg overflow-hidden">
                      <button className="px-3 py-2 text-red-400 hover:bg-white/10 font-bold text-lg">−</button>
                      <div className="flex-1 text-center font-bold text-white font-orbitron text-sm">$10.00</div>
                      <button className="px-3 py-2 text-green-400 hover:bg-white/10 font-bold text-lg">+</button>
                    </div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-500 mb-1">Авто кэшаут</div>
                    <div className="flex items-center bg-white/5 border border-white/10 rounded-lg overflow-hidden">
                      <div className="flex-1 text-center font-bold text-yellow-400 font-orbitron text-sm py-2">2.00x</div>
                      <button className="px-3 py-2 text-gray-400 hover:bg-white/10">✏️</button>
                    </div>
                  </div>
                </div>
                <button className="w-full gradient-green text-black font-black text-base py-3 rounded-xl animate-pulse-green hover:scale-[1.02] transition-transform active:scale-95">
                  СДЕЛАТЬ СТАВКУ
                </button>
              </div>
            </div>

            {/* Last rounds */}
            <div className="mt-3 flex items-center gap-2 overflow-x-auto pb-1">
              <span className="text-xs text-gray-500 whitespace-nowrap">Последние:</span>
              {[1.24, 12.5, 2.1, 1.02, 34.8, 1.56, 8.3, 2.77, 1.11, 5.5].map((v, i) => (
                <span
                  key={i}
                  className={`flex-shrink-0 text-xs font-mono font-bold px-2.5 py-1 rounded-full ${
                    v >= 10 ? 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30' :
                    v >= 2 ? 'bg-green-500/20 text-green-400 border border-green-500/30' :
                    'bg-red-500/20 text-red-400 border border-red-500/30'
                  }`}
                >
                  {v}x
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Arrow */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 animate-bounce">
        <svg className="w-6 h-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </div>
    </section>
  );
};

export default HeroSection;
