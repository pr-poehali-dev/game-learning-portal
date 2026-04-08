import { useState } from "react";
import Icon from "@/components/ui/icon";

// ─── Типы вопросов ───────────────────────────────────────────────

export type QuestionType = "choice" | "match" | "input";

export interface ChoiceQuestion {
  type: "choice";
  question: string;
  options: string[];
  correct: number; // индекс правильного ответа
}

export interface MatchPair {
  image?: string;         // URL картинки (или emoji, если картинки нет)
  imageEmoji?: string;
  label: string;          // текст для сопоставления
}

export interface MatchQuestion {
  type: "match";
  question: string;
  pairs: MatchPair[];     // правильный порядок; перемешиваем только текстовую колонку
}

export interface InputQuestion {
  type: "input";
  question: string;
  correct: string;        // правильный ответ (регистр игнорируется)
  hint?: string;          // подсказка под полем ввода
}

export type Question = ChoiceQuestion | MatchQuestion | InputQuestion;

export interface QuizData {
  chapterId: number;
  chapterTitle: string;
  accent: string;
  questions: Question[];
}

// ─── Props ───────────────────────────────────────────────────────

interface QuizProps {
  quiz: QuizData;
  onFinish: (xp: number) => void;   // вызывается после последнего вопроса
  mascotHappy: string;
  mascotPointer: string;
}

// ─── Утилиты ─────────────────────────────────────────────────────

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

const XP_PER_CORRECT = 20;

// ─── Компонент ───────────────────────────────────────────────────

export default function Quiz({ quiz, onFinish, mascotHappy, mascotPointer }: QuizProps) {
  const [qIndex, setQIndex] = useState(0);
  const [answered, setAnswered] = useState(false);
  const [correct, setCorrect] = useState(false);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);

  // choice
  const [chosen, setChosen] = useState<number | null>(null);

  // match — shuffled labels, пользователь перетаскивает/выбирает
  const q = quiz.questions[qIndex];
  const [matchShuffled] = useState<string[]>(() =>
    q.type === "match" ? shuffle((q as MatchQuestion).pairs.map((p) => p.label)) : []
  );
  const [matchSelected, setMatchSelected] = useState<(string | null)[]>(
    () => q.type === "match" ? Array((q as MatchQuestion).pairs.length).fill(null) : []
  );
  const [matchPool, setMatchPool] = useState<string[]>(matchShuffled);

  // input
  const [inputVal, setInputVal] = useState("");

  const totalQ = quiz.questions.length;
  const earnedXp = score * XP_PER_CORRECT;

  // ── сброс состояния при переходе к следующему вопросу ──
  const nextQuestion = () => {
    if (qIndex + 1 >= totalQ) {
      setShowResult(true);
      return;
    }
    const nextQ = quiz.questions[qIndex + 1];
    setQIndex(qIndex + 1);
    setAnswered(false);
    setCorrect(false);
    setChosen(null);
    setInputVal("");
    if (nextQ.type === "match") {
      const labels = shuffle((nextQ as MatchQuestion).pairs.map((p) => p.label));
      setMatchPool(labels);
      setMatchSelected(Array((nextQ as MatchQuestion).pairs.length).fill(null));
    }
  };

  // ── проверка ответа ──
  const checkAnswer = () => {
    if (answered) return;

    if (q.type === "choice") {
      const ok = chosen === (q as ChoiceQuestion).correct;
      setCorrect(ok);
      if (ok) setScore((s) => s + 1);
    } else if (q.type === "input") {
      const ok = inputVal.trim().toLowerCase() === (q as InputQuestion).correct.toLowerCase();
      setCorrect(ok);
      if (ok) setScore((s) => s + 1);
    } else if (q.type === "match") {
      const mq = q as MatchQuestion;
      const ok = mq.pairs.every((p, i) => matchSelected[i] === p.label);
      setCorrect(ok);
      if (ok) setScore((s) => s + 1);
    }
    setAnswered(true);
  };

  // ── можно ли нажать «Ответить» ──
  const canSubmit = () => {
    if (q.type === "choice") return chosen !== null;
    if (q.type === "input") return inputVal.trim().length > 0;
    if (q.type === "match") return matchSelected.every((v) => v !== null);
    return false;
  };

  // ── Match: выбор из пула ──
  const handleMatchSelect = (slotIdx: number, label: string) => {
    if (answered) return;
    const prev = matchSelected[slotIdx];
    const newSel = [...matchSelected];
    newSel[slotIdx] = label;
    // вернуть предыдущее значение в пул
    const newPool = matchPool.filter((l) => l !== label);
    if (prev) newPool.push(prev);
    setMatchSelected(newSel);
    setMatchPool(newPool);
  };

  const handleMatchClear = (slotIdx: number) => {
    if (answered) return;
    const val = matchSelected[slotIdx];
    if (!val) return;
    const newSel = [...matchSelected];
    newSel[slotIdx] = null;
    setMatchPool((p) => [...p, val]);
    setMatchSelected(newSel);
  };

  // ── Итог ──
  if (showResult) {
    const perfect = score === totalQ;
    return (
      <div className="flex-1 flex flex-col items-center justify-center px-4 py-6 animate-fade-in">
        <div className="max-w-md w-full sky-card rounded-3xl p-6 border border-sky-100 text-center shadow-xl">
          <img
            src={perfect ? mascotHappy : mascotPointer}
            alt="Маскот"
            className="w-32 mx-auto mb-3 animate-float"
            style={{ filter: "drop-shadow(0 4px 12px rgba(59,158,255,0.18))" }}
          />
          <div className="text-4xl mb-2">{perfect ? "🏆" : "📋"}</div>
          <h2 className="font-oswald text-2xl font-bold text-navy mb-1">
            {perfect ? "Отлично, курсант!" : "Тест завершён!"}
          </h2>
          <p className="text-muted-foreground font-golos text-sm mb-4">
            {perfect
              ? "Все ответы верны — вы отлично усвоили материал!"
              : `Правильно: ${score} из ${totalQ}. Повторите материал и станет ещё лучше!`}
          </p>

          {/* Счёт */}
          <div className="flex items-center justify-center gap-4 mb-5">
            <div className="sky-card rounded-2xl px-4 py-3 text-center border border-sky-100">
              <div className="font-oswald text-2xl font-bold" style={{ color: quiz.accent }}>
                {score}/{totalQ}
              </div>
              <div className="text-xs text-muted-foreground font-golos">ответов верно</div>
            </div>
            <div className="sky-card rounded-2xl px-4 py-3 text-center border border-yellow-200">
              <div className="font-oswald text-2xl font-bold text-gold">+{earnedXp} XP</div>
              <div className="text-xs text-muted-foreground font-golos">заработано</div>
            </div>
          </div>

          <button
            onClick={() => onFinish(earnedXp)}
            className="w-full py-3 rounded-2xl text-white font-oswald font-bold text-base btn-sky shadow-md"
            style={{ background: `linear-gradient(135deg, ${quiz.accent}, ${quiz.accent}bb)` }}
          >
            Продолжить лекцию →
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col px-4 pb-4 animate-fade-in">
      {/* Прогресс теста */}
      <div className="flex items-center gap-2 mb-3">
        <div className="flex gap-1 flex-1">
          {quiz.questions.map((_, i) => (
            <div
              key={i}
              className="flex-1 h-1.5 rounded-full transition-all duration-300"
              style={{
                background: i < qIndex
                  ? quiz.accent
                  : i === qIndex
                  ? `${quiz.accent}99`
                  : "#dde8f5",
              }}
            />
          ))}
        </div>
        <span className="text-xs text-muted-foreground font-golos whitespace-nowrap">
          {qIndex + 1} / {totalQ}
        </span>
      </div>

      {/* Заголовок теста */}
      <div className="flex items-center gap-2 mb-3 sky-card rounded-2xl px-4 py-2 border border-sky-100">
        <span className="text-lg">📝</span>
        <span className="font-oswald font-bold text-navy text-sm">Проверь себя — {quiz.chapterTitle}</span>
        <div
          className="ml-auto text-xs px-2 py-0.5 rounded-full text-white font-oswald font-semibold"
          style={{ background: quiz.accent }}
        >
          +{XP_PER_CORRECT} XP
        </div>
      </div>

      {/* Вопрос */}
      <div className="flex-1 flex flex-col sky-card rounded-3xl p-5 border border-sky-100 min-h-0 overflow-y-auto">
        <p className="font-oswald text-lg font-bold text-navy mb-4 leading-snug">{q.question}</p>

        {/* ── CHOICE ── */}
        {q.type === "choice" && (
          <div className="flex flex-col gap-2">
            {(q as ChoiceQuestion).options.map((opt, i) => {
              let style: React.CSSProperties = {
                background: "rgba(255,255,255,0.7)",
                border: "1.5px solid #d0e4ff",
                color: "#1a3560",
              };
              if (answered) {
                if (i === (q as ChoiceQuestion).correct) {
                  style = { background: "#e8fff5", border: "2px solid #00b87a", color: "#00b87a" };
                } else if (i === chosen && i !== (q as ChoiceQuestion).correct) {
                  style = { background: "#ffe8ec", border: "2px solid #e84a5f", color: "#e84a5f" };
                }
              } else if (chosen === i) {
                style = { background: `${quiz.accent}18`, border: `2px solid ${quiz.accent}`, color: quiz.accent };
              }
              return (
                <button
                  key={i}
                  onClick={() => !answered && setChosen(i)}
                  disabled={answered}
                  className="text-left rounded-2xl px-4 py-3 font-golos text-sm transition-all hover:scale-[1.01] disabled:cursor-default"
                  style={style}
                >
                  <span className="font-semibold mr-2">{["А", "Б", "В", "Г"][i]}.</span>
                  {opt}
                  {answered && i === (q as ChoiceQuestion).correct && (
                    <span className="ml-2">✓</span>
                  )}
                  {answered && i === chosen && i !== (q as ChoiceQuestion).correct && (
                    <span className="ml-2">✗</span>
                  )}
                </button>
              );
            })}
          </div>
        )}

        {/* ── INPUT ── */}
        {q.type === "input" && (
          <div className="flex flex-col gap-3">
            {(q as InputQuestion).hint && (
              <p className="text-xs text-muted-foreground font-golos">
                💡 {(q as InputQuestion).hint}
              </p>
            )}
            <input
              type="text"
              value={inputVal}
              onChange={(e) => !answered && setInputVal(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && canSubmit() && !answered && checkAnswer()}
              disabled={answered}
              placeholder="Введите ответ..."
              className="w-full rounded-2xl px-4 py-3 font-golos text-base outline-none transition-all"
              style={{
                background: answered
                  ? correct
                    ? "#e8fff5"
                    : "#ffe8ec"
                  : "rgba(255,255,255,0.85)",
                border: answered
                  ? correct
                    ? "2px solid #00b87a"
                    : "2px solid #e84a5f"
                  : `2px solid ${quiz.accent}44`,
                color: answered ? (correct ? "#00b87a" : "#e84a5f") : "#1a3560",
              }}
            />
            {answered && !correct && (
              <div className="rounded-xl px-4 py-2 font-golos text-sm" style={{ background: "#e8fff5", color: "#00b87a", border: "1.5px solid #00b87a44" }}>
                ✓ Правильный ответ: <strong>{(q as InputQuestion).correct}</strong>
              </div>
            )}
          </div>
        )}

        {/* ── MATCH ── */}
        {q.type === "match" && (
          <div className="flex flex-col gap-3">
            {/* Слоты сопоставления */}
            <div className="flex flex-col gap-2">
              {(q as MatchQuestion).pairs.map((pair, i) => {
                const isCorrectSlot = answered && matchSelected[i] === pair.label;
                const isWrongSlot = answered && matchSelected[i] !== null && matchSelected[i] !== pair.label;
                return (
                  <div key={i} className="flex items-center gap-2">
                    {/* Изображение/эмодзи */}
                    <div
                      className="flex-shrink-0 w-14 h-14 rounded-xl flex items-center justify-center overflow-hidden"
                      style={{ background: `${quiz.accent}14`, border: `1.5px solid ${quiz.accent}30` }}
                    >
                      {pair.image ? (
                        <img src={pair.image} alt={pair.label} className="w-full h-full object-cover rounded-xl" />
                      ) : (
                        <span className="text-2xl">{pair.imageEmoji ?? "❓"}</span>
                      )}
                    </div>

                    {/* Слот для ответа */}
                    <button
                      onClick={() => matchSelected[i] && handleMatchClear(i)}
                      disabled={answered}
                      className="flex-1 h-10 rounded-xl px-3 flex items-center justify-between text-sm font-golos transition-all"
                      style={{
                        background: matchSelected[i]
                          ? isCorrectSlot
                            ? "#e8fff5"
                            : isWrongSlot
                            ? "#ffe8ec"
                            : `${quiz.accent}14`
                          : "rgba(255,255,255,0.6)",
                        border: matchSelected[i]
                          ? isCorrectSlot
                            ? "2px solid #00b87a"
                            : isWrongSlot
                            ? "2px solid #e84a5f"
                            : `2px solid ${quiz.accent}50`
                          : "2px dashed #c0d8f0",
                        color: matchSelected[i]
                          ? isCorrectSlot ? "#00b87a" : isWrongSlot ? "#e84a5f" : quiz.accent
                          : "#aac0d8",
                      }}
                    >
                      <span>{matchSelected[i] ?? "Выберите из списка ↓"}</span>
                      {matchSelected[i] && !answered && (
                        <Icon name="X" size={12} />
                      )}
                      {isCorrectSlot && <span>✓</span>}
                      {isWrongSlot && <span>✗</span>}
                    </button>
                  </div>
                );
              })}
            </div>

            {/* Пул вариантов */}
            {(!answered || !correct) && (
              <div>
                <p className="text-xs text-muted-foreground font-golos mb-2">
                  {answered ? "Правильные ответы:" : "Варианты — нажми, чтобы поставить в слот:"}
                </p>
                <div className="flex flex-wrap gap-2">
                  {(answered
                    ? (q as MatchQuestion).pairs.map((p) => p.label)
                    : matchPool
                  ).map((label) => (
                    <button
                      key={label}
                      disabled={answered}
                      onClick={() => {
                        const emptySlot = matchSelected.indexOf(null);
                        if (emptySlot !== -1) handleMatchSelect(emptySlot, label);
                      }}
                      className="px-3 py-1.5 rounded-xl text-sm font-golos transition-all"
                      style={{
                        background: answered ? "#e8fff5" : `${quiz.accent}14`,
                        border: answered ? "1.5px solid #00b87a" : `1.5px solid ${quiz.accent}40`,
                        color: answered ? "#00b87a" : quiz.accent,
                      }}
                    >
                      {label}
                    </button>
                  ))}
                </div>
                {answered && !correct && (
                  <div className="mt-2 rounded-xl px-3 py-2 text-xs font-golos" style={{ background: "#ffe8ec", color: "#e84a5f", border: "1.5px solid #e84a5f44" }}>
                    Правильное сопоставление показано выше ↑
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* Результат ответа */}
        {answered && (
          <div
            className="mt-4 rounded-2xl px-4 py-3 flex items-center gap-3 font-golos text-sm animate-fade-in"
            style={{
              background: correct ? "#e8fff5" : "#ffe8ec",
              border: `1.5px solid ${correct ? "#00b87a" : "#e84a5f"}44`,
            }}
          >
            <span className="text-2xl">{correct ? "🎉" : "📖"}</span>
            <div>
              <div className="font-semibold" style={{ color: correct ? "#00b87a" : "#e84a5f" }}>
                {correct ? "Верно! Отличная работа!" : "Неверно, но не страшно"}
              </div>
              {correct && (
                <div style={{ color: "#00b87a" }}>+{XP_PER_CORRECT} XP заработано</div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Кнопки */}
      <div className="flex gap-3 mt-3 flex-shrink-0">
        {!answered ? (
          <button
            onClick={checkAnswer}
            disabled={!canSubmit()}
            className="flex-1 py-3 rounded-2xl text-white font-oswald font-bold text-sm btn-sky shadow-md disabled:opacity-40 disabled:cursor-not-allowed"
            style={{ background: canSubmit() ? `linear-gradient(135deg, ${quiz.accent}, ${quiz.accent}cc)` : "#c0d0e0" }}
          >
            Ответить
          </button>
        ) : (
          <button
            onClick={nextQuestion}
            className="flex-1 py-3 rounded-2xl text-white font-oswald font-bold text-sm btn-sky shadow-md flex items-center justify-center gap-2"
            style={{ background: `linear-gradient(135deg, ${quiz.accent}, ${quiz.accent}cc)` }}
          >
            {qIndex + 1 < totalQ ? "Следующий вопрос" : "Завершить тест"}
            <Icon name="ChevronRight" size={16} />
          </button>
        )}
      </div>
    </div>
  );
}
