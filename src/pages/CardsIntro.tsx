import { useState } from "react";
import Icon from "@/components/ui/icon";

const MASCOT_POINTER = "https://cdn.poehali.dev/projects/25d547e9-32e8-4987-8f1a-a0b8997cbc86/bucket/4b016d30-ad5f-4376-94f4-a33fd4f4c464.png";
const MASCOT_HAPPY = "https://cdn.poehali.dev/projects/25d547e9-32e8-4987-8f1a-a0b8997cbc86/bucket/33ee4302-33d0-4b32-a387-61140be18e8b.png";

interface CardsIntroProps {
  onNavigate: (page: string) => void;
  onStart: () => void;
}

export default function CardsIntro({ onNavigate, onStart }: CardsIntroProps) {
  const [mascot, setMascot] = useState(MASCOT_POINTER);

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{ background: "linear-gradient(160deg, #ffe0f0 0%, #fff4f9 60%, #fff8fc 100%)" }}
    >
      <header className="flex items-center px-4 pt-4 pb-2 gap-3">
        <button
          onClick={() => onNavigate("home")}
          className="p-2 rounded-xl hover:bg-white/40 transition-colors"
        >
          <Icon name="ArrowLeft" size={20} className="text-navy" />
        </button>
        <span className="font-oswald font-bold text-navy text-lg">Карточки Знаний</span>
      </header>

      <div className="flex-1 flex flex-col items-center justify-center px-6 pb-8 animate-fade-in">
        <img
          src={mascot}
          alt="Инструктор"
          className="w-64 sm:w-72 object-contain animate-float mb-6"
          style={{ filter: "drop-shadow(0 8px 24px rgba(255,126,179,0.2))" }}
        />

        <div
          className="w-full max-w-sm rounded-3xl p-6 text-center shadow-xl mb-6"
          style={{ background: "rgba(255,255,255,0.9)", backdropFilter: "blur(12px)", border: "1.5px solid rgba(255,126,179,0.2)" }}
        >
          <h1 className="font-oswald text-2xl font-bold text-navy mb-3">
            Карточки Знаний 🃏
          </h1>
          <p className="font-golos text-sm text-muted-foreground leading-relaxed mb-4">
            Это мой любимый способ запоминания! <strong className="text-navy">Карточки знаний</strong> — краткие и ёмкие определения по всем темам авиации.
          </p>
          <div className="flex flex-col gap-2 text-left">
            {[
              { icon: "Layers", text: "12 карточек по 6 темам" },
              { icon: "Star", text: "Отмечай изученные карточки" },
              { icon: "Zap", text: "Зарабатывай XP за каждую карточку" },
            ].map((item) => (
              <div key={item.text} className="flex items-center gap-3 rounded-xl px-3 py-2" style={{ background: "#fff0f7" }}>
                <Icon name={item.icon as "Layers"} size={16} style={{ color: "#ff7eb3" }} className="flex-shrink-0" />
                <span className="font-golos text-sm text-navy">{item.text}</span>
              </div>
            ))}
          </div>
        </div>

        <button
          onClick={() => { setMascot(MASCOT_HAPPY); setTimeout(onStart, 200); }}
          className="w-full max-w-sm py-4 rounded-2xl text-white font-oswald font-bold text-lg shadow-lg flex items-center justify-center gap-2"
          style={{ background: "linear-gradient(135deg, #ff7eb3, #e85599)" }}
        >
          Открыть карточки
          <Icon name="ChevronRight" size={20} />
        </button>
      </div>
    </div>
  );
}
