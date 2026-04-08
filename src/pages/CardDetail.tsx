import Icon from "@/components/ui/icon";

export interface CardData {
  id: number;
  title: string;
  content: string;
  category: string;
  emoji: string;
  accent: string;
  bg: string;
  difficulty: "легко" | "средне" | "сложно";
  xp: number;
  learned: boolean;
  image?: string;
  specs?: { label: string; value: string }[];
}

const DIFF_STYLE: Record<string, { label: string; color: string; bg: string }> = {
  "легко":  { label: "🟢 Легко",  color: "#00b87a", bg: "#e8fff5" },
  "средне": { label: "🟡 Средне", color: "#f5a623", bg: "#fff8e8" },
  "сложно": { label: "🔴 Сложно", color: "#e84a5f", bg: "#ffe8ec" },
};

interface CardDetailProps {
  card: CardData;
  onBack: () => void;
  onToggleLearned: (id: number) => void;
}

export default function CardDetail({ card, onBack, onToggleLearned }: CardDetailProps) {
  const diff = DIFF_STYLE[card.difficulty];

  return (
    <div
      className="min-h-screen flex flex-col relative overflow-hidden"
      style={{ background: `linear-gradient(160deg, ${card.bg} 0%, #fdf4fc 60%, #e8f4ff 100%)` }}
    >
      {/* Облака */}
      {[{ x: 2, y: 3, w: 160 }, { x: 65, y: 2, w: 200 }, { x: 30, y: 78, w: 120 }].map((c, i) => (
        <div
          key={i}
          className="absolute cloud-float pointer-events-none opacity-50"
          style={{
            left: `${c.x}%`, top: `${c.y}%`,
            width: c.w, height: Math.round(c.w * 0.4),
            background: "radial-gradient(ellipse at 40% 40%, rgba(255,255,255,0.95) 30%, transparent 80%)",
            borderRadius: "50%",
            animationDelay: `${i * 2}s`,
          }}
        />
      ))}

      {/* Шапка */}
      <header className="relative z-10 flex items-center gap-3 px-4 py-3">
        <button
          onClick={onBack}
          className="flex items-center gap-2 px-3 py-2 rounded-xl sky-card text-navy text-sm btn-sky font-oswald font-semibold"
        >
          <Icon name="ChevronLeft" size={16} />
          Назад
        </button>
        <div className="flex-1" />
        <div
          className="text-xs px-3 py-1.5 rounded-full font-golos font-medium"
          style={{ background: diff.bg, color: diff.color }}
        >
          {diff.label}
        </div>
      </header>

      <div className="relative z-10 flex-1 px-4 pb-8">
        <div className="max-w-2xl mx-auto">

          {/* Заголовок */}
          <div className="mb-4">
            <div className="text-xs font-golos mb-1" style={{ color: card.accent }}>{card.category}</div>
            <h1 className="font-oswald text-4xl font-bold text-navy leading-tight">
              <span className="mr-3">{card.emoji}</span>
              {card.title}
            </h1>
          </div>

          {/* Изображение — место под фото/схему изделия */}
          <div
            className="rounded-3xl mb-5 overflow-hidden relative"
            style={{
              border: `2px solid ${card.accent}33`,
              background: card.image
                ? "transparent"
                : `linear-gradient(135deg, ${card.bg} 0%, rgba(255,255,255,0.6) 100%)`,
              minHeight: 220,
            }}
          >
            {card.image ? (
              <img
                src={card.image}
                alt={card.title}
                className="w-full object-cover"
                style={{ maxHeight: 340 }}
              />
            ) : (
              <div className="flex flex-col items-center justify-center h-full min-h-[220px] gap-3 text-center px-6">
                <div className="text-6xl opacity-30">{card.emoji}</div>
                <div className="text-sm text-muted-foreground font-golos opacity-60">
                  Здесь будет изображение или схема изделия
                </div>
                <div
                  className="text-xs px-3 py-1 rounded-full font-golos opacity-40"
                  style={{ background: `${card.accent}20`, color: card.accent }}
                >
                  📷 Изображение
                </div>
              </div>
            )}
          </div>

          {/* Описание */}
          {card.content && (
            <div className="sky-card rounded-2xl p-5 mb-4 border border-sky-100">
              <h2 className="font-oswald text-lg font-bold text-navy mb-2 flex items-center gap-2">
                <span style={{ color: card.accent }}>📋</span> Описание
              </h2>
              <p className="text-navy font-golos text-base leading-relaxed">{card.content}</p>
            </div>
          )}

          {/* Характеристики */}
          {card.specs && card.specs.length > 0 ? (
            <div className="sky-card rounded-2xl p-5 mb-5 border border-sky-100">
              <h2 className="font-oswald text-lg font-bold text-navy mb-3 flex items-center gap-2">
                <span style={{ color: card.accent }}>📊</span> Характеристики
              </h2>
              <div className="divide-y divide-sky-50">
                {card.specs.map((spec, i) => (
                  <div key={i} className="flex items-center justify-between py-2.5 gap-4">
                    <span className="text-muted-foreground font-golos text-sm">{spec.label}</span>
                    <span className="font-golos font-semibold text-navy text-sm text-right">{spec.value}</span>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            /* Заглушка для характеристик */
            <div
              className="rounded-2xl p-5 mb-5 border-2 border-dashed"
              style={{ borderColor: `${card.accent}33`, background: `${card.bg}88` }}
            >
              <h2 className="font-oswald text-lg font-bold text-navy mb-3 flex items-center gap-2 opacity-50">
                <span style={{ color: card.accent }}>📊</span> Характеристики
              </h2>
              <div className="space-y-2">
                {["Параметр 1", "Параметр 2", "Параметр 3"].map((_, i) => (
                  <div key={i} className="flex items-center justify-between py-2 opacity-30">
                    <div className="h-3 rounded-full bg-muted w-28" />
                    <div className="h-3 rounded-full bg-muted w-20" />
                  </div>
                ))}
              </div>
              <p className="text-xs text-muted-foreground font-golos mt-3 opacity-60 text-center">
                Характеристики будут добавлены
              </p>
            </div>
          )}

          {/* Кнопка «Изучено» */}
          <button
            onClick={() => onToggleLearned(card.id)}
            className="w-full py-4 rounded-2xl text-white font-oswald font-bold text-lg transition-all btn-sky shadow-lg"
            style={{
              background: card.learned
                ? "linear-gradient(135deg, #00b87a, #00d48a)"
                : `linear-gradient(135deg, ${card.accent}, ${card.accent}cc)`,
            }}
          >
            {card.learned ? "✓ Изучено — снять отметку" : `Отметить изученным (+${card.xp} XP)`}
          </button>
        </div>
      </div>
    </div>
  );
}
