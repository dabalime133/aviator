import React from 'react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative border-t border-white/5" style={{ background: '#020710' }}>
      <div className="container-xl py-12">
        {/* Top: Logo + Nav */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-3">
              <svg width="28" height="28" viewBox="0 0 36 36" fill="none">
                <path d="M4 28L18 6L32 28H22L18 20L14 28H4Z" fill="#e21c21" />
                <circle cx="18" cy="6" r="3" fill="#e21c21" />
              </svg>
              <span className="font-orbitron font-black text-lg">
                <span className="text-white">AVI</span>
                <span className="text-red-500">ATOR</span>
              </span>
            </div>
            <p className="text-gray-500 text-xs leading-relaxed mb-4">
              Информационный сайт об игре Aviator от Spribe.
              Мы не являемся казино и не принимаем ставки.
            </p>
            <div className="flex gap-2">
              <a href="#" className="w-8 h-8 bg-white/5 border border-white/10 rounded-lg flex items-center justify-center text-gray-400 hover:text-white hover:border-white/20 transition-all text-sm">T</a>
              <a href="#" className="w-8 h-8 bg-white/5 border border-white/10 rounded-lg flex items-center justify-center text-gray-400 hover:text-white hover:border-white/20 transition-all text-sm">V</a>
              <a href="#" className="w-8 h-8 bg-white/5 border border-white/10 rounded-lg flex items-center justify-center text-gray-400 hover:text-white hover:border-white/20 transition-all text-sm">Y</a>
              <a href="#" className="w-8 h-8 bg-white/5 border border-white/10 rounded-lg flex items-center justify-center text-gray-400 hover:text-white hover:border-white/20 transition-all text-sm">I</a>
            </div>
          </div>

          {/* Игра */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-4 uppercase tracking-wider">Игра</h4>
            <ul className="space-y-2">
              {['Как играть', 'Демо версия', 'Стратегии', 'Сигналы Авиатор', 'Предиктор'].map((l) => (
                <li key={l}>
                  <a href="#" className="text-gray-500 hover:text-gray-300 text-sm transition-colors">{l}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Казино */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-4 uppercase tracking-wider">Казино</h4>
            <ul className="space-y-2">
              {['1Win Aviator', 'Mostbet Aviator', '1xBet Aviator', 'Pin-Up Aviator', 'Melbet Aviator', 'Parimatch'].map((l) => (
                <li key={l}>
                  <a href="#" className="text-gray-500 hover:text-gray-300 text-sm transition-colors">{l}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Регионы */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-4 uppercase tracking-wider">Регионы</h4>
            <ul className="space-y-2">
              {['🇷🇺 Авиатор Россия', '🇰🇿 Авиатор Казахстан', '🇺🇿 Авиатор Узбекистан', '🇧🇾 Авиатор Беларусь', '🇺🇦 Aviator Україна', '🇦🇿 Aviator Azərbaycan'].map((l) => (
                <li key={l}>
                  <a href="#" className="text-gray-500 hover:text-gray-300 text-sm transition-colors">{l}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Payment logos */}
        <div className="border-t border-white/5 pt-6 mb-6">
          <div className="flex flex-wrap items-center gap-3 justify-center">
            {['💳 VISA', '💳 Mastercard', '₿ BTC', '💎 ETH', '🔵 USDT', '💰 Piastrix', '📱 Qiwi', '🏦 СБП'].map((p) => (
              <span key={p} className="bg-white/4 border border-white/8 rounded-md px-3 py-1.5 text-xs text-gray-400">
                {p}
              </span>
            ))}
          </div>
        </div>

        {/* License logos */}
        <div className="border-t border-white/5 pt-6 mb-6">
          <div className="flex flex-wrap gap-4 justify-center items-center text-xs text-gray-600">
            <span className="bg-white/4 border border-white/8 rounded-md px-3 py-1">🏛️ MGA Licensed</span>
            <span className="bg-white/4 border border-white/8 rounded-md px-3 py-1">✅ Provably Fair</span>
            <span className="bg-white/4 border border-white/8 rounded-md px-3 py-1">🔐 SSL Secured</span>
            <span className="bg-white/4 border border-white/8 rounded-md px-3 py-1">18+ Only</span>
            <span className="bg-white/4 border border-white/8 rounded-md px-3 py-1">🎮 Spribe Official</span>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="border-t border-white/5 pt-6">
          <div className="bg-white/3 border border-white/6 rounded-xl p-4 mb-5 text-xs text-gray-500 leading-relaxed text-center">
            <strong className="text-gray-400">⚠️ ПРЕДУПРЕЖДЕНИЕ:</strong> Азартные игры могут вызывать зависимость.
            Играйте ответственно. Только для лиц старше <strong className="text-red-400">18 лет</strong>.
            Aviator Game — игра с реальными деньгами. Выигрыш не гарантирован.
            Если вы чувствуете проблему с азартными играми, обратитесь за помощью:{' '}
            <a href="#" className="text-blue-400 hover:underline">gamcare.org.uk</a> |{' '}
            <a href="#" className="text-blue-400 hover:underline">begambleaware.org</a>
          </div>

          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-gray-600">
            <div>© {currentYear} AviatorGame.info — Информационный ресурс. Все права защищены.</div>
            <div className="flex gap-4">
              <a href="#" className="hover:text-gray-400 transition-colors">Политика конфиденциальности</a>
              <a href="#" className="hover:text-gray-400 transition-colors">Условия использования</a>
              <a href="#" className="hover:text-gray-400 transition-colors">Отказ от ответственности</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
