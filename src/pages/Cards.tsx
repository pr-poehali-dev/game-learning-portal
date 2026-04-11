import { useState } from "react";
import Icon from "@/components/ui/icon";
import CardDetail, { CardData } from "./CardDetail";
import { MASCOT } from "@/lib/mascot";

const MASCOT_POINTER = MASCOT.lean;

const INITIAL_CARDS: CardData[] = [
  { id: 1, title: "Подъёмная сила", content: "Возникает из-за разности давлений над и под крылом. Верхняя поверхность — выпуклая, воздух движется быстрее → давление ниже. Это и поднимает самолёт в воздух.", category: "Аэродинамика", emoji: "🛫", accent: "#3b9eff", bg: "#e8f4ff", difficulty: "легко", xp: 15, learned: false },
  { id: 2, title: "Лобовое сопротивление", content: "Сила, противодействующая движению самолёта. Чем обтекаемее форма фюзеляжа, тем меньше сопротивление и тем экономичнее полёт.", category: "Аэродинамика", emoji: "💨", accent: "#1a6fd4", bg: "#dceeff", difficulty: "легко", xp: 15, learned: false },
  { id: 3, title: "Тяга двигателя", content: "Реактивная или воздушно-винтовая сила, двигающая самолёт вперёд. Для полёта тяга должна превышать лобовое сопротивление.", category: "Двигатели", emoji: "🔥", accent: "#ff7433", bg: "#fff0e8", difficulty: "легко", xp: 15, learned: false, specs: [{ label: "Тип", value: "Реактивный / Турбовинтовой" }, { label: "Принцип", value: "Реакция отброшенной массы" }, { label: "Измеряется в", value: "кН (килоньютонах)" }] },
  { id: 4, title: "Элероны", content: "Подвижные части крыла, управляющие креном — наклоном самолёта по продольной оси. Один элерон идёт вверх, второй вниз — самолёт кренится.", category: "Управление", emoji: "🎮", accent: "#7c5cfc", bg: "#f0ecff", difficulty: "средне", xp: 25, learned: false },
  { id: 5, title: "Руль высоты", content: "Расположен на горизонтальном хвостовом стабилизаторе. Управляет тангажем: поднимает или опускает нос самолёта.", category: "Управление", emoji: "↕️", accent: "#ff7eb3", bg: "#fff0f7", difficulty: "средне", xp: 25, learned: false },
  { id: 6, title: "Руль направления", content: "Вертикальная поверхность на хвосте. Управляет рысканием — поворотами носа влево и вправо в горизонтальной плоскости.", category: "Управление", emoji: "↔️", accent: "#00b87a", bg: "#e8fff5", difficulty: "средне", xp: 25, learned: false },
  { id: 7, title: "Флаттер", content: "Опасные аэроупругие колебания конструкции при превышении критической скорости. Именно поэтому самолёты проектируются с запасом жёсткости.", category: "Безопасность", emoji: "⚠️", accent: "#f5a623", bg: "#fff8e8", difficulty: "сложно", xp: 40, learned: false },
  { id: 8, title: "Сваливание", content: "Резкая потеря подъёмной силы при превышении критического угла атаки. Лётчик должен немедленно отдать штурвал от себя для восстановления управляемости.", category: "Безопасность", emoji: "📉", accent: "#e84a5f", bg: "#ffe8ec", difficulty: "сложно", xp: 40, learned: false },
  { id: 9, title: "Угол атаки", content: "Угол между хордой крыла и направлением набегающего потока воздуха. Оптимальный угол атаки обеспечивает максимальное аэродинамическое качество.", category: "Аэродинамика", emoji: "📐", accent: "#3b9eff", bg: "#e8f4ff", difficulty: "средне", xp: 25, learned: false },
  { id: 10, title: "Скороподъёмность", content: "Вертикальная скорость набора высоты в метрах в секунду. Зависит от избытка тяги над сопротивлением и угла набора.", category: "Лётные характеристики", emoji: "📈", accent: "#00b87a", bg: "#e8fff5", difficulty: "средне", xp: 25, learned: false },
  { id: 11, title: "Крейсерская скорость", content: "Оптимальная скорость горизонтального полёта, при которой достигается баланс между расходом топлива и дальностью полёта.", category: "Лётные характеристики", emoji: "✈️", accent: "#1a6fd4", bg: "#dceeff", difficulty: "легко", xp: 15, learned: false },
  { id: 12, title: "Воздушное судно (ВС)", content: "Летательный аппарат тяжелее воздуха с двигателем и крыльями, создающими подъёмную силу при движении. Подразделяются на самолёты, вертолёты и другие типы.", category: "Основы", emoji: "🛩️", accent: "#7c5cfc", bg: "#f0ecff", difficulty: "легко", xp: 15, learned: false },
];

const CATEGORIES = ["Все", "Аэродинамика", "Двигатели", "Управление", "Безопасность", "Лётные характеристики", "Основы"];

const DIFF_STYLE: Record<string, { label: string; color: string; bg: string }> = {
  "легко":  { label: "🟢 Легко",  color: "#00b87a", bg: "#e8fff5" },
  "средне": { label: "🟡 Средне", color: "#f5a623", bg: "#fff8e8" },
  "сложно": { label: "🔴 Сложно", color: "#e84a5f", bg: "#ffe8ec" },
};

interface CardsProps {
  onNavigate: (page: string) => void;
}

export default function Cards({ onNavigate }: CardsProps) {
  const [cards, setCards] = useState(INITIAL_CARDS);
  const [category, setCategory] = useState("Все");
  const [difficulty, setDifficulty] = useState("Все");
  const [totalXp, setTotalXp] = useState(0);
  const [openCard, setOpenCard] = useState<CardData | null>(null);

  const filtered = cards.filter((c) => {
    const catOk = category === "Все" || c.category === category;
    const diffOk = difficulty === "Все" || c.difficulty === difficulty;
    return catOk && diffOk;
  });

  const learnedCount = cards.filter((c) => c.learned).length;

  const toggleLearned = (id: number) => {
    setCards((prev) =>
      prev.map((c) => {
        if (c.id !== id) return c;
        if (!c.learned) setTotalXp((x) => x + c.xp);
        else setTotalXp((x) => x - c.xp);
        const updated = { ...c, learned: !c.learned };
        if (openCard?.id === id) setOpenCard(updated);
        return updated;
      })
    );
  };

  // Детальная страница карточки
  if (openCard) {
    const liveCard = cards.find((c) => c.id === openCard.id) ?? openCard;
    return (
      <CardDetail
        card={liveCard}
        onBack={() => setOpenCard(null)}
        onToggleLearned={toggleLearned}
      />
    );
  }

  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden" style={{ background: "linear-gradient(160deg, #e0f0ff 0%, #fdf0f8 60%, #e8f4ff 100%)" }}>
      {/* Облака */}
      {[{ x: 3, y: 4, w: 160 }, { x: 65, y: 2, w: 200 }].map((c, i) => (
        <div
          key={i}
          className="absolute cloud-float pointer-events-none opacity-60"
          style={{
            left: `${c.x}%`, top: `${c.y}%`,
            width: c.w, height: Math.round(c.w * 0.4),
            background: "radial-gradient(ellipse at 40% 40%, rgba(255,255,255,0.9) 30%, transparent 80%)",
            borderRadius: "50%",
            animationDelay: `${i * 3}s`,
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
          <span>Главная</span>
        </button>
        <div className="flex items-center gap-2">
          <div className="px-3 py-2 rounded-xl sky-card text-sm font-golos border border-sky-100">
            <span className="text-muted-foreground">Изучено: </span>
            <span className="font-bold text-sky">{learnedCount}/{cards.length}</span>
          </div>
          {totalXp > 0 && (
            <div className="px-3 py-2 rounded-xl sky-card text-sm font-oswald font-bold text-gold border border-yellow-200">
              +{totalXp} XP
            </div>
          )}
        </div>
      </header>

      <div className="relative z-10 flex-1 px-4 pb-8">
        <div className="max-w-5xl mx-auto">

          {/* Заголовок с маскотом */}
          <div className="flex items-end gap-4 mb-4">
            <img
              src={MASCOT_POINTER}
              alt="Инструктор"
              className="w-32 sm:w-40 object-contain flex-shrink-0"
              style={{ filter: "drop-shadow(0 4px 12px rgba(59,158,255,0.15))" }}
            />
            <div className="sky-card rounded-2xl rounded-bl-none px-5 py-3 mb-2 flex-1 border border-sky-100">
              <h1 className="font-oswald text-2xl sm:text-3xl font-bold text-navy mb-0.5">Карточки Знаний</h1>
              <p className="text-sm text-muted-foreground font-golos">Нажми на карточку, чтобы открыть полное описание</p>
            </div>
          </div>

          {/* Прогресс — компактный */}
          <div className="flex items-center gap-3 mb-4">
            <div className="flex-1 rounded-full h-2" style={{ background: "#e0eeff" }}>
              <div
                className="h-2 rounded-full transition-all duration-500"
                style={{ width: `${(learnedCount / cards.length) * 100}%`, background: "linear-gradient(90deg, #3b9eff, #ff7eb3)" }}
              />
            </div>
            <span className="text-xs text-muted-foreground font-golos whitespace-nowrap">
              {learnedCount} / {cards.length} изучено
            </span>
          </div>

          {/* Фильтры */}
          <div className="mb-2 flex gap-2 flex-wrap">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className="px-3 py-1 rounded-full text-sm font-golos transition-all border"
                style={
                  category === cat
                    ? { background: "#3b9eff", color: "white", borderColor: "#3b9eff", fontWeight: 600 }
                    : { background: "rgba(255,255,255,0.7)", color: "#555", borderColor: "#d0e4ff" }
                }
              >
                {cat}
              </button>
            ))}
          </div>
          <div className="mb-5 flex gap-2 flex-wrap">
            {["Все", "легко", "средне", "сложно"].map((d) => (
              <button
                key={d}
                onClick={() => setDifficulty(d)}
                className="px-3 py-1 rounded-full text-sm font-golos transition-all border"
                style={
                  difficulty === d
                    ? { background: "#ff7eb3", color: "white", borderColor: "#ff7eb3", fontWeight: 600 }
                    : { background: "rgba(255,255,255,0.7)", color: "#777", borderColor: "#ffd0e8" }
                }
              >
                {d === "легко" ? "🟢 Легко" : d === "средне" ? "🟡 Средне" : d === "сложно" ? "🔴 Сложно" : "Все уровни"}
              </button>
            ))}
          </div>

          {/* Сетка карточек */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtered.map((card) => (
              <button
                key={card.id}
                onClick={() => setOpenCard(card)}
                className="relative rounded-2xl text-left cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:shadow-lg overflow-hidden group"
                style={{
                  background: card.learned ? `${card.bg}cc` : card.bg,
                  border: `1.5px solid ${card.accent}33`,
                  boxShadow: `0 2px 12px ${card.accent}14`,
                }}
              >
                {/* Акцентная полоска */}
                <div className="h-1" style={{ background: card.accent }} />

                {card.learned && (
                  <div
                    className="absolute top-3 right-3 w-6 h-6 rounded-full flex items-center justify-center text-white text-xs font-bold z-10"
                    style={{ background: "#00b87a" }}
                  >
                    ✓
                  </div>
                )}

                <div className="p-4">
                  <div className="flex items-start justify-between mb-2">
                    <span className="text-3xl">{card.emoji}</span>
                    <span
                      className="text-xs px-2 py-0.5 rounded-full font-golos"
                      style={{ background: DIFF_STYLE[card.difficulty].bg, color: DIFF_STYLE[card.difficulty].color }}
                    >
                      {DIFF_STYLE[card.difficulty].label}
                    </span>
                  </div>

                  <div className="text-xs font-golos mb-0.5" style={{ color: card.accent }}>{card.category}</div>
                  <h3 className="font-oswald text-lg font-bold text-navy mb-2">{card.title}</h3>

                  {/* Краткий анонс */}
                  <p className="text-xs font-golos text-muted-foreground line-clamp-2 leading-relaxed mb-3">
                    {card.content}
                  </p>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1 text-xs font-golos" style={{ color: card.accent }}>
                      <Icon name="ArrowRight" size={12} />
                      <span>Подробнее</span>
                    </div>
                    <span className="text-xs font-oswald font-bold" style={{ color: card.accent }}>+{card.xp} XP</span>
                  </div>
                </div>
              </button>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-16 text-muted-foreground font-golos">
              <div className="text-5xl mb-4">🔍</div>
              <p>Карточки не найдены. Измени фильтры.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}