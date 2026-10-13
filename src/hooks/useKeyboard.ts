import { useEffect } from "react";

interface UseKeyboardOptions {
  onInput: (value: string) => void;
  enabled?: boolean;
}

export default function useKeyboard({
  onInput,
  enabled = true,
}: UseKeyboardOptions): void {
  useEffect(() => {
    if (!enabled) {
      return;
    }

    function handleKeyDown(event: KeyboardEvent): void {
      if (
        event.defaultPrevented ||
        event.isComposing ||
        event.ctrlKey ||
        event.metaKey ||
        event.altKey
      ) {
        return;
      }

      const target = event.target;

      if (
        target instanceof HTMLElement &&
        (target.closest("input, textarea, select") ||
          target.isContentEditable ||
          target.closest('[role="textbox"]'))
      ) {
        return;
      }

      if (
        event.key === "Enter" &&
        target instanceof HTMLElement &&
        target.closest("button, a, [role='button'], [role='link']")
      ) {
        return;
      }

      const value =
        event.key === "Enter" || event.key === "="
          ? "calculate"
          : event.key === "Backspace"
            ? "delete"
            : event.key === "Escape"
              ? "clear"
              : event.key === ","
                ? "."
                : /^[0-9.+\-*/^%()]$/.test(event.key)
                  ? event.key
                  : null;

      if (value === null) {
        return;
      }

      if (value === "calculate" && event.repeat) {
        event.preventDefault();
        return;
      }

      event.preventDefault();
      onInput(value);
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onInput, enabled]);
}