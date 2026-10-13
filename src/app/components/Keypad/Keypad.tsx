import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./Keypad.module.scss";
import {scientificButtons, basicButtons} from '@/data/buttons'

interface KeypadProps {
  scientific?: boolean;
}

export default function Keypad({ scientific = true }: KeypadProps) {
  const buttons = scientific
    ? [...scientificButtons, ...basicButtons]
    : basicButtons;

  return (
    <div
      className={styles.keypad}
      role="group"
      aria-label="Клавиши калькулятора"
    >
      {buttons.map((button) => (
        <button
          key={button.id}
          type="button"
          aria-label={button.ariaLabel}
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