import { useState } from "react";
import Icon from "@/components/ui/icon";

// 3 варианта маскота для разных настроений
const MASCOT = {
  pointer: "https://cdn.poehali.dev/projects/25d547e9-32e8-4987-8f1a-a0b8997cbc86/bucket/6448c8cb-b6a2-4c6d-b2aa-9b0c6bffdf55.jpg",
  happy:   "https://cdn.poehali.dev/projects/25d547e9-32e8-4987-8f1a-a0b8997cbc86/bucket/75363298-9087-4238-b6cc-472c8fcc3566.jpg",
  thumbs:  "https://cdn.poehali.dev/projects/25d547e9-32e8-4987-8f1a-a0b8997cbc86/bucket/34e54cf1-bf32-4789-a85e-5eedc2ca31a4.jpg",
};

interface Slide {
  id: number;
  text: string;
  mascotMood: keyof typeof MASCOT;
  scene: string;
  sceneGrad: string;
  accent: string;
  xp: number;
  label: string;
}

const SLIDES: Slide[] = [
  {
    id: 1,
    mascotMood: "pointer",
    label: "Введение",
    scene: "Учебный класс",
    sceneGrad: "linear-gradient(160deg, #c8e8ff 0%, #e0f4ff 100%)",
    accent: "#3b9eff",
    text: "Привет, курсант! Я ваш инструктор. Сегодня мы начинаем изучение авиации — одной из самых захватывающих областей техники. Пристегните ремни и внимайте!",
    xp: 10,
  },
  {
    id: 2,
    mascotMood: "pointer",
    label: "Аэродинамика",
    scene: "Лекционный зал",
    sceneGrad: "linear-gradient(160deg, #d0eeff 0%, #e8f7ff 100%)",
    accent: "#1a6fd4",
    text: "Самолёт летит благодаря подъёмной силе крыла. Верхняя поверхность крыла изогнута сильнее — воздух там движется быстрее, создавая зону пониженного давления. Это и поднимает самолёт!",
    xp: 20,
  },
  {
    id: 3,
    mascotMood: "thumbs",
    label: "Четыре силы",
    scene: "Ангар",
    sceneGrad: "linear-gradient(160deg, #e8f0ff 0%, #f5eeff 100%)",
    accent: "#7c5cfc",
    text: "На самолёт действуют четыре основные силы: подъёмная сила, сила тяжести, тяга двигателя и лобовое сопротивление. Лётчик управляет равновесием этих сил для безопасного полёта.",
    xp: 30,
  },
  {
    id: 4,
    mascotMood: "thumbs",
    label: "Органы управления",
    scene: "Кабина пилота",
    sceneGrad: "linear-gradient(160deg, #ffe8f0 0%, #fff0f7 100%)",
    accent: "#ff7eb3",
    text: "Пилот управляет самолётом с помощью: руля высоты (тангаж — нос вверх/вниз), элеронов (крен — наклон по крыльям) и руля направления (рыскание — повороты влево/вправо).",
    xp: 40,
  },
  {
    id: 5,
    mascotMood: "happy",
    label: "Завершение",
    scene: "Взлётная полоса",
    sceneGrad: "linear-gradient(160deg, #c8ffea 0%, #e8fff5 100%)",
    accent: "#00b87a",
    text: "Отличная работа, курсант! 🎉 Вы прошли первую лекцию по основам авиации. Заработано 100 XP и значок «Первый полёт»! Двигайтесь дальше — впереди ещё много интересного!",
    xp: 100,
  },
];

interface NovelProps {
  onNavigate: (page: string) => void;
}

export default function Novel({ onNavigate }: NovelProps) {
  const [current, setCurrent] = useState(0);
  const [seen, setSeen] = useState<Set<number>>(new Set([0]));
  const [transitioning, setTransitioning] = useState(false);

  const slide = SLIDES[current];
  const totalXp = Array.from(seen).reduce((acc, i) => acc + SLIDES[i].xp, 0);
  const progress = ((current + 1) / SLIDES.length) * 100;

  const goTo = (index: number) => {
    if (transitioning || index === current) return;
    setTransitioning(true);
    setTimeout(() => {
      setCurrent(index);
      setSeen((prev) => new Set([...prev, index]));
      setTransitioning(false);
    }, 200);
  };

  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden" style={{ background: slide.sceneGrad, transition: "background 0.6s ease" }}>

      {/* Облака фон */}
      {[{ x: 5, y: 5, w: 180 }, { x: 65, y: 3, w: 220 }, { x: 35, y: 80, w: 150 }].map((c, i) => (
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
          <span>Главная</span>
        </button>

        <div className="flex items-center gap-2 px-3 py-2 rounded-xl sky-card text-sm font-golos border border-yellow-200">
          <span className="text-gold">✨</span>
          <span className="font-bold text-gold font-oswald">+{totalXp} XP</span>
        </div>
      </header>

      {/* Прогресс */}
      <div className="relative z-10 px-4 mb-3">
        <div className="max-w-3xl mx-auto sky-card rounded-2xl p-3">
          <div className="flex items-center justify-between mb-2 text-xs font-golos text-muted-foreground">
            <div className="flex items-center gap-2">
              <span style={{ color: slide.accent }}>✈️</span>
              <span className="font-semibold text-navy">{slide.scene}</span>
            </div>
            <span>{current + 1} из {SLIDES.length}</span>
          </div>
          {/* Шаги */}
          <div className="flex gap-1.5">
            {SLIDES.map((s, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                className="flex-1 rounded-full transition-all duration-300 h-2"
                style={{
                  background: i === current
                    ? slide.accent
                    : seen.has(i)
                    ? `${slide.accent}55`
                    : "#e0eaff",
                  transform: i === current ? "scaleY(1.4)" : "scaleY(1)",
                }}
                title={s.label}
              />
            ))}
          </div>
          <div className="flex justify-between mt-1.5">
            {SLIDES.map((s, i) => (
              <span key={i} className="text-xs text-muted-foreground font-golos" style={{ flex: 1, textAlign: "center", fontSize: 10 }}>
                {i === current ? <strong style={{ color: slide.accent }}>{s.label}</strong> : s.label}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Сцена */}
      <main className="relative z-10 flex-1 flex flex-col items-center justify-center px-4 pb-4">
        <div className="max-w-3xl w-full">
          <div
            className={`transition-all duration-200 ${transitioning ? "opacity-0 scale-95" : "opacity-100 scale-100"}`}
          >
            {/* Карточка диалога */}
            <div className="sky-card rounded-3xl overflow-hidden shadow-xl">
              <div
                className="h-1.5 w-full"
                style={{ background: `linear-gradient(90deg, ${slide.accent}, #ff7eb3)`, width: `${progress}%`, transition: "width 0.5s ease" }}
              />

              <div className="flex flex-col sm:flex-row">
                {/* Маскот */}
                <div className="sm:w-52 flex-shrink-0 flex items-end justify-center pt-4 pb-0 sm:pb-4 px-4"
                  style={{ background: `linear-gradient(180deg, ${slide.sceneGrad.replace("linear-gradient(160deg, ", "").split(",")[0]?.trim() || "#e8f4ff"} 0%, transparent 100%)` }}
                >
                  <img
                    src={MASCOT[slide.mascotMood]}
                    alt="Инструктор"
                    className="w-44 sm:w-48 object-contain transition-all duration-500"
                    style={{
                      filter: "drop-shadow(0 4px 16px rgba(59,158,255,0.15))",
                      maxHeight: 230,
                    }}
                  />
                </div>

                {/* Текст */}
                <div className="flex-1 p-5 sm:p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <div
                      className="w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-oswald font-bold"
                      style={{ background: slide.accent }}
                    >
                      {current + 1}
                    </div>
                    <div>
                      <div className="font-oswald font-bold text-navy text-base">Инструктор</div>
                      <div className="text-xs text-muted-foreground font-golos">{slide.label}</div>
                    </div>
                    <div
                      className="ml-auto text-xs px-2.5 py-1 rounded-full text-white font-oswald font-semibold"
                      style={{ background: slide.accent }}
                    >
                      +{slide.xp} XP
                    </div>
                  </div>

                  {/* Диалоговый пузырь */}
                  <div
                    className="rounded-2xl rounded-tl-none p-4 mb-4"
                    style={{ background: `${slide.accent}12`, border: `1.5px solid ${slide.accent}30` }}
                  >
                    <p className="text-navy font-golos text-base leading-relaxed">
                      {slide.text}
                    </p>
                  </div>

                  {/* Точки-индикатор печатания */}
                  <div className="flex gap-1">
                    {[0,1,2].map(i => (
                      <div
                        key={i}
                        className="w-2 h-2 rounded-full animate-bounce-soft"
                        style={{ background: slide.accent, animationDelay: `${i * 0.2}s`, opacity: 0.5 }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Навигация */}
            <div className="flex items-center gap-3 mt-4">
              <button
                onClick={() => goTo(current - 1)}
                disabled={current === 0}
                className="flex items-center gap-2 px-5 py-3 rounded-2xl sky-card text-navy btn-sky font-oswald font-semibold disabled:opacity-30 disabled:cursor-not-allowed"
              >
                <Icon name="ChevronLeft" size={18} />
                Назад
              </button>

              <div className="flex-1 text-center text-sm text-muted-foreground font-golos">
                {current + 1} / {SLIDES.length}
              </div>

              {current === SLIDES.length - 1 ? (
                <button
                  onClick={() => onNavigate("home")}
                  className="flex items-center gap-2 px-5 py-3 rounded-2xl text-white font-oswald font-bold btn-sky shadow-lg"
                  style={{ background: "linear-gradient(135deg, #00b87a, #00d48a)" }}
                >
                  Завершить 🎉
                </button>
              ) : (
                <button
                  onClick={() => goTo(current + 1)}
                  className="flex items-center gap-2 px-5 py-3 rounded-2xl text-white font-oswald font-semibold btn-sky shadow-md"
                  style={{ background: slide.accent }}
                >
                  Далее
                  <Icon name="ChevronRight" size={18} />
                </button>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
