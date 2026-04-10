import Icon from "@/components/ui/icon";

const MASCOT_THUMBS = "https://cdn.poehali.dev/projects/25d547e9-32e8-4987-8f1a-a0b8997cbc86/bucket/2e9452fe-36ac-4664-a4b9-77962b29491e.png";

const STATS = [
  { icon: "⚡", label: "Очков опыта", value: "340 XP", color: "#f5a623" },
  { icon: "🔥", label: "Серия дней", value: "5 дней", color: "#ff7433" },
  { icon: "📖", label: "Уроков пройдено", value: "3 из 24", color: "#3b9eff" },
  { icon: "🃏", label: "Карточек изучено", value: "7 из 12", color: "#ff7eb3" },
  { icon: "🏅", label: "Достижений", value: "8 из 50", color: "#00b87a" },
  { icon: "⏱️", label: "Время обучения", value: "2ч 40м", color: "#7c5cfc" },
];

const HISTORY = [
  { date: "Сегодня", action: "Прошёл новеллу «Основы аэродинамики»", xp: "+100 XP", icon: "📖" },
  { date: "Вчера", action: "Изучено 5 карточек знаний", xp: "+75 XP", icon: "🃏" },
  { date: "3 дня назад", action: "Разблокировано достижение «Первый полёт»", xp: "+50 XP", icon: "🏅" },
  { date: "4 дня назад", action: "Прошёл вводную лекцию", xp: "+50 XP", icon: "📖" },
];

interface ProfileProps {
  onNavigate: (page: string) => void;
}

export default function Profile({ onNavigate }: ProfileProps) {
  return (
    <div className="min-h-screen relative overflow-hidden" style={{ background: "linear-gradient(160deg, #e0f0ff 0%, #fdf0f8 60%, #e8f4ff 100%)" }}>
      {/* Облака */}
      {[{ x: 5, y: 4, w: 170 }, { x: 70, y: 2, w: 210 }].map((c, i) => (
        <div
          key={i}
          className="absolute cloud-float pointer-events-none opacity-50"
          style={{
            left: `${c.x}%`, top: `${c.y}%`,
            width: c.w, height: Math.round(c.w * 0.4),
            background: "radial-gradient(ellipse at 40% 40%, rgba(255,255,255,0.9) 30%, transparent 80%)",
            borderRadius: "50%",
            animationDelay: `${i * 2.5}s`,
          }}
        />
      ))}

      {/* Шапка */}
      <header className="relative z-10 flex items-center justify-between px-4 py-3">
        <button
          onClick={() => onNavigate("home")}
          className="flex items-center gap-2 px-3 py-2 rounded-xl sky-card text-navy text-sm btn-sky font-oswald font-semibold"
        >
          <Icon name="Home" size={15} />
          Главная
        </button>
        <button
          onClick={() => onNavigate("achievements")}
          className="flex items-center gap-2 px-3 py-2 rounded-xl sky-card text-gold text-sm btn-sky font-oswald font-semibold border border-yellow-200"
        >
          🏆 Достижения
        </button>
      </header>

      <div className="relative z-10 px-4 pb-8">
        <div className="max-w-2xl mx-auto">

          {/* Карточка профиля */}
          <div className="sky-card rounded-3xl p-6 mb-5 border border-sky-100 overflow-hidden relative">
            <div className="absolute top-0 right-0 w-48 h-48 rounded-bl-full opacity-10" style={{ background: "radial-gradient(circle, #3b9eff, #ff7eb3)" }} />

            <div className="flex items-center gap-5">
              {/* Аватар с маскотом */}
              <div className="relative flex-shrink-0">
                <div
                  className="w-20 h-20 rounded-2xl overflow-hidden border-2"
                  style={{ borderColor: "#3b9eff" }}
                >
                  <img src={MASCOT_THUMBS} alt="Профиль" className="w-full h-full object-contain" style={{ objectPosition: "top" }} />
                </div>
                <div
                  className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full flex items-center justify-center text-xs text-white font-oswald font-bold"
                  style={{ background: "#3b9eff" }}
                >
                  3
                </div>
              </div>

              <div className="flex-1">
                <h2 className="font-oswald text-2xl font-bold text-navy">Курсант Алексей</h2>
                <p className="text-muted-foreground text-sm font-golos mb-2">Уровень 3 · Начинающий лётчик</p>
                <div className="flex items-center gap-2 text-xs font-golos text-muted-foreground">
                  <span>✈️ Обучается с апреля 2026</span>
                </div>
              </div>
            </div>

            {/* XP прогресс */}
            <div className="mt-4">
              <div className="flex justify-between text-xs font-golos mb-1">
                <span className="text-muted-foreground">До уровня 4</span>
                <span className="font-semibold text-sky">340 / 1000 XP</span>
              </div>
              <div className="w-full rounded-full h-3" style={{ background: "#e0eeff" }}>
                <div
                  className="h-3 rounded-full"
                  style={{ width: "34%", background: "linear-gradient(90deg, #3b9eff, #ff7eb3)", transition: "width 0.5s" }}
                />
              </div>
            </div>
          </div>

          {/* Статистика */}
          <h3 className="font-oswald text-xl font-bold text-navy mb-3 px-1">Статистика</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-5">
            {STATS.map((s, i) => (
              <div key={i} className="sky-card rounded-2xl p-4 text-center border border-sky-100">
                <div className="text-2xl mb-2">{s.icon}</div>
                <div className="font-oswald text-lg font-bold" style={{ color: s.color }}>{s.value}</div>
                <div className="text-xs text-muted-foreground font-golos mt-0.5">{s.label}</div>
              </div>
            ))}
          </div>

          {/* История активности */}
          <h3 className="font-oswald text-xl font-bold text-navy mb-3 px-1">История активности</h3>
          <div className="space-y-2">
            {HISTORY.map((h, i) => (
              <div key={i} className="sky-card rounded-2xl p-4 flex items-center gap-3 border border-sky-100">
                <div className="text-2xl flex-shrink-0">{h.icon}</div>
                <div className="flex-1">
                  <div className="text-sm font-golos text-navy font-medium">{h.action}</div>
                  <div className="text-xs text-muted-foreground font-golos">{h.date}</div>
                </div>
                <div className="text-sm font-oswald font-bold text-gold flex-shrink-0">{h.xp}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}