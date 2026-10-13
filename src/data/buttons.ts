import type { CalculatorButton } from "@/types/calculator";
import {
  faPlus,
  faMinus,
  faXmark,
  faDivide,
  faPercent,
  faDeleteLeft,
  faEquals,
  faSquareRootVariable,
} from "@fortawesome/free-solid-svg-icons";

export const scientificButtons: CalculatorButton[] = [
  {
    id: "open-parenthesis",
    label: "(",
    value: "(",
    ariaLabel: "Open parenthesis",
    variant: "utility",
  },
  {
    id: "close-parenthesis",
    label: ")",
    value: ")",
    ariaLabel: "Close parenthesis",
    variant: "utility",
  },
  {
    id: "square-root",
    label: "√",
    value: "sqrt(",
    ariaLabel: "Square root",
    variant: "operator",
    icon: faSquareRootVariable,
  },
  {
    id: "power",
    label: "xʸ",
    value: "^",
    ariaLabel: "Raise to a power",
    variant: "operator",
  },
];

export const basicButtons: CalculatorButton[] = [
  {
    id: "clear",
    label: "AC",
    value: "clear",
    ariaLabel: "Clear all",
    variant: "utility",
  },
  {
    id: "delete",
    label: "⌫",
    value: "delete",
    ariaLabel: "Delete last character",
    variant: "utility",
    icon: faDeleteLeft,
  },
  {
    id: "percent",
    label: "%",
    value: "%",
    ariaLabel: "Percent",
    variant: "operator",
    icon: faPercent,
  },
  {
    id: "divide",
    label: "÷",
    value: "/",
    ariaLabel: "Divide",
    variant: "operator",
    icon: faDivide,
  },

  ...["7", "8", "9"].map(
    (digit): CalculatorButton => ({
      id: `digit-${digit}`,
      label: digit,
      value: digit,
      ariaLabel: digit,
      variant: "number",
    }),
  ),

  {
    id: "multiply",
    label: "×",
    value: "*",
    ariaLabel: "Multiply",
    variant: "operator",
    icon: faXmark,
  },

  ...["4", "5", "6"].map(
    (digit): CalculatorButton => ({
      id: `digit-${digit}`,
      label: digit,
      value: digit,
      ariaLabel: digit,
      variant: "number",
    }),
  ),

  {
    id: "subtract",
    label: "−",
    value: "-",
    ariaLabel: "Subtract",
    variant: "operator",
    icon: faMinus,
  },

  ...["1", "2", "3"].map(
    (digit): CalculatorButton => ({
      id: `digit-${digit}`,
      label: digit,
      value: digit,
      ariaLabel: digit,
      variant: "number",
    }),
  ),

  {
    id: "add",
    label: "+",
    value: "+",
    ariaLabel: "Add",
    variant: "operator",
    icon: faPlus,
  },
  {
    id: "digit-0",
    label: "0",
    value: "0",
    ariaLabel: "0",
    variant: "number",
    wide: true,
  },
  {
    id: "decimal",
    label: ".",
    value: ".",
    ariaLabel: "Decimal point",
    variant: "number",
  },
  {
    id: "equals",
    label: "=",
    value: "calculate",
    ariaLabel: "Calculate",
    variant: "equals",
    icon: faEquals,
  },
];