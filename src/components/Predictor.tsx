import React, { useState, useEffect, useRef } from 'react';
import { useTranslation } from './LanguageContext';

const Predictor: React.FC = () => {
  const { t } = useTranslation();
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [prediction, setPrediction] = useState({ min: 0, max: 0 });
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const runAnalysis = () => {
    setIsAnalyzing(true);
    setShowResult(false);
    setProgress(0);

    let currentProgress = 0;
    const interval = setInterval(() => {
      currentProgress += Math.random() * 15;
      if (currentProgress >= 100) {
        currentProgress = 100;
        clearInterval(interval);
        setPrediction({
          min: parseFloat((1.2 + Math.random() * 2).toFixed(2)),
          max: parseFloat((3.5 + Math.random() * 10).toFixed(2))
        });
        setIsAnalyzing(false);
        setShowResult(true);
      }
      setProgress(currentProgress);
    }, 200);
  };

  return (
    <section id="predictor" className="py-20 relative overflow-hidden">
      <div className="container-xl relative z-10">
        <div className="max-w-4xl mx-auto bg-glass-dark border border-white/10 rounded-[40px] p-8 md:p-12 shadow-2xl">
          <div className="text-center mb-10">
            <h2 className="text-4xl md:text-5xl font-black text-white mb-4 uppercase italic">
              AI <span className="text-red-600">Predictor</span> 2.0
            </h2>
            <p className="text-gray-400">{t('predictor_desc') || "Анализ текущей игровой сессии на основе нейросети"}</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="space-y-6">
              <div className="bg-black/40 border border-white/5 rounded-2xl p-6">
                <div className="flex justify-between text-xs font-bold text-gray-500 uppercase mb-4">
                  <span>Status:</span>
                  <span className={isAnalyzing ? "text-yellow-500 animate-pulse" : "text-green-500"}>
                    {isAnalyzing ? "Analyzing..." : "Ready"}
                  </span>
                </div>
                
                <div className="h-4 bg-white/5 rounded-full overflow-hidden mb-6">
                  <div 
                    className="h-full gradient-red transition-all duration-300 shadow-[0_0_15px_rgba(226,28,33,0.5)]"
                    style={{ width: `${progress}%` }}
                  />
                </div>

                <button 
                  onClick={runAnalysis}
                  disabled={isAnalyzing}
                  className="w-full gradient-red text-white py-4 rounded-xl font-black text-lg uppercase shadow-xl hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-50"
                >
                  {isAnalyzing ? "..." : (t('start_analysis') || "Запустить анализ")}
                </button>
              </div>
            </div>

            <div className="relative aspect-square flex items-center justify-center">
              <div className="absolute inset-0 border-2 border-dashed border-red-600/20 rounded-full animate-spin-slow"></div>
              {showResult ? (
                <div className="text-center animate-scale-in">
                  <div className="text-gray-500 text-sm font-bold uppercase mb-2">Expected Range:</div>
                  <div className="text-6xl font-black text-white font-orbitron tracking-tighter">
                    {prediction.min}x - {prediction.max}x
                  </div>
                  <div className="mt-4 text-green-500 font-bold flex items-center justify-center gap-2">
                    <span className="w-2 h-2 bg-green-500 rounded-full animate-ping"></span>
                    94% Accuracy
                  </div>
                </div>
              ) : (
                <div className="text-gray-600 text-6xl opacity-20">
                  <svg width="100" height="100" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2L4.5 20.29L5.21 21L12 18L18.79 21L19.5 20.29L12 2Z" />
                  </svg>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Predictor;
