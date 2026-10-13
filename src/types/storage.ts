import type { HistoryItem } from "@/types/calculator";

const HISTORY_KEY = "scientific-calculator-history";
const HISTORY_LIMIT = 10;

function isHistoryItem(value: unknown): value is HistoryItem {
  if (typeof value !== "object" || value === null) {
    return false;
  }

  const item = value as Record<string, unknown>;

  return (
    typeof item.id === "string" &&
    item.id.length > 0 &&
    typeof item.expression === "string" &&
    item.expression.length > 0 &&
    item.expression.length <= 500 &&
    typeof item.result === "string" &&
    item.result.length > 0 &&
    Number.isFinite(Number(item.result)) &&
    typeof item.createdAt === "number" &&
    Number.isFinite(item.createdAt) &&
    item.createdAt >= 0 &&
    item.createdAt <= 8.64e15
  );
}

export function loadHistory(): HistoryItem[] {
  try {
    const stored = localStorage.getItem(HISTORY_KEY);

    if (!stored) {
      return [];
    }

    const parsed: unknown = JSON.parse(stored);

    if (!Array.isArray(parsed)) {
      return [];
    }

    const validItems = parsed.filter(isHistoryItem);

    return validItems
      .filter(
        (item, index, items) =>
          items.findIndex((entry) => entry.id === item.id) === index,
      )
      .slice(0, HISTORY_LIMIT);
  } catch {
    return [];
  }
}

export function saveHistory(history: HistoryItem[]): void {
  try {
    localStorage.setItem(
      HISTORY_KEY,
      JSON.stringify(history.slice(0, HISTORY_LIMIT)),
    );
  } catch {
    NaN
  }
}