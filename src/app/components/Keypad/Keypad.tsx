import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { basicButtons, scientificButtons } from "@/data/buttons";
import styles from "./Keypad.module.scss";

interface KeypadProps {
  scientific?: boolean;
  onInput: (value: string) => void;
}

export default function Keypad({
  scientific = true,
  onInput,
}: KeypadProps) {
  const buttons = scientific
    ? [...scientificButtons, ...basicButtons]
    : basicButtons;

  return (
    <div
      className={styles.keypad}
      role="group"
      aria-label="Calculator keys"
    >
      {buttons.map((button) => (
        <button
          key={button.id}
          type="button"
          aria-label={button.ariaLabel}
          onClick={() => onInput(button.value)}
          className={[
            styles.button,
            styles[button.variant],
            button.wide ? styles.wide : "",
          ]
            .filter(Boolean)
            .join(" ")}
        >
          {button.icon ? (
            <FontAwesomeIcon
              icon={button.icon}
              className={styles.icon}
              aria-hidden="true"
            />
          ) : (
            button.label
          )}
        </button>
      ))}
    </div>
  );
}