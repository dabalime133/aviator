import React, { useState } from 'react';

const strategies = [
  {
    name: 'Консервативная',
    emoji: '🐢',
    target: 'x1.5 – x2.0',
    risk: 'Низкий',
    riskColor: 'text-green-400',
    winRate: '~72%',
    desc: 'Делайте кэшаут на небольших коэффициентах. Меньше выигрыш за раунд, но стабильный плюс за длинную сессию. Идеально для новичков.',
    steps: [
      'Ставьте фиксированную сумму (1-5% от депозита)',
      'Устанавливайте авто-кэшаут на x1.5',
      'Не меняйте стратегию после проигрышей',
      'Цель: 20-30% доходность за сессию',
    ],
    color: 'from-green-500/20 to-emerald-600/10',
    border: 'border-green-500/30',
    badge: 'Рекомендуется',
    badgeColor: 'bg-green-500/20 text-green-400 border-green-500/30',
  },
  {
    name: 'Мартингейл',
    emoji: '📈',
    target: 'x2.0',
    risk: 'Высокий',
    riskColor: 'text-red-400',
    winRate: '~60%',
    desc: 'Удваивайте ставку после каждого проигрыша. Позволяет отыграть потери при первом выигрыше. Требует большого банкролла.',
    steps: [
      'Начните с минимальной ставки ($1–$5)',
      'При проигрыше удвойте ставку',
      'При выигрыше вернитесь к начальной ставке',
      'Установите жёсткий стоп-лосс (10–15 раундов)',
    ],
    color: 'from-orange-500/20 to-red-600/10',
    border: 'border-orange-500/30',
    badge: 'Для опытных',
    badgeColor: 'bg-orange-500/20 text-orange-400 border-orange-500/30',
  },
  {
    name: 'Охотник за большим',
    emoji: '🦅',
    target: 'x10+',
    risk: 'Очень высокий',
    riskColor: 'text-red-500',
    winRate: '~25%',
    desc: 'Ждите больших коэффициентов. Редкие, но массивные выигрыши. Требует терпения и готовности к серии проигрышей.',
    steps: [
      'Делайте маленькие ставки ($1–$2)',
      'Нацельтесь на x10, x20, x50',
      'Используйте авто-кэшаут на высоком коэффициенте',
      'Одна удача перекроет 20+ проигрышей',
    ],
    color: 'from-purple-500/20 to-violet-600/10',
    border: 'border-purple-500/30',
    badge: 'Риск/Прибыль',
    badgeColor: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
  },
  {
    name: 'Двойная ставка',
    emoji: '⚡',
    target: 'x1.5 + x10',
    risk: 'Средний',
    riskColor: 'text-yellow-400',
    winRate: '~65%',
    desc: 'Профессиональная стратегия: одна ставка на низкий коэффициент (страховка), вторая — на высокий. Лучший баланс риска и прибыли.',
    steps: [
      '70% суммы — на x1.5 (авто-кэшаут)',
      '30% суммы — на x5–x20 (ручной)',
      'Малая ставка окупает раунд при любом исходе',
      'Большая ставка — потенциал взрывного роста',
    ],
    color: 'from-blue-500/20 to-cyan-600/10',
    border: 'border-blue-500/30',
    badge: 'Топ стратегия',
    badgeColor: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
  },
];

const Strategies: React.FC = () => {
  const [active, setActive] = useState(0);

  return (
    <section id="strategies" className="py-20 relative">
      <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, #050b18 0%, #070e1d 50%, #050b18 100%)' }} />

      <div className="container-xl relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 text-yellow-400 text-sm font-medium uppercase tracking-widest mb-3">
            <span className="w-8 h-px bg-yellow-500" />
            Стратегии Авиатор 2026
            <span className="w-8 h-px bg-yellow-500" />
          </div>
          <h2 className="font-orbitron font-bold text-2xl md:text-4xl text-white mb-4">
            Как выиграть в <span className="text-yellow-400">Авиатор</span>?
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Нет 100% рабочей стратегии — это факт. Но правильный подход к управлению
            банкроллом и тактика кэшаута значительно увеличивают ваши шансы.
          </p>
        </div>

        {/* Strategy Tabs */}
        <div className="flex flex-wrap gap-2 justify-center mb-8">
          {strategies.map((s, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl font-medium text-sm transition-all ${
                active === i
                  ? 'gradient-red text-white shadow-lg glow-red'
                  : 'bg-white/5 text-gray-400 hover:bg-white/10 border border-white/10'
              }`}
            >
              <span>{s.emoji}</span>
              <span className="hidden sm:inline">{s.name}</span>
            </button>
          ))}
        </div>

        {/* Active Strategy Detail */}
        <div className={`bg-gradient-to-br ${strategies[active].color} border ${strategies[active].border} rounded-2xl p-6 md:p-8 mb-8`}>
          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-4xl">{strategies[active].emoji}</span>
                <div>
                  <h3 className="font-orbitron font-bold text-xl text-white">{strategies[active].name}</h3>
                  <span className={`text-xs px-2 py-0.5 rounded-full border ${strategies[active].badgeColor}`}>
                    {strategies[active].badge}
                  </span>
                </div>
              </div>
              <p className="text-gray-300 mb-5 leading-relaxed">{strategies[active].desc}</p>

              {/* Stats Row */}
              <div className="flex gap-6 mb-5">
                <div>
                  <div className="text-xs text-gray-500 mb-1">Цель кэшаута</div>
                  <div className="font-orbitron font-bold text-white">{strategies[active].target}</div>
                </div>
                <div>
                  <div className="text-xs text-gray-500 mb-1">Уровень риска</div>
                  <div className={`font-bold ${strategies[active].riskColor}`}>{strategies[active].risk}</div>
                </div>
                <div>
                  <div className="text-xs text-gray-500 mb-1">Win Rate</div>
                  <div className="font-bold text-white">{strategies[active].winRate}</div>
                </div>
              </div>

              <a
                href="#play"
                className="inline-flex items-center gap-2 gradient-red text-white font-bold px-6 py-3 rounded-xl hover:scale-105 transition-transform"
              >
                Попробовать стратегию
              </a>
            </div>

            <div className="md:w-72">
              <h4 className="text-white font-semibold mb-3 text-sm uppercase tracking-wider">Пошаговый план:</h4>
              <div className="space-y-3">
                {strategies[active].steps.map((step, i) => (
                  <div key={i} className="flex gap-3 items-start">
                    <div className="w-6 h-6 rounded-full gradient-red flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5">
                      {i + 1}
                    </div>
                    <p className="text-gray-300 text-sm">{step}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* All Strategies Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {strategies.map((s, i) => (
            <div
              key={i}
              onClick={() => setActive(i)}
              className={`bg-glass border ${i === active ? s.border : 'border-white/8'} rounded-xl p-4 cursor-pointer hover:scale-105 transition-all`}
            >
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xl">{s.emoji}</span>
                <span className="text-white font-medium text-sm">{s.name}</span>
              </div>
              <div className="text-xs text-gray-500 mb-1">Коэфф: <span className="text-gray-300">{s.target}</span></div>
              <div className="text-xs text-gray-500">Win Rate: <span className="text-gray-300">{s.winRate}</span></div>
            </div>
          ))}
        </div>

        {/* Disclaimer */}
        <div className="mt-8 bg-yellow-500/5 border border-yellow-500/20 rounded-xl p-4 text-center">
          <p className="text-yellow-500/80 text-sm">
            ⚠️ Помните: Авиатор — это азартная игра. Ни одна стратегия не гарантирует выигрыш.
            Играйте ответственно и только на деньги, которые можете позволить себе потерять.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Strategies;
