"use client";

import { useState } from "react";
import type { CalculatorMode } from "@/types/calculator";
import useCalculator from "@/hooks/useCalculator";

import styles from "./Calculator.module.scss";
import ModeSwitch from "../ModeSwitch/ModeSwitch";
import Display from "../Display/Display";
import Keypad from "../Keypad/Keypad";

export default function Calculator() {
  const [mode, setMode] = useState<CalculatorMode>("scientific");

  const {
    expression,
    result,
    error,
    handleInput,
  } = useCalculator();

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
      </section>

      <section
        className={styles.history}
        aria-labelledby="history-title"
      >
        <header className={styles.historyHeader}>
          <div>
            <h2 id="history-title">Calculation history</h2>
            <p>Last 10 calculations</p>
          </div>
        </header>

        <p className={styles.emptyHistory}>No calculations yet</p>
      </section>
    </div>
  );
}