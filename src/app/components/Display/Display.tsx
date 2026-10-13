import styles from "./Display.module.scss";

interface DisplayProps {
  expression: string;
  result: string;
  error: string | null;
}

export default function Display({
  expression,
  result,
  error,
}: DisplayProps) {
  const formattedExpression = expression
    .replaceAll("sqrt(", "√(")
    .replaceAll("*", "×")
    .replaceAll("/", "÷")
    .replaceAll("-", "−");

  return (
    <div className={styles.display}>
      <p className={styles.expression} aria-label="Expression">
        {formattedExpression || "0"}
      </p>

      <output
        className={styles.result}
        aria-label="Result"
        aria-live="polite"
        aria-atomic="true"
      >
        {error ? "Error" : result}
      </output>

      <p
        className={styles.error}
        aria-live="polite"
        aria-atomic="true"
      >
        {error}
      </p>
    </div>
  );
}