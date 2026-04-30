import React from 'react';

const stats = [
  {
    icon: '📈',
    value: '97%',
    label: 'RTP (Возврат)',
    desc: 'Один из лучших показателей в индустрии',
    color: 'from-green-500/20 to-emerald-600/10',
    border: 'border-green-500/30',
    textColor: 'text-green-400',
  },
  {
    icon: '🚀',
    value: 'x1,000,000',
    label: 'Макс. множитель',
    desc: 'Теоретически возможный коэффициент',
    color: 'from-yellow-500/20 to-orange-600/10',
    border: 'border-yellow-500/30',
    textColor: 'text-yellow-400',
  },
  {
    icon: '🎮',
    value: 'Spribe',
    label: 'Провайдер',
    desc: 'Лицензированный разработчик с 2018 года',
    color: 'from-blue-500/20 to-indigo-600/10',
    border: 'border-blue-500/30',
    textColor: 'text-blue-400',
  },
  {
    icon: '⚡',
    value: '< 1 сек',
    label: 'Скорость раунда',
    desc: 'Мгновенный старт без ожидания',
    color: 'from-red-500/20 to-rose-600/10',
    border: 'border-red-500/30',
    textColor: 'text-red-400',
  },
  {
    icon: '🛡️',
    value: 'Fair',
    label: 'Provably Fair',
    desc: 'Проверяемая честность каждого раунда',
    color: 'from-purple-500/20 to-violet-600/10',
    border: 'border-purple-500/30',
    textColor: 'text-purple-400',
  },
  {
    icon: '💎',
    value: '2018',
    label: 'На рынке с',
    desc: 'Более 6 лет — проверенная репутация',
    color: 'from-cyan-500/20 to-sky-600/10',
    border: 'border-cyan-500/30',
    textColor: 'text-cyan-400',
  },
];

const QuickInfo: React.FC = () => {
  return (
    <section className="py-16 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#050b18] to-transparent" />

      <div className="container-xl relative z-10">
        {/* Section Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 text-red-400 text-sm font-medium uppercase tracking-widest mb-3">
            <span className="w-8 h-px bg-red-500" />
            Характеристики игры
            <span className="w-8 h-px bg-red-500" />
          </div>
          <h2 className="font-orbitron font-bold text-2xl md:text-3xl text-white">
            Почему <span className="text-red-400">Aviator</span> — №1 в мире?
          </h2>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {stats.map((stat, i) => (
            <div
              key={i}
              className={`bg-gradient-to-b ${stat.color} border ${stat.border} rounded-xl p-4 text-center hover:scale-105 transition-transform cursor-default group`}
            >
              <div className="text-2xl mb-2">{stat.icon}</div>
              <div className={`font-orbitron font-black text-lg mb-1 ${stat.textColor}`}>{stat.value}</div>
              <div className="text-white font-medium text-xs mb-1">{stat.label}</div>
              <div className="text-gray-500 text-xs opacity-0 group-hover:opacity-100 transition-opacity">{stat.desc}</div>
            </div>
          ))}
        </div>

        {/* Live Stats Bar */}
        <div className="mt-8 bg-glass border border-white/8 rounded-xl px-6 py-4 flex flex-wrap items-center justify-center gap-6 md:gap-10">
          <div className="text-center">
            <div className="text-xs text-gray-500 uppercase tracking-wider mb-0.5">Игроков онлайн</div>
            <div className="font-orbitron font-bold text-lg text-green-400">124,832</div>
          </div>
          <div className="h-8 w-px bg-white/10 hidden md:block" />
          <div className="text-center">
            <div className="text-xs text-gray-500 uppercase tracking-wider mb-0.5">Выигрышей за час</div>
            <div className="font-orbitron font-bold text-lg text-yellow-400">$2,847,193</div>
          </div>
          <div className="h-8 w-px bg-white/10 hidden md:block" />
          <div className="text-center">
            <div className="text-xs text-gray-500 uppercase tracking-wider mb-0.5">Рекорд множителя</div>
            <div className="font-orbitron font-bold text-lg text-red-400">x238,570</div>
          </div>
          <div className="h-8 w-px bg-white/10 hidden md:block" />
          <div className="text-center">
            <div className="text-xs text-gray-500 uppercase tracking-wider mb-0.5">Раундов сыграно</div>
            <div className="font-orbitron font-bold text-lg text-blue-400">1.2B+</div>
          </div>
          <div className="h-8 w-px bg-white/10 hidden md:block" />
          <div className="text-center">
            <div className="text-xs text-gray-500 uppercase tracking-wider mb-0.5">Средний коэфф.</div>
            <div className="font-orbitron font-bold text-lg text-purple-400">3.07x</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default QuickInfo;
