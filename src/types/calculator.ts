import type { IconDefinition } from "@fortawesome/fontawesome-svg-core";

export interface CalculatorButton {
  id: string;
  label: string;
  value: string;
  ariaLabel: string;
  variant: "number" | "operator" | "utility" | "equals";
  wide?: boolean;
  icon?: IconDefinition;
}

export type CalculatorMode = "basic" | "scientific";

export interface HistoryItem {
  id: string;
  expression: string;
  result: string;
  createdAt: number;
}