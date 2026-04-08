import { useState, useEffect } from "react";
import Icon from "@/components/ui/icon";

const BG_IMAGE = "https://cdn.poehali.dev/projects/25d547e9-32e8-4987-8f1a-a0b8997cbc86/files/03d0acd3-669e-4232-91f0-40e5f27ec757.jpg";

const FLOATING_SHAPES = [
  { emoji: "⭐", x: 8, y: 15, delay: 0 },
  { emoji: "🎮", x: 85, y: 20, delay: 0.5 },
  { emoji: "📚", x: 15, y: 70, delay: 1 },
  { emoji: "🏆", x: 80, y: 65, delay: 1.5 },
  { emoji: "💡", x: 50, y: 10, delay: 0.8 },
  { emoji: "🎯", x: 92, y: 45, delay: 0.3 },
  { emoji: "🌟", x: 3, y: 45, delay: 1.2 },
];

interface HomeProps {
  onNavigate: (page: string) => void;
}

export default function Home({ onNavigate }: HomeProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="min-h-screen relative overflow-hidden flex flex-col">
      {/* Фоновое изображение */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${BG_IMAGE})` }}
      />
      <div className="absolute inset-0 bg-background/75" />

      {/* Декоративные звёзды */}
      <div className="absolute inset-0 stars-bg opacity-60" />

      {/* Плавающие элементы */}
      {FLOATING_SHAPES.map((s, i) => (
        <div
          key={i}
          className="absolute text-2xl select-none animate-float pointer-events-none"
          style={{
            left: `${s.x}%`,
            top: `${s.y}%`,
            animationDelay: `${s.delay}s`,
            opacity: 0.7,
          }}
        >
          {s.emoji}
        </div>
      ))}

      {/* Навигация */}
      <nav className="relative z-10 flex items-center justify-between px-6 py-4">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-neon-purple to-neon-cyan flex items-center justify-center glow-purple">
            <span className="text-xl">🎓</span>
          </div>
          <span className="font-oswald text-2xl font-bold text-white text-glow-purple">
            ЗнайКа
          </span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => onNavigate("achievements")}
            className="flex items-center gap-2 px-4 py-2 rounded-xl card-game border border-neon-yellow/30 text-neon-yellow btn-game text-sm hover:border-neon-yellow/70 transition-all"
          >
            <span>🏆</span>
            <span className="hidden sm:inline">Достижения</span>
          </button>
          <button
            onClick={() => onNavigate("profile")}
            className="flex items-center gap-2 px-4 py-2 rounded-xl card-game border border-neon-cyan/30 text-neon-cyan btn-game text-sm hover:border-neon-cyan/70 transition-all"
          >
            <span>👤</span>
            <span className="hidden sm:inline">Профиль</span>
          </button>
        </div>
      </nav>

      {/* Герой */}
      <main className="relative z-10 flex-1 flex flex-col items-center justify-center px-4 py-8">
        <div
          className={`text-center transition-all duration-700 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="inline-block mb-4 px-4 py-1 rounded-full bg-neon-purple/20 border border-neon-purple/40 text-neon-purple text-sm font-golos font-medium">
            🚀 Обучение через игру
          </div>
          <h1 className="font-oswald text-5xl sm:text-7xl font-bold text-white mb-4 leading-tight">
            УЧИСЬ
            <br />
            <span className="text-glow-cyan" style={{ color: "var(--neon-cyan)" }}>
              ИГРАЯ
            </span>
          </h1>
          <p className="text-muted-foreground text-lg max-w-md mx-auto mb-10 font-golos">
            Интерактивные новеллы, карточки знаний и система достижений — всё для того, чтобы обучение было в радость
          </p>

          {/* Прогресс игрока */}
          <div className="mb-10 card-game rounded-2xl px-6 py-4 inline-flex flex-col items-center gap-2 border border-neon-purple/30">
            <div className="flex items-center gap-3 text-sm text-muted-foreground font-golos">
              <span>⚡ Уровень 3</span>
              <span>·</span>
              <span>✨ 340 очков</span>
              <span>·</span>
              <span>🔥 5 дней подряд</span>
            </div>
            <div className="w-full bg-muted rounded-full h-2">
              <div className="progress-bar" style={{ width: "42%" }} />
            </div>
            <span className="text-xs text-muted-foreground">420 / 1000 XP до уровня 4</span>
          </div>

          {/* Карточки разделов */}
          <div className="grid sm:grid-cols-2 gap-5 max-w-2xl mx-auto">
            {/* Новелла */}
            <button
              onClick={() => onNavigate("novel")}
              className="group relative card-game rounded-3xl p-6 border border-neon-purple/30 hover:border-neon-purple/70 transition-all duration-300 text-left overflow-hidden hover:-translate-y-1 glow-purple"
            >
              <div className="absolute top-0 right-0 w-24 h-24 bg-neon-purple/10 rounded-bl-full" />
              <div className="text-5xl mb-4">📖</div>
              <h2 className="font-oswald text-2xl font-bold text-white mb-2">
                Визуальная Новелла
              </h2>
              <p className="text-muted-foreground text-sm font-golos leading-relaxed">
                Погрузись в интерактивную историю и усвой знания через увлекательный нарратив
              </p>
              <div className="mt-4 flex items-center gap-2 text-neon-purple text-sm font-golos font-medium">
                <span>Начать урок</span>
                <Icon name="ArrowRight" size={16} />
              </div>
              <div className="absolute bottom-3 right-4 text-xs text-muted-foreground">
                3 главы · ~15 мин
              </div>
            </button>

            {/* Карточки */}
            <button
              onClick={() => onNavigate("cards")}
              className="group relative card-game rounded-3xl p-6 border border-neon-cyan/30 hover:border-neon-cyan/70 transition-all duration-300 text-left overflow-hidden hover:-translate-y-1 glow-cyan"
            >
              <div className="absolute top-0 right-0 w-24 h-24 bg-neon-cyan/10 rounded-bl-full" />
              <div className="text-5xl mb-4">🃏</div>
              <h2 className="font-oswald text-2xl font-bold text-white mb-2">
                Карточки Знаний
              </h2>
              <p className="text-muted-foreground text-sm font-golos leading-relaxed">
                Изучай концепции через компактные карточки — запоминай быстро и эффективно
              </p>
              <div className="mt-4 flex items-center gap-2 text-neon-cyan text-sm font-golos font-medium">
                <span>Открыть карточки</span>
                <Icon name="ArrowRight" size={16} />
              </div>
              <div className="absolute bottom-3 right-4 text-xs text-muted-foreground">
                12 карточек
              </div>
            </button>
          </div>
        </div>
      </main>

      {/* Нижняя статистика */}
      <div className="relative z-10 px-6 pb-6">
        <div className="max-w-2xl mx-auto grid grid-cols-3 gap-3">
          {[
            { icon: "👥", val: "1 200+", label: "учеников" },
            { icon: "📚", val: "24", label: "урока" },
            { icon: "🏅", val: "150+", label: "достижений" },
          ].map((s, i) => (
            <div key={i} className="card-game rounded-2xl p-3 text-center border border-border/50">
              <div className="text-2xl mb-1">{s.icon}</div>
              <div className="font-oswald text-xl font-bold text-white">{s.val}</div>
              <div className="text-xs text-muted-foreground font-golos">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
