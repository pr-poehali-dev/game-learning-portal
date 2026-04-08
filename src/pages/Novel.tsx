import { useState } from "react";
import Icon from "@/components/ui/icon";

const CHARACTER_IMG = "https://cdn.poehali.dev/projects/25d547e9-32e8-4987-8f1a-a0b8997cbc86/files/ef54a2fd-88c6-4423-9885-ce03739ec5b5.jpg";

interface Slide {
  id: number;
  character: string;
  text: string;
  mood: string;
  scene: string;
  sceneColor: string;
  xp: number;
}

const SLIDES: Slide[] = [
  {
    id: 1,
    character: "Профессор Зная",
    text: "Привет, искатель знаний! Я рада, что ты здесь. Сегодня мы отправимся в удивительное путешествие по миру науки. Готов ли ты к приключению?",
    mood: "😊",
    scene: "Библиотека знаний",
    sceneColor: "from-violet-900/80 to-indigo-900/80",
    xp: 10,
  },
  {
    id: 2,
    character: "Профессор Зная",
    text: "Первый закон, который мы изучим — это закон причинно-следственных связей. Каждое событие имеет свою причину. Понимание этого — ключ к любому научному мышлению!",
    mood: "🤔",
    scene: "Лаборатория открытий",
    sceneColor: "from-blue-900/80 to-teal-900/80",
    xp: 20,
  },
  {
    id: 3,
    character: "Профессор Зная",
    text: "Отлично! Ты справляешься замечательно. Запомни: практика — мать учения. Настоящие знания рождаются тогда, когда мы применяем их в жизни. Давай разберём пример...",
    mood: "🌟",
    scene: "Поле практики",
    sceneColor: "from-emerald-900/80 to-cyan-900/80",
    xp: 30,
  },
  {
    id: 4,
    character: "Профессор Зная",
    text: "Вот реальный пример: когда ты видишь молнию и слышишь гром — это причинно-следственная связь. Молния (причина) создаёт звуковую волну (следствие). Просто и гениально!",
    mood: "⚡",
    scene: "Галактика примеров",
    sceneColor: "from-yellow-900/80 to-orange-900/80",
    xp: 40,
  },
  {
    id: 5,
    character: "Профессор Зная",
    text: "Превосходно! Ты прошёл первую главу! 🎉 Ты заработал 100 очков опыта и разблокировал значок «Первый шаг». Продолжай в том же духе — впереди ещё много интересного!",
    mood: "🏆",
    scene: "Зал победителей",
    sceneColor: "from-pink-900/80 to-purple-900/80",
    xp: 100,
  },
];

interface NovelProps {
  onNavigate: (page: string) => void;
}

export default function Novel({ onNavigate }: NovelProps) {
  const [current, setCurrent] = useState(0);
  const [earnedXp, setEarnedXp] = useState<number[]>([]);
  const [transitioning, setTransitioning] = useState(false);

  const slide = SLIDES[current];
  const progress = ((current + 1) / SLIDES.length) * 100;
  const totalXp = earnedXp.reduce((a, b) => a + b, 0);

  const goTo = (index: number) => {
    if (transitioning) return;
    setTransitioning(true);
    setTimeout(() => {
      setCurrent(index);
      if (!earnedXp.includes(index) && index > 0) {
        setEarnedXp((prev) => [...prev, index]);
      }
      setTransitioning(false);
    }, 200);
  };

  const goNext = () => {
    if (current < SLIDES.length - 1) goTo(current + 1);
  };

  const goPrev = () => {
    if (current > 0) goTo(current - 1);
  };

  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden">
      {/* Фон сцены */}
      <div
        className={`absolute inset-0 bg-gradient-to-br ${slide.sceneColor} transition-all duration-700`}
      />
      <div className="absolute inset-0 stars-bg opacity-40" />

      {/* Декоративные шестиугольники */}
      <div className="absolute top-10 right-10 w-20 h-20 hexagon bg-white/5 animate-float" style={{ animationDelay: "0s" }} />
      <div className="absolute bottom-20 left-10 w-14 h-14 hexagon bg-white/5 animate-float" style={{ animationDelay: "1s" }} />
      <div className="absolute top-40 left-20 w-8 h-8 hexagon bg-neon-purple/20 animate-float" style={{ animationDelay: "0.5s" }} />

      {/* Шапка */}
      <header className="relative z-10 flex items-center justify-between px-4 py-4">
        <button
          onClick={() => onNavigate("home")}
          className="flex items-center gap-2 px-3 py-2 rounded-xl card-game border border-border/50 text-muted-foreground hover:text-white hover:border-neon-purple/50 transition-all btn-game text-sm"
        >
          <Icon name="Home" size={16} />
          <span>Главная</span>
        </button>

        <div className="flex items-center gap-2 px-3 py-2 rounded-xl card-game border border-neon-yellow/30">
          <span className="text-neon-yellow text-sm">✨</span>
          <span className="font-oswald text-neon-yellow font-bold text-sm">+{totalXp} XP</span>
        </div>
      </header>

      {/* Прогресс */}
      <div className="relative z-10 px-4 mb-4">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center justify-between mb-2 text-sm text-muted-foreground font-golos">
            <span>📍 {slide.scene}</span>
            <span>{current + 1} / {SLIDES.length}</span>
          </div>
          <div className="w-full bg-muted/50 rounded-full h-2">
            <div
              className="progress-bar transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="flex gap-1 mt-2">
            {SLIDES.map((_, i) => (
              <div
                key={i}
                className={`h-1 flex-1 rounded-full transition-all duration-300 ${
                  i <= current ? "bg-neon-purple" : "bg-muted/50"
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Основной контент */}
      <main className="relative z-10 flex-1 flex flex-col items-center justify-center px-4 pb-4">
        <div className="max-w-3xl w-full">
          <div
            className={`transition-all duration-200 ${
              transitioning ? "opacity-0 scale-95" : "opacity-100 scale-100"
            }`}
          >
            {/* Сцена с персонажем */}
            <div className="card-game rounded-3xl border border-white/10 overflow-hidden mb-4">
              <div className="flex flex-col sm:flex-row">
                {/* Персонаж */}
                <div className="sm:w-56 flex-shrink-0 flex items-end justify-center bg-gradient-to-b from-transparent to-black/30 pt-6 px-4 sm:px-0">
                  <img
                    src={CHARACTER_IMG}
                    alt="Профессор Зная"
                    className="w-40 sm:w-48 object-contain drop-shadow-2xl"
                    style={{ maxHeight: "220px" }}
                  />
                </div>

                {/* Диалог */}
                <div className="flex-1 p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-2xl">{slide.mood}</span>
                    <span className="font-oswald text-lg font-bold text-white">
                      {slide.character}
                    </span>
                    <span className="ml-auto text-xs px-2 py-1 rounded-full bg-neon-purple/20 text-neon-purple border border-neon-purple/30">
                      +{slide.xp} XP
                    </span>
                  </div>

                  <div className="relative">
                    <div className="absolute -left-2 top-3 w-4 h-4 rotate-45 bg-muted/50 border-l border-t border-white/10 hidden sm:block" />
                    <div className="bg-muted/50 rounded-2xl p-4 border border-white/10">
                      <p className="text-white font-golos text-base leading-relaxed">
                        {slide.text}
                      </p>
                    </div>
                  </div>

                  {/* Индикатор слайда */}
                  <div className="flex gap-1 mt-4">
                    {Array.from({ length: 3 }).map((_, i) => (
                      <div key={i} className={`w-2 h-2 rounded-full animate-pulse-slow ${i === 0 ? "bg-neon-cyan" : "bg-muted"}`} style={{ animationDelay: `${i * 0.3}s` }} />
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Кнопки навигации */}
            <div className="flex items-center justify-between gap-3">
              <button
                onClick={goPrev}
                disabled={current === 0}
                className="flex items-center gap-2 px-5 py-3 rounded-2xl card-game border border-border/50 text-muted-foreground hover:text-white hover:border-neon-purple/50 transition-all btn-game disabled:opacity-30 disabled:cursor-not-allowed"
              >
                <Icon name="ChevronLeft" size={20} />
                <span>Назад</span>
              </button>

              {/* Миниатюры слайдов */}
              <div className="flex gap-2 flex-1 justify-center">
                {SLIDES.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => goTo(i)}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      i === current
                        ? "bg-neon-purple glow-purple scale-125"
                        : i < current
                        ? "bg-neon-cyan/60"
                        : "bg-muted"
                    }`}
                  />
                ))}
              </div>

              {current === SLIDES.length - 1 ? (
                <button
                  onClick={() => onNavigate("home")}
                  className="flex items-center gap-2 px-5 py-3 rounded-2xl bg-gradient-to-r from-neon-purple to-neon-cyan text-white font-bold btn-game glow-purple"
                >
                  <span>Завершить</span>
                  <span>🎉</span>
                </button>
              ) : (
                <button
                  onClick={goNext}
                  className="flex items-center gap-2 px-5 py-3 rounded-2xl bg-neon-purple text-white btn-game glow-purple"
                >
                  <span>Далее</span>
                  <Icon name="ChevronRight" size={20} />
                </button>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
