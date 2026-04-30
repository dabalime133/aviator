import React, { useState } from 'react';

const steps = [
  {
    num: '01',
    icon: '💰',
    title: 'Зарегистрируйтесь и внесите депозит',
    desc: 'Создайте аккаунт за 30 секунд. Пополните баланс любым удобным способом: карта, крипта, Piastrix. Получите бонус 200%.',
    color: 'from-red-500 to-rose-600',
    border: 'border-red-500/30',
    highlight: 'Бонус 200%',
  },
  {
    num: '02',
    icon: '✈️',
    title: 'Сделайте ставку до взлёта',
    desc: 'Выберите сумму ставки. Вы можете играть с двумя ставками одновременно — это ключ к эффективной стратегии Авиатора.',
    color: 'from-blue-500 to-indigo-600',
    border: 'border-blue-500/30',
    highlight: '2 ставки сразу',
  },
  {
    num: '03',
    icon: '👀',
    title: 'Следите за множителем',
    desc: 'Самолёт начинает взлёт — множитель растёт. Он может достичь x2, x10, x100 и даже x1,000,000. Нервы — ваш главный инструмент.',
    color: 'from-yellow-500 to-orange-500',
    border: 'border-yellow-500/30',
    highlight: 'До x1,000,000',
  },
  {
    num: '04',
    icon: '⚡',
    title: 'Жмите КЭШАУТ вовремя!',
    desc: 'Это момент истины. Нажмите кнопку Кэшаут до крушения самолёта — и выигрыш ваш. Промедлили — ставка сгорает.',
    color: 'from-green-500 to-emerald-500',
    border: 'border-green-500/30',
    highlight: 'Ключевой момент',
  },
];

const HowToPlay: React.FC = () => {
  const [activeStep, setActiveStep] = useState(0);

  return (
    <section id="how-to-play" className="py-20 relative">
      <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, #050b18 0%, #06101f 50%, #050b18 100%)' }} />

      <div className="container-xl relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 text-red-400 text-sm font-medium uppercase tracking-widest mb-3">
            <span className="w-8 h-px bg-red-500" />
            Инструкция
            <span className="w-8 h-px bg-red-500" />
          </div>
          <h2 className="font-orbitron font-bold text-2xl md:text-4xl text-white mb-4">
            Как играть в <span className="text-red-400">Авиатор</span>?
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Четыре простых шага отделяют вас от выигрыша. Авиатор — одна из самых
            прозрачных и понятных crash-игр в мире.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-12">
          {steps.map((step, i) => (
            <div
              key={i}
              onMouseEnter={() => setActiveStep(i)}
              className={`relative bg-glass border ${step.border} rounded-2xl p-6 cursor-default transition-all duration-300 hover:scale-105 ${
                activeStep === i ? 'shadow-lg' : ''
              }`}
            >
              {/* Gradient top line */}
              <div className={`absolute top-0 left-0 right-0 h-0.5 rounded-t-2xl bg-gradient-to-r ${step.color}`} />

              {/* Step number */}
              <div className="flex items-start justify-between mb-4">
                <span className={`font-orbitron font-black text-4xl bg-gradient-to-br ${step.color} bg-clip-text text-transparent opacity-40`}>
                  {step.num}
                </span>
                <span className="text-3xl">{step.icon}</span>
              </div>

              {/* Title */}
              <h3 className="font-bold text-white text-base mb-3">{step.title}</h3>

              {/* Desc */}
              <p className="text-gray-400 text-sm leading-relaxed mb-4">{step.desc}</p>

              {/* Highlight */}
              <div className={`inline-flex items-center gap-1.5 bg-gradient-to-r ${step.color} bg-opacity-10 rounded-full px-3 py-1`}>
                <span className="text-white text-xs font-bold">{step.highlight}</span>
              </div>

              {/* Arrow to next */}
              {i < steps.length - 1 && (
                <div className="hidden lg:block absolute -right-3 top-1/2 transform -translate-y-1/2 z-20">
                  <svg className="w-6 h-6 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Video / Demo Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Demo Game Preview */}
          <div className="bg-glass border border-white/8 rounded-2xl overflow-hidden">
            <div className="bg-black/30 px-4 py-3 flex items-center gap-3 border-b border-white/5">
              <span className="w-3 h-3 rounded-full bg-red-500" />
              <span className="w-3 h-3 rounded-full bg-yellow-500" />
              <span className="w-3 h-3 rounded-full bg-green-500" />
              <span className="text-gray-400 text-sm ml-2 font-medium">Демо режим Aviator</span>
            </div>
            <div className="relative bg-gradient-to-br from-[#0a1628] to-[#050b18] h-52 flex items-center justify-center">
              <img
                src="/images/aviator-plane.png"
                alt="Aviator demo"
                className="w-24 h-24 animate-float-plane drop-shadow-2xl"
                style={{ filter: 'drop-shadow(0 0 20px #e21c21)' }}
              />
              <div className="absolute bottom-4 left-4 right-4">
                <div className="flex gap-2">
                  <div className="flex-1 bg-white/5 border border-white/10 rounded-lg p-2 text-center">
                    <div className="text-xs text-gray-500">Ставка</div>
                    <div className="text-white font-bold text-sm">$10.00</div>
                  </div>
                  <div className="flex-1 bg-white/5 border border-white/10 rounded-lg p-2 text-center">
                    <div className="text-xs text-gray-500">Множитель</div>
                    <div className="text-green-400 font-orbitron font-bold text-sm">3.47x</div>
                  </div>
                  <div className="flex-1 bg-white/5 border border-white/10 rounded-lg p-2 text-center">
                    <div className="text-xs text-gray-500">Выигрыш</div>
                    <div className="text-yellow-400 font-bold text-sm">$34.70</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="p-4">
              <a
                href="#play"
                className="w-full inline-flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 border border-white/15 text-white font-bold py-3 rounded-xl transition-all"
              >
                🎮 Попробовать демо бесплатно
              </a>
            </div>
          </div>

          {/* Pro Tips */}
          <div className="bg-glass border border-white/8 rounded-2xl p-6">
            <h3 className="font-bold text-white text-lg mb-4 flex items-center gap-2">
              <span>💡</span> Советы новичка
            </h3>
            <div className="space-y-3">
              {[
                { tip: 'Начинайте с небольших ставок', sub: 'Изучите алгоритм игры на малых суммах', icon: '🎯' },
                { tip: 'Используйте авто-кэшаут', sub: 'Установите x1.5–x2.0 для стабильного дохода', icon: '⚙️' },
                { tip: 'Играйте в 2 ставки', sub: 'Одна на x1.5, другая на x5+ — баланс риска', icon: '🔀' },
                { tip: 'Следите за историей', sub: 'Анализируйте прошлые раунды для паттернов', icon: '📊' },
                { tip: 'Установите лимит потерь', sub: 'Остановитесь при достижении дневного лимита', icon: '🛑' },
              ].map((item, i) => (
                <div key={i} className="flex gap-3 p-3 bg-white/3 rounded-xl hover:bg-white/6 transition-colors">
                  <span className="text-lg flex-shrink-0">{item.icon}</span>
                  <div>
                    <div className="text-white font-medium text-sm">{item.tip}</div>
                    <div className="text-gray-500 text-xs mt-0.5">{item.sub}</div>
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

export default HowToPlay;
