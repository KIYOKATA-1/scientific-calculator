import type { HistoryItem } from "@/types/calculator";
import styles from "./History.module.scss";

interface HistoryProps {
  items: HistoryItem[];
  isLoaded: boolean;
  onSelect: (item: HistoryItem) => void;
  onClear: () => void;
}

const dateFormatter = new Intl.DateTimeFormat("en", {
  month: "short",
  day: "numeric",
  hour: "2-digit",
  minute: "2-digit",
});

function formatExpression(expression: string): string {
  return expression
    .replaceAll("sqrt(", "√(")
    .replaceAll("*", "×")
    .replaceAll("/", "÷")
    .replaceAll("-", "−");
}

export default function History({
  items,
  isLoaded,
  onSelect,
  onClear,
}: HistoryProps) {
  function handleClear(): void {
    const confirmed = window.confirm(
      "Clear all calculation history? This cannot be undone.",
    );

    if (confirmed) {
      onClear();
    }
  }

  return (
    <section
      className={styles.history}
      aria-labelledby="history-title"
    >
      <header className={styles.header}>
        <div className={styles.heading}>
          <h2 id="history-title">Calculation History</h2>
          <p>Last 10 calculations</p>
        </div>

        <button
          type="button"
          className={styles.clearButton}
          onClick={handleClear}
          disabled={!isLoaded || items.length === 0}
        >
          Clear History
        </button>
      </header>

      {!isLoaded ? (
        <p className={styles.empty} role="status">
          Loading history…
        </p>
      ) : items.length > 0 ? (
        <ul className={styles.list}>
          {items.map((item) => (
            <li key={item.id}>
              <button
                type="button"
                className={styles.card}
                onClick={() => onSelect(item)}
                aria-label={`Reuse expression ${formatExpression(
                  item.expression,
                )}`}
              >
                <span className={styles.expression}>
                  {formatExpression(item.expression)}
                </span>

                <span className={styles.result}>
                  = {item.result}
                </span>

                <time
                  className={styles.time}
                  dateTime={new Date(item.createdAt).toISOString()}
                >
                  {dateFormatter.format(item.createdAt)}
                </time>
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p className={styles.empty}>
          No calculations yet
        </p>
      )}

      <span className={styles.srOnly} role="status" aria-atomic="true">
        {isLoaded ? `${items.length} saved calculations` : ""}
      </span>
    </section>
  );
}