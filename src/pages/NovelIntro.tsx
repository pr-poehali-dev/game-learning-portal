import { useState } from "react";
import Icon from "@/components/ui/icon";

const MASCOT_POINTER = "https://cdn.poehali.dev/projects/25d547e9-32e8-4987-8f1a-a0b8997cbc86/bucket/4b016d30-ad5f-4376-94f4-a33fd4f4c464.png";
const MASCOT_HAPPY = "https://cdn.poehali.dev/projects/25d547e9-32e8-4987-8f1a-a0b8997cbc86/bucket/33ee4302-33d0-4b32-a387-61140be18e8b.png";

const CHAPTERS = [
  {
    id: 1,
    title: "Аэродинамика крыла",
    description: "Почему самолёт летит? Разбираем подъёмную силу",
    emoji: "✈️",
    accent: "#3b9eff",
    bg: "linear-gradient(135deg, #e8f4ff, #c8e8ff)",
    slides: 3,
    minutes: 5,
    startSlide: 0,
  },
  {
    id: 2,
    title: "Четыре силы полёта",
    description: "Тяга, сопротивление, вес и подъёмная сила в балансе",
    emoji: "⚖️",
    accent: "#7c5cfc",
    bg: "linear-gradient(135deg, #f0ecff, #e8e0ff)",
    slides: 2,
    minutes: 4,
    startSlide: 3,
  },
  {
    id: 3,
    title: "Управление самолётом",
    description: "Элероны, рули и как пилот управляет машиной",
    emoji: "🎮",
    accent: "#ff7eb3",
    bg: "linear-gradient(135deg, #fff0f7, #ffe8f0)",
    slides: 3,
    minutes: 6,
    startSlide: 5,
  },
];

interface NovelIntroProps {
  onNavigate: (page: string) => void;
  onStartChapter: (slideIndex: number) => void;
}

type Step = "intro" | "chapters";

export default function NovelIntro({ onNavigate, onStartChapter }: NovelIntroProps) {
  const [step, setStep] = useState<Step>("intro");
  const [mascot, setMascot] = useState(MASCOT_POINTER);

  if (step === "intro") {
    return (
      <div
        className="min-h-screen flex flex-col"
        style={{ background: "linear-gradient(160deg, #c8e8ff 0%, #e8f6ff 60%, #f0f9ff 100%)" }}
      >
        <header className="flex items-center px-4 pt-4 pb-2 gap-3">
          <button
            onClick={() => onNavigate("home")}
            className="p-2 rounded-xl hover:bg-white/40 transition-colors"
          >
            <Icon name="ArrowLeft" size={20} className="text-navy" />
          </button>
          <span className="font-oswald font-bold text-navy text-lg">Визуальная Новелла</span>
        </header>

        <div className="flex-1 flex flex-col items-center justify-center px-6 pb-8 animate-fade-in">
          <img
            src={mascot}
            alt="Инструктор"
            className="w-64 sm:w-72 object-contain animate-float mb-6"
            style={{ filter: "drop-shadow(0 8px 24px rgba(59,158,255,0.2))" }}
          />

          <div
            className="w-full max-w-sm rounded-3xl p-6 text-center shadow-xl mb-6"
            style={{ background: "rgba(255,255,255,0.85)", backdropFilter: "blur(12px)", border: "1.5px solid rgba(59,158,255,0.15)" }}
          >
            <h1 className="font-oswald text-2xl font-bold text-navy mb-3">
              Привет, курсант! 👋
            </h1>
            <p className="font-golos text-sm text-muted-foreground leading-relaxed mb-4">
              Я твой личный инструктор. <strong className="text-navy">Визуальная новелла</strong> — это интерактивный курс, где я буду объяснять тебе основы авиации шаг за шагом.
            </p>
            <div className="flex flex-col gap-2 text-left">
              {[
                { icon: "BookOpen", text: "Читай слайды с объяснениями" },
                { icon: "Brain", text: "Проходи тест в конце каждой главы" },
                { icon: "Trophy", text: "Зарабатывай XP и открывай достижения" },
              ].map((item) => (
                <div key={item.text} className="flex items-center gap-3 bg-sky-50 rounded-xl px-3 py-2">
                  <Icon name={item.icon as "BookOpen"} size={16} className="text-sky-500 flex-shrink-0" />
                  <span className="font-golos text-sm text-navy">{item.text}</span>
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={() => { setMascot(MASCOT_HAPPY); setStep("chapters"); }}
            className="w-full max-w-sm py-4 rounded-2xl text-white font-oswald font-bold text-lg shadow-lg flex items-center justify-center gap-2"
            style={{ background: "linear-gradient(135deg, #3b9eff, #1a6fd4)" }}
          >
            Выбрать главу
            <Icon name="ChevronRight" size={20} />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{ background: "linear-gradient(160deg, #c8e8ff 0%, #e8f6ff 60%, #f0f9ff 100%)" }}
    >
      <header className="flex items-center px-4 pt-4 pb-2 gap-3">
        <button
          onClick={() => setStep("intro")}
          className="p-2 rounded-xl hover:bg-white/40 transition-colors"
        >
          <Icon name="ArrowLeft" size={20} className="text-navy" />
        </button>
        <span className="font-oswald font-bold text-navy text-lg">Выбери главу</span>
      </header>

      <div className="flex-1 flex flex-col px-4 pb-8 pt-2 animate-fade-in">
        <div className="flex items-end gap-4 mb-5">
          <img
            src={MASCOT_HAPPY}
            alt="Инструктор"
            className="w-28 object-contain animate-float flex-shrink-0"
            style={{ filter: "drop-shadow(0 4px 16px rgba(59,158,255,0.15))" }}
          />
          <div
            className="rounded-2xl rounded-bl-none px-4 py-3 text-sm font-golos text-navy shadow"
            style={{ background: "rgba(255,255,255,0.9)", border: "1.5px solid rgba(59,158,255,0.15)" }}
          >
            Выбери главу, с которой хочешь начать. Рекомендую по порядку! 😊
          </div>
        </div>

        <div className="flex flex-col gap-3">
          {CHAPTERS.map((ch, idx) => (
            <button
              key={ch.id}
              onClick={() => onStartChapter(ch.startSlide)}
              className="w-full rounded-3xl p-4 text-left shadow-md hover:scale-[1.01] transition-all active:scale-[0.99]"
              style={{ background: "rgba(255,255,255,0.9)", border: `2px solid ${ch.accent}22` }}
            >
              <div className="flex items-center gap-4">
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl flex-shrink-0"
                  style={{ background: ch.bg }}
                >
                  {ch.emoji}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <span
                      className="text-xs font-oswald font-bold px-2 py-0.5 rounded-full text-white"
                      style={{ background: ch.accent }}
                    >
                      Глава {idx + 1}
                    </span>
                  </div>
                  <div className="font-oswald font-bold text-navy text-base leading-tight">{ch.title}</div>
                  <div className="font-golos text-xs text-muted-foreground mt-0.5 line-clamp-1">{ch.description}</div>
                </div>
                <div className="flex flex-col items-end gap-1 flex-shrink-0">
                  <div className="flex items-center gap-1 text-xs text-muted-foreground font-golos">
                    <Icon name="FileText" size={12} />
                    <span>{ch.slides} слайда</span>
                  </div>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground font-golos">
                    <Icon name="Clock" size={12} />
                    <span>~{ch.minutes} мин</span>
                  </div>
                  <Icon name="ChevronRight" size={16} style={{ color: ch.accent }} />
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
