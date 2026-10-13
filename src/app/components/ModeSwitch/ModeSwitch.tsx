import type { CalculatorMode } from "@/types/calculator";
import styles from "./ModeSwitch.module.scss";

interface ModeSwitchProps {
  mode: CalculatorMode;
  onModeChange: (mode: CalculatorMode) => void;
}

export default function ModeSwitch({
  mode,
  onModeChange,
}: ModeSwitchProps) {
  return (
    <div
      className={styles.switch}
      role="group"
      aria-label="Calculator mode"
    >
      <button
        type="button"
        aria-pressed={mode === "basic"}
        className={`${styles.button} ${
          mode === "basic" ? styles.active : ""
        }`}
        onClick={() => onModeChange("basic")}
      >
        Basic
      </button>

      <button
        type="button"
        aria-pressed={mode === "scientific"}
        className={`${styles.button} ${
          mode === "scientific" ? styles.active : ""
        }`}
        onClick={() => onModeChange("scientific")}
      >
        Scientific
      </button>
    </div>
  );
}