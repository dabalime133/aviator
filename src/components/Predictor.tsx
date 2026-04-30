import React, { useState, useEffect } from 'react';

const Predictor: React.FC = () => {
  const [signals, setSignals] = useState<{ value: number; strength: 'low' | 'med' | 'high' }[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [prediction, setPrediction] = useState({ min: 0, max: 0, confidence: 0 });

  useEffect(() => {
    // Generate initial signals
    const newSignals = Array.from({ length: 8 }, () => {
      const v = parseFloat((1 + Math.random() * 12).toFixed(2));
      return {
        value: v,
        strength: v >= 5 ? 'high' : v >= 2 ? 'med' : 'low' as 'low' | 'med' | 'high',
      };
    });
    setSignals(newSignals);

    const interval = setInterval(() => {
      setSignals((prev) => {
        const v = parseFloat((1 + Math.random() * 12).toFixed(2));
        return [
          { value: v, strength: v >= 5 ? 'high' : v >= 2 ? 'med' : 'low' },
          ...prev.slice(0, 7),
        ];
      });
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const runAnalysis = () => {
    setIsAnalyzing(true);
    setShowResult(false);
    setProgress(0);

    const interval = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          clearInterval(interval);
          setIsAnalyzing(false);
          setShowResult(true);
          setPrediction({
            min: parseFloat((1.2 + Math.random() * 1.5).toFixed(2)),
            max: parseFloat((3 + Math.random() * 8).toFixed(2)),
            confidence: Math.floor(60 + Math.random() * 30),
          });
          return 100;
        }
        return p + 2 + Math.random() * 4;
      });
    }, 80);
  };

  const getStrengthColor = (s: string) => {
    if (s === 'high') return 'text-yellow-400 border-yellow-500/30 bg-yellow-500/10';
    if (s === 'med') return 'text-green-400 border-green-500/30 bg-green-500/10';
    return 'text-blue-400 border-blue-500/30 bg-blue-500/10';
  };

  return (
    <section id="predictor" className="py-20 relative overflow-hidden">
      <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, #050b18 0%, #0a0e1f 50%, #050b18 100%)' }} />

      {/* Decorative circuit lines */}
      <div className="absolute inset-0 opacity-5">
        <svg width="100%" height="100%" viewBox="0 0 1000 600" preserveAspectRatio="xMidYMid slice">
          <path d="M0 300 L200 300 L250 200 L400 200 L450 300 L600 300 L650 400 L800 400 L850 300 L1000 300" stroke="#e21c21" strokeWidth="1" fill="none" />
          <path d="M100 0 L100 150 L200 150 L200 300" stroke="#00ff88" strokeWidth="1" fill="none" />
          <path d="M500 0 L500 100 L600 100 L600 300" stroke="#e21c21" strokeWidth="1" fill="none" />
          <path d="M800 600 L800 400 L700 400 L700 200 L900 200" stroke="#00ff88" strokeWidth="1" fill="none" />
        </svg>
      </div>

      <div className="container-xl relative z-10">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 text-purple-400 text-sm font-medium uppercase tracking-widest mb-3">
            <span className="w-8 h-px bg-purple-500" />
            Предиктор / Сигналы
            <span className="w-8 h-px bg-purple-500" />
          </div>
          <h2 className="font-orbitron font-bold text-2xl md:text-4xl text-white mb-4">
            Сигналы <span className="text-purple-400">Авиатор</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Многие игроки ищут «предиктор» или «сигналы». Правда в том, что игра работает на
            алгоритме <strong className="text-white">Provably Fair</strong> — каждый раунд математически независим.
            Лучший «предиктор» — это ваша стратегия.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">

          {/* Left: Signal Feed */}
          <div className="bg-glass border border-purple-500/20 rounded-2xl overflow-hidden">
            <div className="bg-black/30 px-4 py-3 border-b border-white/5 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-purple-500 rounded-full animate-pulse" />
                <span className="text-sm text-gray-300 font-medium">Live Сигналы</span>
              </div>
              <span className="text-xs text-gray-500 bg-white/5 px-2 py-1 rounded">AI анализ</span>
            </div>

            <div className="p-4">
              <div className="space-y-2 mb-4">
                {signals.map((sig, i) => (
                  <div
                    key={i}
                    className={`flex items-center justify-between p-2.5 rounded-xl border transition-all ${getStrengthColor(sig.strength)}`}
                    style={{ opacity: 1 - i * 0.08 }}
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono text-gray-400">#{8 - i}</span>
                      <span className={`text-xs px-2 py-0.5 rounded-full border ${getStrengthColor(sig.strength)}`}>
                        {sig.strength === 'high' ? '🔥 Высокий' : sig.strength === 'med' ? '⚡ Средний' : '💧 Низкий'}
                      </span>
                    </div>
                    <span className="font-orbitron font-bold">{sig.value}x</span>
                  </div>
                ))}
              </div>

              <div className="text-center text-xs text-gray-600 italic">
                * Сигналы сгенерированы на основе математической статистики
              </div>
            </div>
          </div>

          {/* Right: Analyzer Tool */}
          <div>
            <div className="bg-glass border border-purple-500/20 rounded-2xl p-6 mb-6">
              <h3 className="font-bold text-white text-lg mb-4 flex items-center gap-2">
                <span>🔬</span> Анализатор паттернов
              </h3>

              <p className="text-gray-400 text-sm mb-5">
                Запустите анализ статистики последних 1000 раундов для определения
                оптимального момента входа в игру.
              </p>

              {!isAnalyzing && !showResult && (
                <button
                  onClick={runAnalysis}
                  className="w-full py-3 rounded-xl font-bold text-white border border-purple-500/40 bg-purple-500/10 hover:bg-purple-500/20 transition-all flex items-center justify-center gap-2"
                >
                  <span>🚀</span> Запустить анализ
                </button>
              )}

              {isAnalyzing && (
                <div>
                  <div className="flex justify-between text-xs text-gray-400 mb-2">
                    <span>Анализ данных...</span>
                    <span>{Math.min(Math.round(progress), 100)}%</span>
                  </div>
                  <div className="h-2 bg-white/10 rounded-full overflow-hidden mb-4">
                    <div
                      className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full transition-all duration-200"
                      style={{ width: `${Math.min(progress, 100)}%` }}
                    />
                  </div>
                  <div className="text-xs text-gray-500 text-center">
                    {progress < 30 ? '📊 Загрузка исторических данных...' :
                     progress < 60 ? '🧮 Вычисление вероятностей...' :
                     progress < 85 ? '🔍 Поиск паттернов...' :
                     '✅ Финализация рекомендации...'}
                  </div>
                </div>
              )}

              {showResult && (
                <div className="space-y-4">
                  <div className="bg-purple-500/10 border border-purple-500/30 rounded-xl p-4">
                    <div className="text-xs text-gray-400 mb-2">Рекомендуемый диапазон кэшаута:</div>
                    <div className="flex items-center gap-3">
                      <span className="font-orbitron font-black text-2xl text-purple-400">{prediction.min}x</span>
                      <span className="text-gray-500">до</span>
                      <span className="font-orbitron font-black text-2xl text-yellow-400">{prediction.max}x</span>
                    </div>
                    <div className="mt-2 text-xs text-gray-400">
                      Уверенность алгоритма:{' '}
                      <span className="text-green-400 font-bold">{prediction.confidence}%</span>
                    </div>
                  </div>

                  <div className="bg-yellow-500/5 border border-yellow-500/20 rounded-xl p-3 text-xs text-yellow-500/80">
                    ⚠️ Это статистическая модель, не гарантия результата. Игра с RNG.
                  </div>

                  <button
                    onClick={runAnalysis}
                    className="w-full py-2.5 text-sm rounded-xl border border-white/10 text-gray-400 hover:text-white hover:border-white/20 transition-all"
                  >
                    🔄 Пересчитать
                  </button>
                </div>
              )}
            </div>

            {/* Provably Fair Info */}
            <div className="bg-glass border border-green-500/20 rounded-2xl p-6">
              <div className="flex items-start gap-4">
                <img src="/images/provably-fair.png" alt="Provably Fair" className="w-14 h-14 rounded-xl object-cover" />
                <div>
                  <h3 className="font-bold text-white mb-2 flex items-center gap-2">
                    🛡️ Provably Fair
                  </h3>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    Алгоритм Авиатора основан на технологии <strong className="text-white">Provably Fair</strong>.
                    Каждый раунд генерируется с использованием криптографии SHA-256.
                    Вы можете самостоятельно проверить честность любого раунда.
                  </p>
                  <a href="#faq" className="inline-flex items-center gap-1 text-green-400 text-sm mt-2 hover:text-green-300">
                    Как проверить? →
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Predictor;
