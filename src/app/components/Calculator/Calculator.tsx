import Keypad from "../Keypad/Keypad";
import styles from "./Calculator.module.scss";

export default function Calculator() {
  return (
    <div className={styles.wrapper}>
      <section className={styles.calculator} aria-labelledby="calculator-title">
        <header className={styles.header}>
          <h1 id="calculator-title">Scientific Calculator</h1>
          <p>Precision in every calculation</p>
        </header>

        <div className={styles.display}>
          <p className={styles.expression}>(12 + 8) × 3</p>
          <output className={styles.result}>60</output>
        </div>

        <div className={styles.placeholder}>
            <Keypad/>
        </div>
      </section>

      <section className={styles.history} aria-labelledby="history-title">
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