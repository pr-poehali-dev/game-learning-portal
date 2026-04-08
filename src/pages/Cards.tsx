import { useState } from "react";
import Icon from "@/components/ui/icon";

interface Card {
  id: number;
  title: string;
  content: string;
  category: string;
  emoji: string;
  color: string;
  borderColor: string;
  difficulty: "легко" | "средне" | "сложно";
  xp: number;
  learned: boolean;
}

const INITIAL_CARDS: Card[] = [
  { id: 1, title: "Причинность", content: "Причинно-следственная связь — основа научного мышления. Каждое явление имеет причину, которую можно изучить и понять.", category: "Логика", emoji: "🔗", color: "from-purple-900/60 to-violet-900/60", borderColor: "border-purple-500/40", difficulty: "легко", xp: 15, learned: false },
  { id: 2, title: "Гипотеза", content: "Научная гипотеза — предположение, которое можно проверить экспериментом. Это отправная точка любого исследования.", category: "Наука", emoji: "🔬", color: "from-blue-900/60 to-cyan-900/60", borderColor: "border-cyan-500/40", difficulty: "легко", xp: 15, learned: false },
  { id: 3, title: "Критическое мышление", content: "Умение анализировать информацию, задавать правильные вопросы и не принимать ничего на веру без проверки.", category: "Логика", emoji: "🧠", color: "from-green-900/60 to-teal-900/60", borderColor: "border-green-500/40", difficulty: "средне", xp: 25, learned: false },
  { id: 4, title: "Индукция", content: "Логический метод, при котором общий вывод делается на основе частных наблюдений. От частного — к общему.", category: "Логика", emoji: "⬆️", color: "from-yellow-900/60 to-amber-900/60", borderColor: "border-yellow-500/40", difficulty: "средне", xp: 25, learned: false },
  { id: 5, title: "Дедукция", content: "Обратный индукции метод: от общего принципа приходим к частному выводу. Основа математики и философии.", category: "Логика", emoji: "⬇️", color: "from-orange-900/60 to-red-900/60", borderColor: "border-orange-500/40", difficulty: "средне", xp: 25, learned: false },
  { id: 6, title: "Когнитивные искажения", content: "Систематические ошибки мышления, которые влияют на наши суждения. Зная их, можно принимать лучшие решения.", category: "Психология", emoji: "🌀", color: "from-pink-900/60 to-rose-900/60", borderColor: "border-pink-500/40", difficulty: "сложно", xp: 40, learned: false },
  { id: 7, title: "Эффект Даннинга-Крюгера", content: "Люди с малым опытом склонны переоценивать свои знания, а эксперты — недооценивать. Осознание этого — первый шаг к мудрости.", category: "Психология", emoji: "📊", color: "from-indigo-900/60 to-purple-900/60", borderColor: "border-indigo-500/40", difficulty: "сложно", xp: 40, learned: false },
  { id: 8, title: "Бритва Оккама", content: "«Не умножай сущности без необходимости». Простое объяснение предпочтительнее сложного, если оба одинаково верны.", category: "Философия", emoji: "🪒", color: "from-slate-800/60 to-gray-900/60", borderColor: "border-slate-500/40", difficulty: "средне", xp: 25, learned: false },
  { id: 9, title: "Принцип Парето", content: "20% усилий дают 80% результата. Найди те 20% действий, которые приносят наибольший эффект в твоей области.", category: "Эффективность", emoji: "📈", color: "from-emerald-900/60 to-green-900/60", borderColor: "border-emerald-500/40", difficulty: "легко", xp: 15, learned: false },
  { id: 10, title: "Петля обратной связи", content: "Система, в которой результат действия влияет на само действие. Ключевой механизм обучения и самосовершенствования.", category: "Системы", emoji: "🔄", color: "from-teal-900/60 to-cyan-900/60", borderColor: "border-teal-500/40", difficulty: "средне", xp: 25, learned: false },
  { id: 11, title: "Ментальные модели", content: "Упрощённые представления о том, как работает мир. Чем больше ментальных моделей ты знаешь, тем лучше решаешь задачи.", category: "Мышление", emoji: "🗺️", color: "from-violet-900/60 to-fuchsia-900/60", borderColor: "border-violet-500/40", difficulty: "сложно", xp: 40, learned: false },
  { id: 12, title: "Первые принципы", content: "Метод мышления Илона Маска: разбить проблему на фундаментальные истины и выстроить решение с нуля, не опираясь на аналогии.", category: "Мышление", emoji: "🏗️", color: "from-blue-900/60 to-indigo-900/60", borderColor: "border-blue-500/40", difficulty: "сложно", xp: 40, learned: false },
];

const CATEGORIES = ["Все", "Логика", "Наука", "Психология", "Философия", "Эффективность", "Системы", "Мышление"];
const DIFFICULTIES = ["Все", "легко", "средне", "сложно"];

const DIFF_COLORS: Record<string, string> = {
  "легко": "text-neon-green border-green-500/40 bg-green-900/20",
  "средне": "text-neon-yellow border-yellow-500/40 bg-yellow-900/20",
  "сложно": "text-neon-pink border-pink-500/40 bg-pink-900/20",
};

interface CardsProps {
  onNavigate: (page: string) => void;
}

export default function Cards({ onNavigate }: CardsProps) {
  const [cards, setCards] = useState(INITIAL_CARDS);
  const [category, setCategory] = useState("Все");
  const [difficulty, setDifficulty] = useState("Все");
  const [flipped, setFlipped] = useState<number | null>(null);
  const [totalXp, setTotalXp] = useState(0);

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
        return { ...c, learned: !c.learned };
      })
    );
  };

  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-950 via-background to-blue-950" />
      <div className="absolute inset-0 stars-bg opacity-30" />

      {/* Шапка */}
      <header className="relative z-10 flex items-center justify-between px-4 py-4">
        <button
          onClick={() => onNavigate("home")}
          className="flex items-center gap-2 px-3 py-2 rounded-xl card-game border border-border/50 text-muted-foreground hover:text-white hover:border-neon-cyan/50 transition-all btn-game text-sm"
        >
          <Icon name="Home" size={16} />
          <span>Главная</span>
        </button>

        <div className="flex items-center gap-3">
          <div className="px-3 py-2 rounded-xl card-game border border-neon-cyan/30 text-sm font-golos">
            <span className="text-muted-foreground">Изучено: </span>
            <span className="text-neon-cyan font-bold">{learnedCount}/{cards.length}</span>
          </div>
          <div className="px-3 py-2 rounded-xl card-game border border-neon-yellow/30">
            <span className="text-neon-yellow font-oswald font-bold text-sm">+{totalXp} XP</span>
          </div>
        </div>
      </header>

      <div className="relative z-10 flex-1 px-4 pb-8">
        <div className="max-w-5xl mx-auto">
          {/* Заголовок */}
          <div className="mb-6 text-center">
            <h1 className="font-oswald text-4xl font-bold text-white text-glow-cyan mb-2">
              🃏 Карточки Знаний
            </h1>
            <p className="text-muted-foreground font-golos">
              Нажми на карточку, чтобы узнать подробности
            </p>
          </div>

          {/* Прогресс */}
          <div className="mb-6 card-game rounded-2xl p-4 border border-neon-cyan/20">
            <div className="flex items-center justify-between mb-2 text-sm font-golos">
              <span className="text-muted-foreground">Прогресс освоения</span>
              <span className="text-neon-cyan">{Math.round((learnedCount / cards.length) * 100)}%</span>
            </div>
            <div className="w-full bg-muted/50 rounded-full h-3">
              <div
                className="h-3 rounded-full transition-all duration-500"
                style={{
                  width: `${(learnedCount / cards.length) * 100}%`,
                  background: "linear-gradient(90deg, #00d4ff, #b44dff)",
                }}
              />
            </div>
          </div>

          {/* Фильтры категорий */}
          <div className="mb-3 flex gap-2 flex-wrap">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className={`px-3 py-1 rounded-full text-sm font-golos transition-all ${
                  category === cat
                    ? "bg-neon-cyan text-background font-bold"
                    : "card-game border border-border/50 text-muted-foreground hover:text-white"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Фильтры сложности */}
          <div className="mb-6 flex gap-2">
            {DIFFICULTIES.map((d) => (
              <button
                key={d}
                onClick={() => setDifficulty(d)}
                className={`px-3 py-1 rounded-full text-sm font-golos border transition-all ${
                  difficulty === d
                    ? "bg-neon-purple text-white border-neon-purple font-bold"
                    : `card-game border-border/50 text-muted-foreground hover:text-white ${d !== "Все" ? DIFF_COLORS[d] : ""}`
                }`}
              >
                {d === "легко" ? "🟢 " : d === "средне" ? "🟡 " : d === "сложно" ? "🔴 " : ""}{d}
              </button>
            ))}
          </div>

          {/* Сетка карточек */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtered.map((card) => (
              <div
                key={card.id}
                className={`relative card-game rounded-2xl border ${card.borderColor} overflow-hidden cursor-pointer transition-all duration-300 hover:-translate-y-1 ${
                  card.learned ? "opacity-70" : ""
                }`}
                onClick={() => setFlipped(flipped === card.id ? null : card.id)}
              >
                {/* Фон карточки */}
                <div className={`absolute inset-0 bg-gradient-to-br ${card.color}`} />

                {card.learned && (
                  <div className="absolute top-3 right-3 z-10 w-7 h-7 rounded-full bg-neon-green/20 border border-neon-green/50 flex items-center justify-center text-sm">
                    ✓
                  </div>
                )}

                <div className="relative p-5">
                  <div className="flex items-start justify-between mb-3">
                    <span className="text-4xl">{card.emoji}</span>
                    <span className={`text-xs px-2 py-1 rounded-full border font-golos ${DIFF_COLORS[card.difficulty]}`}>
                      {card.difficulty}
                    </span>
                  </div>

                  <div className="mb-1 text-xs text-muted-foreground font-golos">{card.category}</div>
                  <h3 className="font-oswald text-xl font-bold text-white mb-2">{card.title}</h3>

                  {flipped === card.id ? (
                    <div className="animate-fade-in">
                      <p className="text-muted-foreground text-sm font-golos leading-relaxed mb-4">
                        {card.content}
                      </p>
                      <button
                        onClick={(e) => { e.stopPropagation(); toggleLearned(card.id); }}
                        className={`w-full py-2 rounded-xl text-sm font-oswald font-bold transition-all btn-game ${
                          card.learned
                            ? "bg-muted text-muted-foreground"
                            : "bg-neon-cyan text-background glow-cyan"
                        }`}
                      >
                        {card.learned ? "✓ Изучено" : `✓ Отметить изученным (+${card.xp} XP)`}
                      </button>
                    </div>
                  ) : (
                    <div className="flex items-center gap-1 text-xs text-muted-foreground font-golos mt-2">
                      <Icon name="Eye" size={12} />
                      <span>Нажми для подробностей</span>
                    </div>
                  )}
                </div>
              </div>
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
