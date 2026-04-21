import React, { useState, useEffect } from 'react';
import { useTranslation } from './LanguageContext';

interface Winner {
  id: number;
  user: string;
  bet: number;
  mult: number;
  total: number;
}

const LiveWinners: React.FC = () => {
  const { t } = useTranslation();
  const [winners, setWinners] = useState<Winner[]>([]);

  const generateWinner = () => {
    const names = ['Ivan', 'Aleksei', 'Sardor', 'Alikhan', 'Mehmet', 'User_777', 'Lucky_Jet', 'ProGamer'];
    const id = Date.now();
    const bet = Math.floor(Math.random() * 5000) + 100;
    const mult = parseFloat((1 + Math.random() * 4).toFixed(2));
    return {
      id,
      user: names[Math.floor(Math.random() * names.length)] + '***',
      bet,
      mult,
      total: Math.floor(bet * mult)
    };
  };

  useEffect(() => {
    // Инициализация
    setWinners(Array.from({ length: 8 }, () => generateWinner()));

    const interval = setInterval(() => {
      setWinners(prev => [generateWinner(), ...prev.slice(0, 7)]);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-20 bg-[#070b14]">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center gap-3 mb-10">
          <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
          <h2 className="text-3xl font-black text-white uppercase tracking-tighter">{t('winners')}</h2>
        </div>

        <div className="bg-[#161b22] border border-white/5 rounded-[32px] overflow-hidden shadow-2xl">
          <div className="grid grid-cols-4 bg-white/5 p-5 text-[10px] font-black text-gray-500 uppercase tracking-widest">
            <div>{t('user')}</div>
            <div className="text-center">{t('amount')}</div>
            <div className="text-center">{t('coeff')}</div>
            <div className="text-right">{t('win')}</div>
          </div>

          <div className="divide-y divide-white/5">
            {winners.map((w) => (
              <div key={w.id} className="grid grid-cols-4 p-5 items-center animate-slide-down">
                <div className="text-white font-bold text-sm flex items-center gap-3">
                   <div className="w-8 h-8 rounded-lg bg-red-600/20 flex items-center justify-center text-red-500 text-xs">
                     {w.user[0]}
                   </div>
                   {w.user}
                </div>
                <div className="text-center text-gray-400 font-mono text-sm">{w.bet} ₸</div>
                <div className="text-center">
                  <span className="bg-green-600/10 text-green-500 px-3 py-1 rounded-full text-xs font-black border border-green-600/20">
                    x{w.mult}
                  </span>
                </div>
                <div className="text-right text-green-400 font-black text-sm">
                  +{w.total} ₸
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default LiveWinners;
