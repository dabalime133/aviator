import React from 'react';

const TrustSection: React.FC = () => {
  const trustItems = [
    {
      icon: '🛡️',
      title: 'Лицензия MGA',
      desc: 'Malta Gaming Authority — одна из самых строгих игровых лицензий в мире. Гарантирует честность и защиту игроков.',
      color: 'from-blue-500/20',
      border: 'border-blue-500/30',
    },
    {
      icon: '🔐',
      title: 'SSL 256-bit',
      desc: 'Банковское шифрование данных. Ваши личные данные и транзакции защищены на уровне мировых финансовых систем.',
      color: 'from-green-500/20',
      border: 'border-green-500/30',
    },
    {
      icon: '⛓️',
      title: 'Provably Fair',
      desc: 'Blockchain-верификация каждого раунда. Никаких скрытых манипуляций — математика открыта и проверяема.',
      color: 'from-purple-500/20',
      border: 'border-purple-500/30',
    },
    {
      icon: '⚡',
      title: 'Мгновенный вывод',
      desc: 'Деньги на карте или в криптокошельке в течение нескольких минут. Без задержек и бюрократии.',
      color: 'from-yellow-500/20',
      border: 'border-yellow-500/30',
    },
    {
      icon: '🎰',
      title: 'Spribe Certified',
      desc: 'Официальная игра от сертифицированного разработчика. Не копия, не клон — оригинальный Авиатор от Spribe.',
      color: 'from-red-500/20',
      border: 'border-red-500/30',
    },
    {
      icon: '🤝',
      title: 'Поддержка 24/7',
      desc: 'Живые операторы на русском, казахском и узбекском языках. Решаем любые вопросы в течение 5 минут.',
      color: 'from-cyan-500/20',
      border: 'border-cyan-500/30',
    },
  ];

  const casinos = [
    { name: '1Win', rating: '4.9', bonus: '+500%' },
    { name: 'Mostbet', rating: '4.8', bonus: '+200%' },
    { name: '1xBet', rating: '4.7', bonus: '+100%' },
    { name: 'Melbet', rating: '4.6', bonus: '+130%' },
    { name: 'Pin-Up', rating: '4.8', bonus: '+250%' },
    { name: 'Parimatch', rating: '4.5', bonus: '+150%' },
  ];

  return (
    <section id="trust" className="py-20 relative">
      <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, #050b18 0%, #060d1c 100%)' }} />

      <div className="container-xl relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 text-green-400 text-sm font-medium uppercase tracking-widest mb-3">
            <span className="w-8 h-px bg-green-500" />
            Безопасность и надёжность
            <span className="w-8 h-px bg-green-500" />
          </div>
          <h2 className="font-orbitron font-bold text-2xl md:text-4xl text-white mb-4">
            Почему нам <span className="text-green-400">доверяют</span>?
          </h2>
        </div>

        {/* Trust Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-14">
          {trustItems.map((item, i) => (
            <div
              key={i}
              className={`bg-gradient-to-br ${item.color} to-transparent border ${item.border} rounded-2xl p-6 hover:scale-105 transition-transform`}
            >
              <div className="text-3xl mb-3">{item.icon}</div>
              <h3 className="font-bold text-white text-base mb-2">{item.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>

        {/* Top Casinos */}
        <div className="bg-glass border border-white/8 rounded-2xl p-6 md:p-8">
          <h3 className="font-orbitron font-bold text-xl text-white text-center mb-6">
            🏆 Топ казино с <span className="text-red-400">Aviator</span> 2026
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {casinos.map((casino, i) => (
              <div
                key={i}
                className="flex items-center justify-between p-4 bg-white/4 border border-white/8 rounded-xl hover:bg-white/8 hover:border-white/15 transition-all group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-red-500 to-orange-600 flex items-center justify-center font-orbitron font-bold text-sm text-white">
                    {casino.name[0]}
                  </div>
                  <div>
                    <div className="font-bold text-white text-sm">{casino.name}</div>
                    <div className="flex items-center gap-1">
                      <span className="text-yellow-400 text-xs">★★★★★</span>
                      <span className="text-gray-400 text-xs">{casino.rating}</span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-green-400 font-bold text-sm">{casino.bonus}</div>
                  <a
                    href="#play"
                    className="text-xs text-gray-500 group-hover:text-red-400 transition-colors"
                  >
                    Играть →
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Payment Methods */}
        <div className="mt-8 text-center">
          <div className="text-gray-500 text-sm mb-4">Способы оплаты и вывода средств:</div>
          <div className="flex flex-wrap justify-center gap-3">
            {['💳 Visa/MC', '🏦 СБП', '₿ Bitcoin', '💎 USDT', '🔷 Ethereum', '💰 Piastrix', '📱 QiWi', '🇰🇿 Kaspi'].map((m) => (
              <span
                key={m}
                className="bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-sm text-gray-300 font-medium"
              >
                {m}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustSection;
