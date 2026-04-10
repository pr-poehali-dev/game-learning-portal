import Icon from "@/components/ui/icon";

const MASCOT_HAPPY = "https://cdn.poehali.dev/projects/25d547e9-32e8-4987-8f1a-a0b8997cbc86/bucket/3ba9a3c5-c9c9-4a5a-a1ff-703556879fa7.png";

interface Achievement {
  id: number;
  icon: string;
  title: string;
  description: string;
  xp: number;
  unlocked: boolean;
  category: string;
  accent: string;
}

const ACHIEVEMENTS: Achievement[] = [
  { id: 1, icon: "✈️", title: "Первый полёт", description: "Пройди первую лекцию", xp: 50, unlocked: true, category: "Новеллы", accent: "#3b9eff" },
  { id: 2, icon: "📖", title: "Прилежный студент", description: "Пройди 3 лекции подряд", xp: 75, unlocked: true, category: "Новеллы", accent: "#1a6fd4" },
  { id: 3, icon: "🔥", title: "На огне", description: "5 дней обучения подряд", xp: 100, unlocked: true, category: "Серии", accent: "#ff7433" },
  { id: 4, icon: "🃏", title: "Знаток", description: "Изучи 5 карточек знаний", xp: 50, unlocked: true, category: "Карточки", accent: "#ff7eb3" },
  { id: 5, icon: "🌟", title: "Отличник", description: "Набери 300 XP", xp: 80, unlocked: true, category: "Прогресс", accent: "#f5a623" },
  { id: 6, icon: "🔬", title: "Аэродинамик", description: "Изучи все карточки раздела «Аэродинамика»", xp: 100, unlocked: true, category: "Карточки", accent: "#7c5cfc" },
  { id: 7, icon: "🏫", title: "Марафонец", description: "10 дней обучения подряд", xp: 150, unlocked: false, category: "Серии", accent: "#ff7433" },
  { id: 8, icon: "🏆", title: "Ас", description: "Пройди все 24 лекции", xp: 500, unlocked: false, category: "Новеллы", accent: "#f5a623" },
  { id: 9, icon: "🛫", title: "Штурман", description: "Изучи все карточки знаний", xp: 200, unlocked: false, category: "Карточки", accent: "#3b9eff" },
  { id: 10, icon: "💯", title: "Перфекционист", description: "Набери 1000 XP", xp: 300, unlocked: false, category: "Прогресс", accent: "#00b87a" },
  { id: 11, icon: "⚡", title: "Скоростной курсант", description: "Пройди лекцию менее чем за 5 минут", xp: 75, unlocked: false, category: "Скорость", accent: "#7c5cfc" },
  { id: 12, icon: "🌙", title: "Ночная смена", description: "Занимайся поздно вечером", xp: 50, unlocked: false, category: "Особые", accent: "#1a3560" },
];

const CATEGORIES_ICONS: Record<string, string> = {
  "Новеллы": "📖",
  "Карточки": "🃏",
  "Серии": "🔥",
  "Прогресс": "📈",
  "Скорость": "⚡",
  "Особые": "⭐",
};

interface AchievementsProps {
  onNavigate: (page: string) => void;
}

export default function Achievements({ onNavigate }: AchievementsProps) {
  const unlocked = ACHIEVEMENTS.filter((a) => a.unlocked);
  const locked = ACHIEVEMENTS.filter((a) => !a.unlocked);
  const totalXp = unlocked.reduce((acc, a) => acc + a.xp, 0);

  return (
    <div className="min-h-screen relative overflow-hidden" style={{ background: "linear-gradient(160deg, #fff8e0 0%, #fdf0f8 50%, #e8f4ff 100%)" }}>
      {/* Облака */}
      {[{ x: 3, y: 5, w: 160 }, { x: 68, y: 3, w: 200 }].map((c, i) => (
        <div
          key={i}
          className="absolute cloud-float pointer-events-none opacity-60"
          style={{
            left: `${c.x}%`, top: `${c.y}%`,
            width: c.w, height: Math.round(c.w * 0.4),
            background: "radial-gradient(ellipse at 40% 40%, rgba(255,255,255,0.9) 30%, transparent 80%)",
            borderRadius: "50%",
            animationDelay: `${i * 2}s`,
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
          onClick={() => onNavigate("profile")}
          className="flex items-center gap-2 px-3 py-2 rounded-xl sky-card text-sky text-sm btn-sky font-oswald font-semibold"
        >
          👤 Профиль
        </button>
      </header>

      <div className="relative z-10 px-4 pb-8">
        <div className="max-w-2xl mx-auto">

          {/* Баннер с маскотом */}
          <div className="sky-card rounded-3xl p-5 mb-5 overflow-hidden relative border border-yellow-200">
            <div className="absolute top-0 right-0 w-40 h-40 rounded-bl-full opacity-10" style={{ background: "#f5a623" }} />
            <div className="flex items-center gap-4">
              <img
                src={MASCOT_HAPPY}
                alt="Маскот"
                className="w-20 object-contain flex-shrink-0"
                style={{ filter: "drop-shadow(0 4px 8px rgba(245,166,35,0.2))" }}
              />
              <div>
                <h1 className="font-oswald text-2xl font-bold text-navy mb-1">Достижения</h1>
                <p className="text-muted-foreground text-sm font-golos">
                  Разблокировано <strong className="text-navy">{unlocked.length}</strong> из <strong className="text-navy">{ACHIEVEMENTS.length}</strong>
                </p>
                <div className="mt-2 flex items-center gap-2">
                  <span className="text-xl font-oswald font-bold text-gold">{totalXp} XP</span>
                  <span className="text-xs text-muted-foreground font-golos">заработано за достижения</span>
                </div>
              </div>
            </div>

            {/* Прогресс */}
            <div className="mt-3">
              <div className="w-full rounded-full h-2.5" style={{ background: "#fff0cc" }}>
                <div
                  className="h-2.5 rounded-full transition-all duration-500"
                  style={{
                    width: `${(unlocked.length / ACHIEVEMENTS.length) * 100}%`,
                    background: "linear-gradient(90deg, #f5a623, #ff7eb3)",
                  }}
                />
              </div>
            </div>
          </div>

          {/* Разблокированные */}
          <h3 className="font-oswald text-lg font-bold text-navy mb-3 flex items-center gap-2">
            <span className="text-gold">🏅</span> Разблокированные
          </h3>
          <div className="grid sm:grid-cols-2 gap-3 mb-6">
            {unlocked.map((a) => (
              <div
                key={a.id}
                className="rounded-2xl p-4 flex items-center gap-3 border transition-all duration-200 hover:-translate-y-0.5"
                style={{
                  background: "rgba(255,255,255,0.85)",
                  borderColor: `${a.accent}33`,
                  boxShadow: `0 2px 12px ${a.accent}14`,
                }}
              >
                <div
                  className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl flex-shrink-0"
                  style={{ background: `${a.accent}18`, border: `1.5px solid ${a.accent}44` }}
                >
                  {a.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-oswald font-bold text-navy text-sm">{a.title}</div>
                  <div className="text-xs text-muted-foreground font-golos truncate">{a.description}</div>
                  <div className="text-xs font-golos mt-0.5" style={{ color: a.accent }}>
                    {CATEGORIES_ICONS[a.category]} {a.category}
                  </div>
                </div>
                <div
                  className="text-xs font-oswald font-bold px-2 py-1 rounded-full flex-shrink-0"
                  style={{ background: `${a.accent}18`, color: a.accent }}
                >
                  +{a.xp} XP
                </div>
              </div>
            ))}
          </div>

          {/* Заблокированные */}
          <h3 className="font-oswald text-lg font-bold text-navy mb-3 flex items-center gap-2">
            <span>🔒</span> Ещё предстоит разблокировать
          </h3>
          <div className="grid sm:grid-cols-2 gap-3">
            {locked.map((a) => (
              <div
                key={a.id}
                className="rounded-2xl p-4 flex items-center gap-3 border border-gray-200 opacity-60"
                style={{ background: "rgba(255,255,255,0.5)" }}
              >
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl flex-shrink-0 bg-gray-100 grayscale">
                  {a.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-oswald font-bold text-muted-foreground text-sm">{a.title}</div>
                  <div className="text-xs text-muted-foreground font-golos truncate">{a.description}</div>
                  <div className="text-xs font-golos text-muted-foreground mt-0.5">
                    {CATEGORIES_ICONS[a.category]} {a.category}
                  </div>
                </div>
                <div className="text-xs font-oswald font-medium text-muted-foreground px-2 py-1 rounded-full bg-gray-100 flex-shrink-0">
                  +{a.xp} XP
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}