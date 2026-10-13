import { useEffect, useState } from "react";
import type { HistoryItem } from "@/types/calculator";
import {
  calculateExpression,
  formatResult,
} from "@/utils/calculator";
import { loadHistory, saveHistory } from "@/types/storage";

export default function useCalculator() {
  const [expression, setExpression] = useState("");
  const [result, setResult] = useState("0");
  const [error, setError] = useState<string | null>(null);
  const [lastResult, setLastResult] = useState<number | null>(null);
  const [isCalculated, setIsCalculated] = useState(false);

  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [isHistoryLoaded, setIsHistoryLoaded] = useState(false);

  useEffect(() => {
    let active = true;

    async function restoreHistory() {
      const storedHistory = await Promise.resolve().then(loadHistory);

      if (!active) {
        return;
      }

      setHistory(storedHistory);
      setIsHistoryLoaded(true);
    }

    void restoreHistory();

    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    if (isHistoryLoaded) {
      saveHistory(history);
    }
  }, [history, isHistoryLoaded]);

  function handleInput(value: string): void {
    if (value === "clear") {
      setExpression("");
      setResult("0");
      setError(null);
      setLastResult(null);
      setIsCalculated(false);
      return;
    }

    if (value === "delete") {
      setExpression((previous) =>
        previous.endsWith("sqrt(")
          ? previous.slice(0, -5)
          : previous.slice(0, -1),
      );

      setError(null);
      setIsCalculated(false);
      return;
    }

    if (value === "calculate") {
      // Не добавляем повторную запись при повторном нажатии "=".
      if (isCalculated) {
        return;
      }

      try {
        const calculatedResult = calculateExpression(expression);
        const formattedResult = formatResult(calculatedResult);

        setResult(formattedResult);
        setLastResult(calculatedResult);
        setError(null);
        setIsCalculated(true);

        const item: HistoryItem = {
          id: crypto.randomUUID(),
          expression,
          result: formattedResult,
          createdAt: Date.now(),
        };

        setHistory((previous) => [item, ...previous].slice(0, 10));
      } catch (caughtError) {
        setError(
          caughtError instanceof Error
            ? caughtError.message
            : "Calculation failed. Check the expression.",
        );

        setIsCalculated(false);
      }

      return;
    }

    setError(null);

    if (isCalculated && lastResult !== null) {
      const continuesCalculation = [
        "+",
        "-",
        "*",
        "/",
        "^",
        "%",
      ].includes(value);

      setExpression(
        continuesCalculation
          ? `(${String(lastResult)})${value}`
          : value,
      );

      if (!continuesCalculation) {
        setResult("0");
      }

      setIsCalculated(false);
      return;
    }

    setExpression((previous) => previous + value);
  }

  function restoreExpression(item: HistoryItem): void {
    setExpression(item.expression);
    setResult(item.result);
    setError(null);
    setLastResult(null);
    setIsCalculated(false);
  }

  function clearHistory(): void {
    setHistory([]);
  }

  return {
    expression,
    result,
    error,
    history,
    isHistoryLoaded,
    handleInput,
    restoreExpression,
    clearHistory,
  };
}