import { useState } from "react";
import Icon from "@/components/ui/icon";

const MASCOT = {
  pointer: "https://cdn.poehali.dev/projects/25d547e9-32e8-4987-8f1a-a0b8997cbc86/bucket/6448c8cb-b6a2-4c6d-b2aa-9b0c6bffdf55.jpg",
  happy:   "https://cdn.poehali.dev/projects/25d547e9-32e8-4987-8f1a-a0b8997cbc86/bucket/75363298-9087-4238-b6cc-472c8fcc3566.jpg",
  thumbs:  "https://cdn.poehali.dev/projects/25d547e9-32e8-4987-8f1a-a0b8997cbc86/bucket/34e54cf1-bf32-4789-a85e-5eedc2ca31a4.jpg",
};

// Типы слайдов:
// "text"  — маскот + текст (обычный диалог)
// "image" — маскот + картинка (без текста или с коротким подписью)
// "card"  — полноэкранная карточка изделия с характеристиками

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
  // text-слайд
  text?: string;
  // image-слайд
  image?: string;
  imageCaption?: string;
  // card-слайд
  cardTitle?: string;
  cardEmoji?: string;
  cardImage?: string;
  cardDescription?: string;
  cardSpecs?: Spec[];
}

const SLIDES: Slide[] = [
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
  },
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
  },
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

  const goTo = (index: number) => {
    if (transitioning || index === current) return;
    setTransitioning(true);
    setTimeout(() => {
      setCurrent(index);
      setSeen((prev) => new Set([...prev, index]));
      setTransitioning(false);
    }, 180);
  };

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

      {/* Шапка — компактная */}
      <header className="relative z-10 flex items-center gap-2 px-4 py-2.5">
        <button
          onClick={() => onNavigate("home")}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl sky-card text-navy text-sm btn-sky font-oswald font-semibold"
        >
          <Icon name="Home" size={14} />
          <span>Главная</span>
        </button>

        {/* Компактный прогресс в шапке */}
        <div className="flex-1 flex items-center gap-2 px-3 py-1.5 rounded-xl sky-card">
          {SLIDES.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              title={SLIDES[i].label}
              className="flex-1 h-1.5 rounded-full transition-all duration-300"
              style={{
                background: i === current
                  ? slide.accent
                  : seen.has(i)
                  ? `${slide.accent}60`
                  : "#dde8f5",
              }}
            />
          ))}
          <span className="text-xs text-muted-foreground font-golos whitespace-nowrap ml-1">
            {current + 1}/{SLIDES.length}
          </span>
        </div>

        <div className="px-3 py-1.5 rounded-xl sky-card border border-yellow-200 text-xs font-oswald font-bold text-gold whitespace-nowrap">
          +{totalXp} XP
        </div>
      </header>

      {/* Основной контент */}
      <main className="relative z-10 flex-1 flex flex-col px-4 pb-4 min-h-0">
        <div
          className={`flex-1 flex flex-col transition-all duration-180 ${transitioning ? "opacity-0 scale-[0.98]" : "opacity-100 scale-100"}`}
        >
          {/* ─── TEXT слайд ─── */}
          {slide.type === "text" && (
            <div className="flex-1 flex flex-col sm:flex-row gap-3 items-end sm:items-stretch">
              {/* Маскот */}
              <div className="flex-shrink-0 flex items-end justify-center sm:justify-start">
                <img
                  src={MASCOT[slide.mascotMood]}
                  alt="Инструктор"
                  className="w-36 sm:w-44 object-contain transition-all duration-500 animate-float"
                  style={{ filter: "drop-shadow(0 4px 16px rgba(59,158,255,0.15))" }}
                />
              </div>

              {/* Текстовая панель — заполняет всё доступное место */}
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
                  <p className="text-navy font-golos text-base leading-relaxed">
                    {slide.text}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* ─── IMAGE слайд ─── */}
          {slide.type === "image" && (
            <div className="flex-1 flex flex-col gap-3">
              {/* Подпись вверху */}
              <div className="flex items-center gap-2 sky-card rounded-2xl px-4 py-2.5 border border-sky-100">
                <img
                  src={MASCOT[slide.mascotMood]}
                  alt="Инструктор"
                  className="w-10 h-10 object-contain object-top"
                  style={{ filter: "drop-shadow(0 2px 6px rgba(59,158,255,0.15))" }}
                />
                <div>
                  <span className="font-oswald font-bold text-navy text-sm">Инструктор</span>
                  <span className="mx-2 text-muted-foreground">·</span>
                  <span className="text-sm text-muted-foreground font-golos">{slide.label}</span>
                </div>
                <div
                  className="ml-auto text-xs px-2 py-0.5 rounded-full text-white font-oswald font-semibold"
                  style={{ background: slide.accent }}
                >
                  +{slide.xp} XP
                </div>
              </div>

              {/* Изображение — занимает всё оставшееся место */}
              <div
                className="flex-1 rounded-3xl overflow-hidden relative flex flex-col items-center justify-center"
                style={{
                  border: `2px solid ${slide.accent}33`,
                  background: slide.image ? "transparent" : `linear-gradient(135deg, rgba(255,255,255,0.7), rgba(255,255,255,0.3))`,
                  minHeight: 200,
                }}
              >
                {slide.image ? (
                  <img src={slide.image} alt={slide.label} className="w-full h-full object-contain" />
                ) : (
                  <div className="flex flex-col items-center gap-3 text-center px-8 py-10">
                    <div className="text-6xl opacity-25">🖼️</div>
                    <div className="text-sm text-muted-foreground font-golos opacity-70">
                      {slide.imageCaption}
                    </div>
                    <div
                      className="text-xs px-3 py-1 rounded-full font-golos opacity-50"
                      style={{ background: `${slide.accent}20`, color: slide.accent }}
                    >
                      📷 Место под изображение
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* ─── CARD слайд ─── */}
          {slide.type === "card" && (
            <div className="flex-1 flex flex-col gap-3 overflow-y-auto">
              {/* Мини-шапка с маскотом */}
              <div className="flex items-center gap-2 sky-card rounded-2xl px-4 py-2.5 border border-sky-100 flex-shrink-0">
                <img
                  src={MASCOT[slide.mascotMood]}
                  alt="Инструктор"
                  className="w-10 h-10 object-contain object-top"
                />
                <div>
                  <span className="font-oswald font-bold text-navy text-sm">Изучаем изделие</span>
                  <span className="mx-2 text-muted-foreground">·</span>
                  <span className="text-sm text-muted-foreground font-golos">{slide.label}</span>
                </div>
                <div
                  className="ml-auto text-xs px-2 py-0.5 rounded-full text-white font-oswald font-semibold flex-shrink-0"
                  style={{ background: slide.accent }}
                >
                  +{slide.xp} XP
                </div>
              </div>

              {/* Карточка изделия */}
              <div className="flex-1 sky-card rounded-3xl p-5 border border-sky-100 overflow-y-auto">
                {/* Фото изделия */}
                <div
                  className="rounded-2xl mb-4 flex items-center justify-center overflow-hidden"
                  style={{
                    background: slide.cardImage ? "transparent" : `linear-gradient(135deg, ${slide.sceneGrad.split(",")[0].replace("linear-gradient(160deg, ", "")}, rgba(255,255,255,0.5))`,
                    minHeight: 160,
                    border: `1.5px solid ${slide.accent}22`,
                  }}
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

                <h2 className="font-oswald text-2xl font-bold text-navy mb-1">
                  {slide.cardEmoji} {slide.cardTitle}
                </h2>
                {slide.cardDescription && (
                  <p className="text-sm font-golos text-muted-foreground leading-relaxed mb-4">
                    {slide.cardDescription}
                  </p>
                )}

                {/* Характеристики */}
                {slide.cardSpecs && slide.cardSpecs.length > 0 && (
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

          {current === SLIDES.length - 1 ? (
            <button
              onClick={() => onNavigate("home")}
              className="flex items-center gap-2 px-5 py-2.5 rounded-2xl text-white font-oswald font-bold text-sm btn-sky shadow-md"
              style={{ background: "linear-gradient(135deg, #00b87a, #00d48a)" }}
            >
              Завершить 🎉
            </button>
          ) : (
            <button
              onClick={() => goTo(current + 1)}
              className="flex items-center gap-2 px-5 py-2.5 rounded-2xl text-white font-oswald font-semibold text-sm btn-sky shadow-md"
              style={{ background: slide.accent }}
            >
              Далее <Icon name="ChevronRight" size={16} />
            </button>
          )}
        </div>
      </main>
    </div>
  );
}
