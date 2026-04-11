import { useState } from "react";
import Icon from "@/components/ui/icon";

const MASCOT_INTRO = "https://cdn.poehali.dev/projects/25d547e9-32e8-4987-8f1a-a0b8997cbc86/bucket/64fdfe87-a4fa-42ad-8df4-22b93c78eca9.png";

const CHAPTERS = [
  {
    id: 1,
    title: "Системы противодействия нашим изделиям",
    description: "404 страны — разбираем угрозы в воздухе",
    accent: "#3b9eff",
    bg: "linear-gradient(160deg, #1a2a1a 0%, #2a3a2a 100%)",
    slides: 3,
    minutes: 5,
    startSlide: 0,
    image: "https://cdn.poehali.dev/projects/25d547e9-32e8-4987-8f1a-a0b8997cbc86/bucket/8566a64f-252d-45b5-83a8-7693bbaf7a57.jpg",
  },
  {
    id: 2,
    title: "ВВС в контексте противодействия нашим изделиям",
    description: "Авиация как инструмент противодействия",
    accent: "#7c5cfc",
    bg: "linear-gradient(160deg, #1a1a2a 0%, #2a2a3a 100%)",
    slides: 2,
    minutes: 4,
    startSlide: 3,
    image: "https://cdn.poehali.dev/projects/25d547e9-32e8-4987-8f1a-a0b8997cbc86/bucket/57c08411-431f-4e7c-bed2-7631a487eadf.jpg",
  },
  {
    id: 3,
    title: "Зенитно-ракетные комплексы",
    description: "Системы ПВО: IRIS-T и другие ЗРК",
    accent: "#e84a5f",
    bg: "linear-gradient(160deg, #2a1a1a 0%, #3a2a2a 100%)",
    slides: 3,
    minutes: 6,
    startSlide: 5,
    image: "https://cdn.poehali.dev/projects/25d547e9-32e8-4987-8f1a-a0b8997cbc86/bucket/772b0e1c-2463-4689-a2b9-9974a47e6df2.png",
  },
];

interface NovelIntroProps {
  onNavigate: (page: string) => void;
  onStartChapter: (slideIndex: number) => void;
}

type Step = "intro" | "chapters";

export default function NovelIntro({ onNavigate, onStartChapter }: NovelIntroProps) {
  const [step, setStep] = useState<Step>("intro");

  if (step === "intro") {
    return (
      <div className="min-h-screen flex flex-col bg-[#0d1a0d]">
        <header className="flex items-center px-4 pt-4 pb-2 gap-3 z-10">
          <button
            onClick={() => onNavigate("home")}
            className="p-2 rounded-xl hover:bg-white/10 transition-colors"
          >
            <Icon name="ArrowLeft" size={20} className="text-white/80" />
          </button>
          <span className="font-oswald font-bold text-white/90 text-lg">Визуальная Новелла</span>
        </header>

        <div className="flex-1 flex flex-col animate-fade-in">
          {/* Маскот на весь экран */}
          <div className="flex-1 relative flex items-end justify-center overflow-hidden">
            <div
              className="absolute inset-0"
              style={{ background: "radial-gradient(ellipse at center bottom, #1a3a1a 0%, #0d1a0d 70%)" }}
            />
            <img
              src={MASCOT_INTRO}
              alt="Инструктор"
              className="relative w-full max-w-sm object-contain object-bottom animate-float"
              style={{ filter: "drop-shadow(0 0 40px rgba(59,158,255,0.15))", maxHeight: "60vh" }}
            />
          </div>

          {/* Текст и кнопка снизу */}
          <div className="px-5 pb-6 pt-4" style={{ background: "linear-gradient(0deg, #0d1a0d 80%, transparent)" }}>
            <h1 className="font-oswald text-2xl font-bold text-white mb-2 text-center">
              Привет, курсант!
            </h1>
            <p className="font-golos text-sm text-white/60 leading-relaxed mb-5 text-center">
              Я твой инструктор. Здесь ты изучишь системы противодействия, ЗРК и тактику ВВС — шаг за шагом, с тестом после каждой главы.
            </p>
            <button
              onClick={() => setStep("chapters")}
              className="w-full py-4 rounded-2xl text-white font-oswald font-bold text-lg shadow-lg flex items-center justify-center gap-2"
              style={{ background: "linear-gradient(135deg, #3b9eff, #1a6fd4)" }}
            >
              Выбрать главу
              <Icon name="ChevronRight" size={20} />
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#0d1a0d]">
      <header className="flex items-center px-4 pt-4 pb-2 gap-3">
        <button
          onClick={() => setStep("intro")}
          className="p-2 rounded-xl hover:bg-white/10 transition-colors"
        >
          <Icon name="ArrowLeft" size={20} className="text-white/80" />
        </button>
        <span className="font-oswald font-bold text-white/90 text-lg">Выбери главу</span>
      </header>

      <div className="flex-1 flex flex-col px-4 pb-8 pt-2 gap-4 animate-fade-in overflow-y-auto">
        {CHAPTERS.map((ch, idx) => (
          <button
            key={ch.id}
            onClick={() => onStartChapter(ch.startSlide)}
            className="w-full rounded-3xl overflow-hidden text-left shadow-xl hover:scale-[1.01] transition-all active:scale-[0.99] flex-shrink-0"
            style={{ border: `1.5px solid ${ch.accent}44` }}
          >
            {/* Превью-изображение */}
            <div className="relative h-44 overflow-hidden">
              <img
                src={ch.image}
                alt={ch.title}
                className="w-full h-full object-cover object-top"
              />
              <div
                className="absolute inset-0"
                style={{ background: "linear-gradient(0deg, rgba(0,0,0,0.7) 0%, transparent 60%)" }}
              />
              <span
                className="absolute top-3 left-3 text-xs font-oswald font-bold px-3 py-1 rounded-full text-white"
                style={{ background: ch.accent }}
              >
                Глава {idx + 1}
              </span>
            </div>

            {/* Инфо */}
            <div
              className="px-4 py-3 flex items-center gap-3"
              style={{ background: "rgba(255,255,255,0.05)", backdropFilter: "blur(8px)" }}
            >
              <div className="flex-1 min-w-0">
                <div className="font-oswald font-bold text-white text-sm leading-tight line-clamp-2">{ch.title}</div>
                <div className="flex items-center gap-3 mt-1">
                  <span className="font-golos text-xs text-white/50 flex items-center gap-1">
                    <Icon name="FileText" size={10} />
                    {ch.slides} слайда
                  </span>
                  <span className="font-golos text-xs text-white/50 flex items-center gap-1">
                    <Icon name="Clock" size={10} />
                    ~{ch.minutes} мин
                  </span>
                </div>
              </div>
              <div
                className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ background: ch.accent }}
              >
                <Icon name="Play" size={16} className="text-white" />
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
