import { useState } from "react";
import {
  calculateExpression,
  formatResult,
} from "@/utils/calculator";

export default function useCalculator() {
  const [expression, setExpression] = useState("");
  const [result, setResult] = useState("0");
  const [error, setError] = useState<string | null>(null);
  const [lastResult, setLastResult] = useState<number | null>(null);
  const [isCalculated, setIsCalculated] = useState(false);

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
      try {
        const calculatedResult = calculateExpression(expression);

        setResult(formatResult(calculatedResult));
        setLastResult(calculatedResult);
        setError(null);
        setIsCalculated(true);
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

  return {
    expression,
    result,
    error,
    handleInput,
  };
}