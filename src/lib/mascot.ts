/**
 * Библиотека изображений маскота-инструктора.
 * Пополняй раздел IMAGES новыми записями по мере загрузки.
 * Теги описывают ситуацию/настроение — используй их при выборе изображения.
 */

export interface MascotImage {
  url: string;
  tags: string[];
  description: string;
}

export const MASCOT_IMAGES: MascotImage[] = [
  // ── Batch 1 ──────────────────────────────────────────────────────
  {
    url: "https://cdn.poehali.dev/projects/25d547e9-32e8-4987-8f1a-a0b8997cbc86/bucket/ca9511f9-e02a-44ec-9c95-53b6de266613.png",
    tags: ["pointer", "teaching", "confident", "lecture", "explain"],
    description: "Указывает указкой, уверенная улыбка — основной вид для лекций",
  },
  {
    url: "https://cdn.poehali.dev/projects/25d547e9-32e8-4987-8f1a-a0b8997cbc86/bucket/d7bbf285-36d7-43f9-8d95-6f18e075eaef.png",
    tags: ["glasses", "idea", "hint", "tip", "happy", "explain"],
    description: "В очках, поднятый палец — подсказка, интересный факт, идея",
  },
  {
    url: "https://cdn.poehali.dev/projects/25d547e9-32e8-4987-8f1a-a0b8997cbc86/bucket/60409dfb-6442-4611-90e8-41d3b5974181.png",
    tags: ["back", "pointer", "side", "mysterious", "transition"],
    description: "Вид сзади/сбоку с указкой — переход, интрига, смена темы",
  },
  {
    url: "https://cdn.poehali.dev/projects/25d547e9-32e8-4987-8f1a-a0b8997cbc86/bucket/b21e2a45-969c-45a1-a565-8f96991be7c6.png",
    tags: ["stop", "warning", "wrong", "error", "strict", "no"],
    description: "Держит знак «стоп», строгий взгляд — запрет, ошибка, предупреждение",
  },
  {
    url: "https://cdn.poehali.dev/projects/25d547e9-32e8-4987-8f1a-a0b8997cbc86/bucket/1ef00ded-4cbc-4d9b-8fe0-f004227e22d6.png",
    tags: ["no", "cross", "deny", "wrong_answer", "strict"],
    description: "Руки крест-накрест — неверный ответ, категорическое нет",
  },

  // ── Batch 2 — добавь сюда следующие 5 изображений ────────────────
  // { url: "...", tags: [...], description: "..." },
];

/**
 * Получить URL маскота по тегу.
 * Возвращает первое совпадение, или первое изображение как fallback.
 */
export function getMascot(tag: string): string {
  const found = MASCOT_IMAGES.find((m) => m.tags.includes(tag));
  return found?.url ?? MASCOT_IMAGES[0]?.url ?? "";
}

/**
 * Получить все URL маскотов по тегу.
 */
export function getMascots(tag: string): string[] {
  return MASCOT_IMAGES.filter((m) => m.tags.includes(tag)).map((m) => m.url);
}

// Удобные константы для частых ситуаций
export const MASCOT = {
  pointer:    getMascot("pointer"),    // указывает указкой
  idea:       getMascot("idea"),       // в очках, палец вверх
  side:       getMascot("side"),       // вид сбоку/сзади
  stop:       getMascot("stop"),       // знак стоп
  no:         getMascot("cross"),      // руки крестом
};
