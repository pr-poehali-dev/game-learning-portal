import { useState } from "react";
import Icon from "@/components/ui/icon";
import Quiz, { QuizData } from "@/components/Quiz";

const MASCOT = {
  pointer: "https://cdn.poehali.dev/projects/25d547e9-32e8-4987-8f1a-a0b8997cbc86/bucket/6196e6eb-6503-485c-bb9f-ed54d2281065.png",
  happy:   "https://cdn.poehali.dev/projects/25d547e9-32e8-4987-8f1a-a0b8997cbc86/bucket/3ba9a3c5-c9c9-4a5a-a1ff-703556879fa7.png",
  thumbs:  "https://cdn.poehali.dev/projects/25d547e9-32e8-4987-8f1a-a0b8997cbc86/bucket/2e9452fe-36ac-4664-a4b9-77962b29491e.png",
};

type SlideType = "text" | "image" | "card";
interface Spec { label: string; value: string }

interface Slide {
  id: number;
  type: SlideType;
  label: string;
  mascotMood: keyof typeof MASCOT;
  accent: string;
  sceneGrad: string;
  xp: number;
  chapterEnd?: boolean;   // ← этот слайд завершает главу → после него тест
  text?: string;
  image?: string;
  imageCaption?: string;
  cardTitle?: string;
  cardEmoji?: string;
  cardImage?: string;
  cardDescription?: string;
  cardSpecs?: Spec[];
}

// ─── Главы со слайдами ────────────────────────────────────────────

const SLIDES: Slide[] = [
  // ── Глава 1: Аэродинамика ──
  {
    id: 1, type: "text", label: "Введение",
    mascotMood: "pointer", accent: "#3b9eff",
    sceneGrad: "linear-gradient(160deg, #c8e8ff 0%, #e8f6ff 100%)",
    xp: 10,
    text: "Привет, курсант! Я ваш инструктор. Сегодня мы начинаем изучение авиации — одной из самых захватывающих областей техники. Пристегните ремни!",
  },
  {
    id: 2, type: "text", label: "Аэродинамика",
    mascotMood: "pointer", accent: "#1a6fd4",
    sceneGrad: "linear-gradient(160deg, #d0eeff 0%, #e8f7ff 100%)",
    xp: 20,
    text: "Самолёт летит благодаря подъёмной силе крыла. Верхняя поверхность крыла изогнута сильнее — воздух там движется быстрее, создавая зону пониженного давления. Это и поднимает самолёт в небо!",
  },
  {
    id: 3, type: "image", label: "Схема крыла",
    mascotMood: "thumbs", accent: "#7c5cfc",
    sceneGrad: "linear-gradient(160deg, #eeeaff 0%, #f8f5ff 100%)",
    xp: 15,
    imageCaption: "Здесь будет схема профиля крыла и распределения давлений",
    chapterEnd: true,   // ← конец главы 1
  },

  // ── Глава 2: Четыре силы ──
  {
    id: 4, type: "text", label: "Четыре силы",
    mascotMood: "thumbs", accent: "#7c5cfc",
    sceneGrad: "linear-gradient(160deg, #e8e0ff 0%, #f5eeff 100%)",
    xp: 30,
    text: "На самолёт действуют четыре основные силы: подъёмная сила, сила тяжести, тяга двигателя и лобовое сопротивление. Задача пилота — управлять их равновесием на каждом этапе полёта.",
  },
  {
    id: 5, type: "card", label: "Изделие: МиГ-29",
    mascotMood: "thumbs", accent: "#1a6fd4",
    sceneGrad: "linear-gradient(160deg, #dceeff 0%, #eaf4ff 100%)",
    xp: 40,
    cardTitle: "МиГ-29 «Fulcrum»",
    cardEmoji: "🛩️",
    cardDescription: "Советский многоцелевой истребитель четвёртого поколения. Разработан ОКБ Микояна. Состоит на вооружении более 25 стран мира.",
    cardSpecs: [
      { label: "Макс. скорость", value: "2 400 км/ч (М 2,25)" },
      { label: "Дальность", value: "1 500 км" },
      { label: "Практический потолок", value: "18 000 м" },
      { label: "Тяга (2 × РД-33)", value: "2 × 81,4 кН" },
      { label: "Взлётная масса", value: "18 480 кг" },
      { label: "Экипаж", value: "1 пилот" },
    ],
    chapterEnd: true,   // ← конец главы 2
  },

  // ── Глава 3: Управление ──
  {
    id: 6, type: "text", label: "Органы управления",
    mascotMood: "thumbs", accent: "#ff7eb3",
    sceneGrad: "linear-gradient(160deg, #ffe8f0 0%, #fff4f9 100%)",
    xp: 30,
    text: "Пилот управляет самолётом тремя органами: элероны управляют креном (наклон по крыльям), руль высоты — тангажем (нос вверх/вниз), руль направления — рысканием (повороты носа).",
  },
  {
    id: 7, type: "image", label: "Кабина МиГ-29",
    mascotMood: "pointer", accent: "#1a6fd4",
    sceneGrad: "linear-gradient(160deg, #dceeff 0%, #eaf4ff 100%)",
    xp: 15,
    imageCaption: "Здесь будет фотография кабины пилота МиГ-29",
  },
  {
    id: 8, type: "text", label: "Завершение",
    mascotMood: "happy", accent: "#00b87a",
    sceneGrad: "linear-gradient(160deg, #c8ffea 0%, #eafff5 100%)",
    xp: 50,
    text: "Отличная работа, курсант! 🎉 Вы прошли первую лекцию по основам авиации. Заработано 200 XP и значок «Первый полёт»! Продолжайте обучение — следующая лекция посвящена двигателям.",
    chapterEnd: true,   // ← конец главы 3 (финал лекции)
  },
];

// ─── Тесты по главам ─────────────────────────────────────────────
// chapterId совпадает с id финального слайда главы

const QUIZZES: Record<number, QuizData> = {
  3: {
    chapterId: 3,
    chapterTitle: "Аэродинамика крыла",
    accent: "#3b9eff",
    questions: [
      {
        type: "choice",
        question: "Почему верхняя поверхность крыла создаёт зону пониженного давления?",
        options: [
          "Она тяжелее нижней",
          "Воздух движется по ней быстрее из-за большей кривизны",
          "Она нагревается от двигателя",
          "На неё давит набегающий поток снизу",
        ],
        correct: 1,
      },
      {
        type: "input",
        question: "Как называется сила, поднимающая самолёт в воздух?",
        correct: "подъёмная",
        hint: "Одно слово, именительный падеж",
      },
      {
        type: "match",
        question: "Сопоставь поверхность крыла с характером потока воздуха:",
        pairs: [
          { imageEmoji: "⬆️", label: "Верхняя — быстрее, давление ниже" },
          { imageEmoji: "⬇️", label: "Нижняя — медленнее, давление выше" },
        ],
      },
    ],
  },
  5: {
    chapterId: 5,
    chapterTitle: "Четыре силы и МиГ-29",
    accent: "#7c5cfc",
    questions: [
      {
        type: "choice",
        question: "Сколько основных сил действует на самолёт в полёте?",
        options: ["2", "3", "4", "6"],
        correct: 2,
      },
      {
        type: "match",
        question: "Сопоставь силу с её направлением:",
        pairs: [
          { imageEmoji: "🛫", label: "Подъёмная сила — вверх" },
          { imageEmoji: "🏋️", label: "Сила тяжести — вниз" },
          { imageEmoji: "🔥", label: "Тяга — вперёд" },
          { imageEmoji: "💨", label: "Лобовое сопротивление — назад" },
        ],
      },
      {
        type: "input",
        question: "Какова максимальная скорость МиГ-29 в км/ч?",
        correct: "2400",
        hint: "Только цифры, без пробелов",
      },
    ],
  },
  8: {
    chapterId: 8,
    chapterTitle: "Органы управления",
    accent: "#ff7eb3",
    questions: [
      {
        type: "match",
        question: "Сопоставь орган управления с осью, которую он контролирует:",
        pairs: [
          { imageEmoji: "↔️", label: "Элероны — крен" },
          { imageEmoji: "↕️", label: "Руль высоты — тангаж" },
          { imageEmoji: "🔄", label: "Руль направления — рыскание" },
        ],
      },
      {
        type: "choice",
        question: "Где расположен руль высоты?",
        options: [
          "На концах крыльев",
          "На вертикальном хвостовом оперении",
          "На горизонтальном хвостовом стабилизаторе",
          "Под фюзеляжем",
        ],
        correct: 2,
      },
      {
        type: "input",
        question: "Как называется угловое движение самолёта вокруг вертикальной оси (повороты носа)?",
        correct: "рыскание",
        hint: "Одно слово",
      },
    ],
  },
};

// ─── Компонент новеллы ───────────────────────────────────────────

interface NovelProps {
  onNavigate: (page: string) => void;
}

type Mode = "slide" | "quiz";

export default function Novel({ onNavigate }: NovelProps) {
  const [current, setCurrent] = useState(0);
  const [seen, setSeen] = useState<Set<number>>(new Set([0]));
  const [transitioning, setTransitioning] = useState(false);
  const [mode, setMode] = useState<Mode>("slide");
  const [totalXp, setTotalXp] = useState(0);

  const slide = SLIDES[current];
  const slideXp = Array.from(seen).reduce((acc, i) => acc + SLIDES[i].xp, 0);

  const goTo = (index: number) => {
    if (transitioning || index === current) return;
    setTransitioning(true);
    setTimeout(() => {
      setCurrent(index);
      setSeen((prev) => new Set([...prev, index]));
      setTransitioning(false);
    }, 180);
  };

  // Нажатие «Далее» на последнем слайде главы → тест
  const handleNext = () => {
    if (slide.chapterEnd && QUIZZES[slide.id]) {
      setMode("quiz");
    } else if (current < SLIDES.length - 1) {
      goTo(current + 1);
    }
  };

  const isLastSlide = current === SLIDES.length - 1;
  const willTriggerQuiz = slide.chapterEnd && !!QUIZZES[slide.id];

  // После теста — продолжаем со следующего слайда
  const handleQuizFinish = (xp: number) => {
    setTotalXp((prev) => prev + xp);
    setMode("slide");
    if (current < SLIDES.length - 1) {
      goTo(current + 1);
    }
  };

  const currentQuiz = QUIZZES[slide.id];

  return (
    <div
      className="min-h-screen flex flex-col relative overflow-hidden"
      style={{ background: slide.sceneGrad, transition: "background 0.6s ease" }}
    >
      {/* Облака */}
      {[{ x: 3, y: 2, w: 170 }, { x: 62, y: 1, w: 210 }].map((c, i) => (
        <div
          key={i}
          className="absolute cloud-float pointer-events-none opacity-50"
          style={{
            left: `${c.x}%`, top: `${c.y}%`,
            width: c.w, height: Math.round(c.w * 0.38),
            background: "radial-gradient(ellipse at 40% 40%, rgba(255,255,255,0.92) 30%, transparent 80%)",
            borderRadius: "50%",
            animationDelay: `${i * 2}s`,
          }}
        />
      ))}

      {/* Шапка */}
      <header className="relative z-10 flex items-center gap-2 px-4 py-2.5 flex-shrink-0">
        <button
          onClick={() => onNavigate("home")}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl sky-card text-navy text-sm btn-sky font-oswald font-semibold"
        >
          <Icon name="Home" size={14} />
          <span>Главная</span>
        </button>

        <div className="flex-1 flex items-center gap-2 px-3 py-1.5 rounded-xl sky-card">
          {SLIDES.map((s, i) => (
            <button
              key={i}
              onClick={() => mode === "slide" && goTo(i)}
              title={s.label}
              className="flex-1 rounded-full transition-all duration-300"
              style={{
                height: i === current && mode === "slide" ? 6 : 4,
                background: i === current && mode === "slide"
                  ? slide.accent
                  : mode === "quiz" && s.chapterEnd && s.id === slide.id
                  ? `${slide.accent}cc`
                  : seen.has(i)
                  ? `${slide.accent}55`
                  : "#dde8f5",
              }}
            />
          ))}
          <span className="text-xs text-muted-foreground font-golos whitespace-nowrap ml-1">
            {mode === "quiz" ? "📝" : `${current + 1}/${SLIDES.length}`}
          </span>
        </div>

        <div className="px-3 py-1.5 rounded-xl sky-card border border-yellow-200 text-xs font-oswald font-bold text-gold whitespace-nowrap">
          +{slideXp + totalXp} XP
        </div>
      </header>

      {/* ─── Режим ТЕСТА ─── */}
      {mode === "quiz" && currentQuiz && (
        <Quiz
          quiz={currentQuiz}
          onFinish={handleQuizFinish}
          mascotHappy={MASCOT.happy}
          mascotPointer={MASCOT.pointer}
        />
      )}

      {/* ─── Режим СЛАЙДА ─── */}
      {mode === "slide" && (
        <main className="relative z-10 flex-1 flex flex-col px-4 pb-4 min-h-0">
          <div
            className={`flex-1 flex flex-col transition-all duration-200 ${transitioning ? "opacity-0 scale-[0.98]" : "opacity-100 scale-100"}`}
          >
            {/* TEXT */}
            {slide.type === "text" && (
              <div className="flex-1 flex flex-col sm:flex-row gap-3 items-end sm:items-stretch">
                <div className="flex-shrink-0 flex items-end justify-center sm:justify-start">
                  <img
                    src={MASCOT[slide.mascotMood]}
                    alt="Инструктор"
                    className="w-36 sm:w-44 object-contain transition-all duration-500 animate-float"
                    style={{ filter: "drop-shadow(0 4px 16px rgba(59,158,255,0.15))" }}
                  />
                </div>
                <div className="flex-1 flex flex-col sky-card rounded-3xl rounded-bl-none p-5 border border-sky-100 min-h-0">
                  <div className="flex items-center gap-2 mb-3">
                    <div
                      className="w-7 h-7 rounded-full flex items-center justify-center text-white text-xs font-oswald font-bold flex-shrink-0"
                      style={{ background: slide.accent }}
                    >
                      {current + 1}
                    </div>
                    <div>
                      <div className="font-oswald font-bold text-navy text-sm leading-none">Инструктор</div>
                      <div className="text-xs text-muted-foreground font-golos">{slide.label}</div>
                    </div>
                    <div
                      className="ml-auto text-xs px-2 py-0.5 rounded-full text-white font-oswald font-semibold flex-shrink-0"
                      style={{ background: slide.accent }}
                    >
                      +{slide.xp} XP
                    </div>
                  </div>
                  <div
                    className="flex-1 rounded-2xl rounded-tl-none p-4 overflow-y-auto"
                    style={{ background: `${slide.accent}0e`, border: `1.5px solid ${slide.accent}28` }}
                  >
                    <p className="text-navy font-golos text-base leading-relaxed">{slide.text}</p>
                  </div>
                </div>
              </div>
            )}

            {/* IMAGE */}
            {slide.type === "image" && (
              <div className="flex-1 flex flex-col gap-3">
                <div className="flex items-center gap-2 sky-card rounded-2xl px-4 py-2.5 border border-sky-100">
                  <img src={MASCOT[slide.mascotMood]} alt="" className="w-10 h-10 object-contain object-top" />
                  <div>
                    <span className="font-oswald font-bold text-navy text-sm">Инструктор</span>
                    <span className="mx-2 text-muted-foreground">·</span>
                    <span className="text-sm text-muted-foreground font-golos">{slide.label}</span>
                  </div>
                  <div className="ml-auto text-xs px-2 py-0.5 rounded-full text-white font-oswald font-semibold" style={{ background: slide.accent }}>
                    +{slide.xp} XP
                  </div>
                </div>
                <div
                  className="flex-1 rounded-3xl overflow-hidden relative flex flex-col items-center justify-center"
                  style={{ border: `2px solid ${slide.accent}33`, background: `linear-gradient(135deg, rgba(255,255,255,0.7), rgba(255,255,255,0.3))`, minHeight: 200 }}
                >
                  {slide.image ? (
                    <img src={slide.image} alt={slide.label} className="w-full h-full object-contain" />
                  ) : (
                    <div className="flex flex-col items-center gap-3 text-center px-8 py-10">
                      <div className="text-6xl opacity-25">🖼️</div>
                      <div className="text-sm text-muted-foreground font-golos opacity-70">{slide.imageCaption}</div>
                      <div className="text-xs px-3 py-1 rounded-full font-golos opacity-50" style={{ background: `${slide.accent}20`, color: slide.accent }}>
                        📷 Место под изображение
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* CARD */}
            {slide.type === "card" && (
              <div className="flex-1 flex flex-col gap-3 overflow-y-auto">
                <div className="flex items-center gap-2 sky-card rounded-2xl px-4 py-2.5 border border-sky-100 flex-shrink-0">
                  <img src={MASCOT[slide.mascotMood]} alt="" className="w-10 h-10 object-contain object-top" />
                  <div>
                    <span className="font-oswald font-bold text-navy text-sm">Изучаем изделие</span>
                    <span className="mx-2 text-muted-foreground">·</span>
                    <span className="text-sm text-muted-foreground font-golos">{slide.label}</span>
                  </div>
                  <div className="ml-auto text-xs px-2 py-0.5 rounded-full text-white font-oswald font-semibold flex-shrink-0" style={{ background: slide.accent }}>
                    +{slide.xp} XP
                  </div>
                </div>
                <div className="flex-1 sky-card rounded-3xl p-5 border border-sky-100 overflow-y-auto">
                  <div
                    className="rounded-2xl mb-4 flex items-center justify-center overflow-hidden"
                    style={{ background: `linear-gradient(135deg, rgba(200,220,255,0.5), rgba(255,255,255,0.4))`, minHeight: 160, border: `1.5px solid ${slide.accent}22` }}
                  >
                    {slide.cardImage ? (
                      <img src={slide.cardImage} alt={slide.cardTitle} className="w-full object-cover" style={{ maxHeight: 220 }} />
                    ) : (
                      <div className="flex flex-col items-center gap-2 py-8 opacity-30">
                        <div className="text-5xl">{slide.cardEmoji}</div>
                        <div className="text-xs text-muted-foreground font-golos">Фото изделия</div>
                      </div>
                    )}
                  </div>
                  <h2 className="font-oswald text-2xl font-bold text-navy mb-1">{slide.cardEmoji} {slide.cardTitle}</h2>
                  {slide.cardDescription && (
                    <p className="text-sm font-golos text-muted-foreground leading-relaxed mb-4">{slide.cardDescription}</p>
                  )}
                  {slide.cardSpecs && (
                    <>
                      <div className="font-oswald font-bold text-navy text-sm mb-2 flex items-center gap-1">
                        <span style={{ color: slide.accent }}>📊</span> Характеристики
                      </div>
                      <div className="divide-y" style={{ borderColor: `${slide.accent}18` }}>
                        {slide.cardSpecs.map((spec, i) => (
                          <div key={i} className="flex items-center justify-between py-2 gap-4">
                            <span className="text-muted-foreground font-golos text-sm">{spec.label}</span>
                            <span className="font-golos font-semibold text-navy text-sm text-right">{spec.value}</span>
                          </div>
                        ))}
                      </div>
                    </>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Навигация */}
          <div className="flex items-center gap-3 mt-3 flex-shrink-0">
            <button
              onClick={() => goTo(current - 1)}
              disabled={current === 0}
              className="flex items-center gap-2 px-4 py-2.5 rounded-2xl sky-card text-navy btn-sky font-oswald font-semibold text-sm disabled:opacity-30 disabled:cursor-not-allowed"
            >
              <Icon name="ChevronLeft" size={16} /> Назад
            </button>

            <div className="flex-1" />

            {/* Подсказка перед тестом */}
            {willTriggerQuiz && !isLastSlide && (
              <div className="text-xs text-muted-foreground font-golos flex items-center gap-1">
                <span>📝</span> Далее — тест
              </div>
            )}

            {isLastSlide && !willTriggerQuiz ? (
              <button
                onClick={() => onNavigate("home")}
                className="flex items-center gap-2 px-5 py-2.5 rounded-2xl text-white font-oswald font-bold text-sm btn-sky shadow-md"
                style={{ background: "linear-gradient(135deg, #00b87a, #00d48a)" }}
              >
                Завершить 🎉
              </button>
            ) : (
              <button
                onClick={handleNext}
                className="flex items-center gap-2 px-5 py-2.5 rounded-2xl text-white font-oswald font-semibold text-sm btn-sky shadow-md"
                style={{ background: willTriggerQuiz ? "linear-gradient(135deg, #f5a623, #ffd060)" : slide.accent }}
              >
                {willTriggerQuiz ? (
                  <>📝 Пройти тест</>
                ) : (
                  <>Далее <Icon name="ChevronRight" size={16} /></>
                )}
              </button>
            )}
          </div>
        </main>
      )}
    </div>
  );
}