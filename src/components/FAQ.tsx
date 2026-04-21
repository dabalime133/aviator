import React, { useState } from 'react';

const faqs = [
  {
    q: 'Как вывести деньги из Авиатора?',
    a: 'Нажмите кнопку «Кэшаут» до того, как самолёт улетит. Выигрыш автоматически зачислится на баланс вашего аккаунта. Затем перейдите в раздел «Вывод средств», выберите удобный метод (карта, крипта, электронный кошелёк) и подтвердите транзакцию. Обычно вывод занимает от нескольких минут до 24 часов.',
    emoji: '💸',
  },
  {
    q: 'Есть ли демо-версия Aviator?',
    a: 'Да! Демо-режим доступен в большинстве лицензированных казино без регистрации. В демо используется виртуальная валюта, но алгоритм игры полностью идентичен реальному — отличный способ освоить стратегии без риска.',
    emoji: '🎮',
  },
  {
    q: 'Как работает алгоритм Авиатора?',
    a: 'Aviator использует алгоритм Provably Fair на основе SHA-256 криптографии. Перед каждым раундом генерируется случайное seed-число (семя), из которого математически вычисляется момент крушения самолёта. Этот процесс невозможно предсказать или подделать.',
    emoji: '🔬',
  },
  {
    q: 'Можно ли скачать Авиатор на Android/iOS?',
    a: 'Да, большинство казино с Aviator предлагают мобильное приложение для Android (APK) и iOS. Также игра отлично работает прямо в браузере смартфона — никакого скачивания не требуется. Поддерживаются все современные устройства.',
    emoji: '📱',
  },
  {
    q: 'Какой минимальный депозит для игры?',
    a: 'Минимальная ставка в Авиаторе начинается от $0.10. Минимальный депозит зависит от платформы: обычно от $1–5. Большинство казино принимают рубли, тенге, сум и другие валюты СНГ.',
    emoji: '💰',
  },
  {
    q: 'Реально ли выиграть в Авиатор?',
    a: 'Да, и многие игроки выигрывают ежедневно. RTP игры составляет 97%, что означает: статистически на каждые $100 ставок возвращается $97. Ключ к успеху — правильная стратегия управления банкроллом и дисциплина с кэшаутом.',
    emoji: '🏆',
  },
  {
    q: 'Что такое Provably Fair и как это проверить?',
    a: 'Provably Fair — технология честной игры, позволяющая проверить любой раунд. После каждого раунда вам предоставляется client seed, server seed и nonce. Используя SHA-256, вы можете самостоятельно пересчитать результат. Любой раунд Авиатора можно верифицировать независимо.',
    emoji: '🛡️',
  },
];

const FAQ: React.FC = () => {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="py-20 relative">
      <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, #050b18 0%, #060c1a 100%)' }} />

      <div className="container-xl relative z-10">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 text-blue-400 text-sm font-medium uppercase tracking-widest mb-3">
            <span className="w-8 h-px bg-blue-500" />
            FAQ
            <span className="w-8 h-px bg-blue-500" />
          </div>
          <h2 className="font-orbitron font-bold text-2xl md:text-4xl text-white mb-4">
            Частые <span className="text-blue-400">вопросы</span>
          </h2>
          <p className="text-gray-400">Всё, что нужно знать перед первым полётом</p>
        </div>

        <div className="max-w-3xl mx-auto space-y-3">
          {faqs.map((faq, i) => (
            <div
              key={i}
              className={`border rounded-2xl overflow-hidden transition-all ${
                open === i ? 'border-red-500/40 bg-red-500/5' : 'border-white/8 bg-white/3 hover:bg-white/5 hover:border-white/15'
              }`}
            >
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex items-center gap-4 px-5 py-4 text-left"
              >
                <span className="text-xl flex-shrink-0">{faq.emoji}</span>
                <span className={`flex-1 font-medium ${open === i ? 'text-white' : 'text-gray-300'}`}>
                  {faq.q}
                </span>
                <span className={`flex-shrink-0 w-6 h-6 flex items-center justify-center rounded-full border transition-all ${
                  open === i ? 'border-red-500/50 bg-red-500/20 text-red-400' : 'border-white/15 text-gray-500'
                }`}>
                  {open === i ? '−' : '+'}
                </span>
              </button>

              {open === i && (
                <div className="px-5 pb-4 pl-14">
                  <p className="text-gray-400 leading-relaxed text-sm">{faq.a}</p>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* CTA after FAQ */}
        <div className="mt-10 text-center">
          <p className="text-gray-400 mb-4">Остались вопросы? Свяжитесь с поддержкой 24/7</p>
          <div className="flex flex-wrap gap-3 justify-center">
            <a href="#" className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/30 text-blue-400 px-5 py-2.5 rounded-xl hover:bg-blue-500/20 transition-all font-medium text-sm">
              💬 Telegram
            </a>
            <a href="#" className="inline-flex items-center gap-2 bg-green-500/10 border border-green-500/30 text-green-400 px-5 py-2.5 rounded-xl hover:bg-green-500/20 transition-all font-medium text-sm">
              🟢 WhatsApp
            </a>
            <a href="#" className="inline-flex items-center gap-2 bg-white/5 border border-white/15 text-gray-300 px-5 py-2.5 rounded-xl hover:bg-white/10 transition-all font-medium text-sm">
              📧 Email
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
