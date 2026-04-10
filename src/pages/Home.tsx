import { useState, useEffect } from "react";
import Icon from "@/components/ui/icon";

const MASCOT_THUMBS = "https://cdn.poehali.dev/projects/25d547e9-32e8-4987-8f1a-a0b8997cbc86/bucket/e3a5b438-5fdd-402d-b4d8-7d0a7b300126.png";
const MASCOT_HAPPY = "https://cdn.poehali.dev/projects/25d547e9-32e8-4987-8f1a-a0b8997cbc86/bucket/33ee4302-33d0-4b32-a387-61140be18e8b.png";

const CLOUDS = [
  { w: 160, h: 70, x: 5, y: 8, delay: 0 },
  { w: 220, h: 80, x: 60, y: 5, delay: 2 },
  { w: 130, h: 55, x: 35, y: 18, delay: 4 },
  { w: 180, h: 65, x: 78, y: 22, delay: 1 },
];

interface HomeProps {
  onNavigate: (page: string) => void;
}

export default function Home({ onNavigate }: HomeProps) {
  const [visible, setVisible] = useState(false);
  const [mascot, setMascot] = useState(MASCOT_THUMBS);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 80);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="min-h-screen relative overflow-hidden flex flex-col">
      {/* Небесный градиент */}
      <div className="absolute inset-0 sky-gradient" />

      {/* Облака */}
      {CLOUDS.map((c, i) => (
        <div
          key={i}
          className="absolute cloud-float pointer-events-none"
          style={{
            left: `${c.x}%`,
            top: `${c.y}%`,
            animationDelay: `${c.delay}s`,
            width: c.w,
            height: c.h,
            background: "radial-gradient(ellipse at 40% 40%, rgba(255,255,255,0.95) 30%, rgba(255,255,255,0.5) 70%, transparent 100%)",
            borderRadius: "50%",
          }}
        />
      ))}

      {/* Декоративные звёзды */}
      {["✦", "✧", "✦", "✧", "✦"].map((s, i) => (
        <div
          key={i}
          className="absolute animate-float pointer-events-none select-none text-sky"
          style={{
            left: `${10 + i * 20}%`,
            top: `${15 + (i % 2) * 60}%`,
            fontSize: 14 + (i % 3) * 6,
            animationDelay: `${i * 0.7}s`,
            opacity: 0.4,
          }}
        >
          {s}
        </div>
      ))}

      {/* Навигация */}
      <nav className="relative z-10 flex items-center justify-between px-5 py-4">
        <div className="flex items-center gap-2">
          <div
            className="w-10 h-10 rounded-2xl flex items-center justify-center text-xl shadow-md"
            style={{ background: "linear-gradient(135deg, #3b9eff, #ff7eb3)" }}
          >
            ✈️
          </div>
          <span className="font-oswald text-2xl font-bold text-navy">АвиаКурс</span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => onNavigate("achievements")}
            className="flex items-center gap-2 px-4 py-2 rounded-2xl sky-card text-gold btn-sky text-sm font-oswald font-semibold border border-yellow-200"
          >
            🏆 <span className="hidden sm:inline">Достижения</span>
          </button>
          <button
            onClick={() => onNavigate("profile")}
            className="flex items-center gap-2 px-4 py-2 rounded-2xl sky-card text-sky btn-sky text-sm font-oswald font-semibold"
          >
            👤 <span className="hidden sm:inline">Профиль</span>
          </button>
        </div>
      </nav>

      {/* Основной контент */}
      <main className="relative z-10 flex-1 flex flex-col lg:flex-row items-center justify-center px-5 gap-4 pb-4">

        {/* Левая часть — текст */}
        <div
          className={`flex-1 max-w-lg text-center lg:text-left transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          <div className="inline-flex items-center gap-2 mb-4 px-4 py-1.5 rounded-full sky-card text-sm font-golos font-medium text-sky border border-sky-100">
            <span>✈️</span>
            <span>Авиационное обучение</span>
          </div>

          <h1 className="font-oswald text-5xl sm:text-6xl font-bold text-navy leading-tight mb-3">
            ВЗЛЁТ<br />
            <span style={{ color: "var(--sky-blue)" }}>К ЗНАНИЯМ</span>
          </h1>

          <p className="text-muted-foreground text-base font-golos leading-relaxed mb-6 max-w-md mx-auto lg:mx-0">
            Изучай авиацию вместе с инструктором через интерактивные лекции-новеллы и карточки знаний
          </p>

          {/* Прогресс */}
          <div className="sky-card rounded-2xl p-4 mb-6 w-full max-w-sm mx-auto lg:mx-0">
            <div className="flex items-center justify-between mb-1 text-sm font-golos">
              <span className="text-muted-foreground">Прогресс курса</span>
              <span className="font-bold text-sky">Уровень 3</span>
            </div>
            <div className="w-full rounded-full h-2.5 mb-2" style={{ background: "#e8f0ff" }}>
              <div className="progress-sky h-2.5" style={{ width: "42%" }} />
            </div>
            <div className="flex items-center gap-3 text-xs text-muted-foreground font-golos">
              <span>⚡ 340 XP</span>
              <span>·</span>
              <span>🔥 5 дней</span>
              <span>·</span>
              <span>🏅 8 значков</span>
            </div>
          </div>

          {/* Кнопки разделов */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
            <button
              onClick={() => onNavigate("novel")}
              onMouseEnter={() => setMascot(MASCOT_HAPPY)}
              onMouseLeave={() => setMascot(MASCOT_THUMBS)}
              className="flex items-center gap-3 px-5 py-4 rounded-2xl text-white btn-sky shadow-lg"
              style={{ background: "linear-gradient(135deg, #3b9eff, #1a6fd4)" }}
            >
              <span className="text-2xl">📖</span>
              <div className="text-left">
                <div className="font-oswald font-bold text-base">Визуальная Новелла</div>
                <div className="text-xs font-golos opacity-80">3 главы · ~15 мин</div>
              </div>
              <Icon name="ChevronRight" size={18} className="ml-auto" />
            </button>

            <button
              onClick={() => onNavigate("cards")}
              onMouseEnter={() => setMascot(MASCOT_HAPPY)}
              onMouseLeave={() => setMascot(MASCOT_THUMBS)}
              className="flex items-center gap-3 px-5 py-4 rounded-2xl text-white btn-pink shadow-lg"
              style={{ background: "linear-gradient(135deg, #ff7eb3, #e85599)" }}
            >
              <span className="text-2xl">🃏</span>
              <div className="text-left">
                <div className="font-oswald font-bold text-base">Карточки Знаний</div>
                <div className="text-xs font-golos opacity-80">12 карточек</div>
              </div>
              <Icon name="ChevronRight" size={18} className="ml-auto" />
            </button>
          </div>
        </div>

        {/* Маскот */}
        <div
          className={`relative flex-shrink-0 transition-all duration-700 delay-200 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          <div
            className="absolute inset-0 rounded-full blur-3xl opacity-20 pointer-events-none"
            style={{ background: "radial-gradient(circle, #3b9eff 0%, #ff7eb3 100%)" }}
          />
          <img
            src={mascot}
            alt="Инструктор"
            className="relative w-80 sm:w-96 lg:w-[26rem] object-contain animate-float transition-all duration-500"
            style={{ filter: "drop-shadow(0 8px 24px rgba(59,158,255,0.2))" }}
          />

        </div>
      </main>

      {/* Донат */}
      <div className="relative z-10 px-5 pb-5">
        <div className="max-w-xl mx-auto">
          <a
            href="#"
            className="flex items-center gap-4 rounded-2xl px-5 py-4 shadow-md w-full transition-all hover:scale-[1.01] active:scale-[0.99]"
            style={{ background: "linear-gradient(135deg, #fff8e8, #fff3d6)", border: "1.5px solid #f5a62344" }}
          >
            <div
              className="w-11 h-11 rounded-xl flex items-center justify-center text-xl flex-shrink-0"
              style={{ background: "linear-gradient(135deg, #f5a623, #e08c00)" }}
            >
              ☕
            </div>
            <div className="flex-1 min-w-0">
              <div className="font-oswald font-bold text-navy text-sm">Поддержи проект</div>
              <div className="font-golos text-xs text-muted-foreground">Любая сумма помогает развитию курса</div>
            </div>
            <Icon name="Heart" size={18} style={{ color: "#f5a623" }} className="flex-shrink-0" />
          </a>
        </div>
      </div>
    </div>
  );
}