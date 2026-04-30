import React, { useState, useEffect } from 'react';

interface Winner {
  id: number;
  name: string;
  amount: number;
  multiplier: number;
  currency: string;
  time: string;
}

const currencies = ['$', '₽', '₸', 'UZS'];
const names = [
  'Ivan_99', 'Alex_Pro', 'Lucky777', 'Sergei_K', 'Mikha_NN', 'Rustam_UZ',
  'Dima_88', 'Vadim_RU', 'Artem_23', 'Maxim_F', 'Daniyar_KZ', 'Ulugbek',
  'Pro_Player', 'MegaWin_X', 'Aviator777', 'StarBet_22', 'Night_Hawk',
  'CashOut_K', 'BigWin_M', 'FlyHigh_Z', 'Jet_Speed', 'CrashMaster',
  'Murod_TJ', 'Alibek_KZ', 'Viktor_UA', 'Olga_M', 'Alikhan',
];

const generateWinner = (id: number): Winner => ({
  id,
  name: names[Math.floor(Math.random() * names.length)],
  amount: parseFloat((Math.random() * 2000 + 5).toFixed(2)),
  multiplier: parseFloat((1.1 + Math.random() * 15).toFixed(2)),
  currency: currencies[Math.floor(Math.random() * currencies.length)],
  time: 'только что',
});

const LiveWinners: React.FC = () => {
  const [winners, setWinners] = useState<Winner[]>(
    Array.from({ length: 20 }, (_, i) => generateWinner(i))
  );
  const [newWin, setNewWin] = useState<Winner | null>(null);
  const [counter, setCounter] = useState(21);

  useEffect(() => {
    const interval = setInterval(() => {
      const w = generateWinner(counter);
      setNewWin(w);
      setCounter((c) => c + 1);
      setTimeout(() => setNewWin(null), 600);

      setWinners((prev) => [w, ...prev.slice(0, 19)]);
    }, 1500 + Math.random() * 1000);

    return () => clearInterval(interval);
  }, [counter]);

  const getMultiplierBadge = (m: number) => {
    if (m >= 10) return 'bg-yellow-500/20 text-yellow-300 border-yellow-500/40';
    if (m >= 5) return 'bg-orange-500/20 text-orange-300 border-orange-500/40';
    if (m >= 2) return 'bg-green-500/20 text-green-300 border-green-500/40';
    return 'bg-blue-500/20 text-blue-300 border-blue-500/40';
  };

  const getMegaWin = (amount: number, mult: number) => amount * mult >= 1000;

  return (
    <section className="py-16 relative overflow-hidden">
      <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, #050b18 0%, #080d1a 100%)' }} />

      <div className="container-xl relative z-10">
        <div className="flex flex-col lg:flex-row gap-8 items-start">

          {/* Left: Section Title */}
          <div className="lg:w-72 flex-shrink-0">
            <div className="inline-flex items-center gap-2 text-green-400 text-sm font-medium uppercase tracking-widest mb-3">
              <span className="w-8 h-px bg-green-500" />
              Live Winners
            </div>
            <h2 className="font-orbitron font-bold text-2xl md:text-3xl text-white mb-4">
              Побеждают<br />
              <span className="text-green-400">прямо сейчас</span>
            </h2>
            <p className="text-gray-400 text-sm mb-6">
              Реальные выигрыши игроков со всего мира в режиме реального времени.
              Каждый может стать следующим!
            </p>

            {/* Big Win Counter */}
            <div className="bg-gradient-to-br from-yellow-500/15 to-orange-500/10 border border-yellow-500/30 rounded-xl p-5 text-center">
              <div className="text-xs text-gray-400 uppercase tracking-wider mb-1">Суммарный выигрыш за 24ч</div>
              <div className="font-orbitron font-black text-2xl text-yellow-400 text-glow-green">
                $48,293,847
              </div>
              <div className="text-xs text-gray-500 mt-1">↑ +$12,481 за последнюю минуту</div>
            </div>

            <a
              href="#play"
              className="mt-5 w-full inline-flex items-center justify-center gap-2 gradient-green text-black font-black py-3 rounded-xl hover:scale-105 transition-transform"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
              </svg>
              Присоединиться
            </a>
          </div>

          {/* Right: Winners Feed */}
          <div className="flex-1 min-w-0">
            {/* New Win Flash */}
            {newWin && (
              <div className="mb-3 bg-green-500/10 border border-green-500/40 rounded-xl px-4 py-3 flex items-center gap-3 animate-win-flash">
                <span className="text-green-400 text-xl">🎉</span>
                <div className="flex-1 min-w-0">
                  <span className="font-bold text-white">{newWin.name}</span>
                  <span className="text-gray-400 text-sm"> выиграл </span>
                  <span className="font-bold text-green-400">
                    {newWin.currency}{(newWin.amount * newWin.multiplier).toFixed(2)}
                  </span>
                  <span className="text-gray-400 text-sm"> с коэффициентом </span>
                  <span className="font-bold text-yellow-400">x{newWin.multiplier}</span>
                </div>
              </div>
            )}

            {/* Table Header */}
            <div className="grid grid-cols-4 gap-2 px-3 pb-2 text-xs text-gray-500 uppercase tracking-wider">
              <div>Игрок</div>
              <div className="text-right">Ставка</div>
              <div className="text-center">x Коэфф.</div>
              <div className="text-right">Выигрыш</div>
            </div>

            {/* Winners List */}
            <div className="space-y-1.5 overflow-hidden" style={{ maxHeight: '420px', overflowY: 'auto' }}>
              {winners.map((winner, i) => (
                <div
                  key={winner.id}
                  className={`grid grid-cols-4 gap-2 items-center px-3 py-2.5 rounded-xl transition-all border ${
                    getMegaWin(winner.amount, winner.multiplier)
                      ? 'bg-yellow-500/10 border-yellow-500/20 animate-win-flash'
                      : i === 0
                      ? 'bg-green-500/8 border-green-500/20'
                      : 'bg-white/3 border-white/5 hover:bg-white/6'
                  }`}
                >
                  <div className="flex items-center gap-2 min-w-0">
                    <div className="w-7 h-7 rounded-full bg-gradient-to-br from-red-500 to-purple-500 flex items-center justify-center text-xs font-bold flex-shrink-0">
                      {winner.name[0]}
                    </div>
                    <span className="text-white text-sm font-medium truncate">{winner.name}</span>
                  </div>

                  <div className="text-right text-gray-400 text-sm font-mono">
                    {winner.currency}{winner.amount.toFixed(2)}
                  </div>

                  <div className="flex justify-center">
                    <span className={`text-xs font-bold px-2 py-1 rounded-full border ${getMultiplierBadge(winner.multiplier)}`}>
                      x{winner.multiplier}
                    </span>
                  </div>

                  <div className="text-right">
                    <span className={`font-bold text-sm ${getMegaWin(winner.amount, winner.multiplier) ? 'text-yellow-400' : 'text-green-400'}`}>
                      {winner.currency}{(winner.amount * winner.multiplier).toFixed(2)}
                    </span>
                    {getMegaWin(winner.amount, winner.multiplier) && (
                      <div className="text-xs text-yellow-500">🔥 MEGA WIN</div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LiveWinners;
