"use client";

import { useState } from "react";
import type { CalculatorMode } from "@/types/calculator";
import useCalculator from "@/hooks/useCalculator";
import useKeyboard from "@/hooks/useKeyboard";
import Display from "../Display/Display";
import Keypad from "../Keypad/Keypad";
import ModeSwitch from "../ModeSwitch/ModeSwitch";
import History from "../History/History";
import styles from "./Calculator.module.scss";

export default function Calculator() {
  const [mode, setMode] = useState<CalculatorMode>("scientific");

  const {
    expression,
    result,
    error,
    history,
    isHistoryLoaded,
    handleInput,
    restoreExpression,
    clearHistory,
  } = useCalculator();

  useKeyboard({
    onInput: handleInput,
    enabled: isHistoryLoaded,
  });

  return (
    <div className={styles.wrapper}>
      <section
        className={styles.calculator}
        aria-labelledby="calculator-title"
      >
        <header className={styles.header}>
          <h1 id="calculator-title">Scientific Calculator</h1>
          <p>Precision in every calculation</p>
        </header>

        <ModeSwitch mode={mode} onModeChange={setMode} />

        <Display
          expression={expression}
          result={result}
          error={error}
        />

        <Keypad
          scientific={mode === "scientific"}
          onInput={handleInput}
        />

        <p className={styles.keyboardHint}>
          Enter = calculate · Esc = clear · Backspace = delete
        </p>
      </section>

      <History
        items={history}
        isLoaded={isHistoryLoaded}
        onSelect={restoreExpression}
        onClear={clearHistory}
      />
    </div>
  );
}