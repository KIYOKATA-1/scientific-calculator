import { describe, expect, it } from "vitest";
import {
  calculateExpression,
  formatResult,
} from "./calculator";

describe("calculateExpression", () => {
  describe("арифметика и приоритет операций", () => {
    it.each([
      ["2 + 3", 5],
      ["10 - 4", 6],
      ["6 * 7", 42],
      ["20 / 4", 5],
      ["2 + 3 * 4", 14],
      ["20 / 4 * 2", 10],
      ["10 - 3 - 2", 5],
      ["0", 0],
    ])("%s = %s", (expression, expected) => {
      expect(calculateExpression(expression)).toBe(expected);
    });
  });

  describe("скобки", () => {
    it.each([
      ["(2 + 3) * 4", 20],
      ["2 * (3 + 4)", 14],
      ["((2 + 3) * (4 - 1))", 15],
      ["(12 + 8) * 3", 60],
    ])("%s = %s", (expression, expected) => {
      expect(calculateExpression(expression)).toBe(expected);
    });
  });

  describe("отрицательные числа", () => {
    it.each([
      ["-5 + 2", -3],
      ["2 * -3", -6],
      ["-(-5)", 5],
      ["+5", 5],
      ["-2 ^ 2", -4],
      ["(-2) ^ 2", 4],
    ])("%s = %s", (expression, expected) => {
      expect(calculateExpression(expression)).toBe(expected);
    });
  });

  describe("степени", () => {
    it.each([
      ["2 ^ 3", 8],
      ["2 ^ 3 ^ 2", 512],
      ["2 ^ -2", 0.25],
      ["9 ^ 0.5", 3],
      ["5 ^ 0", 1],
    ])("%s = %s", (expression, expected) => {
      expect(calculateExpression(expression)).toBeCloseTo(expected);
    });
  });

  describe("корни", () => {
    it.each([
      ["sqrt(81)", 9],
      ["sqrt(0)", 0],
      ["sqrt(9 + 16)", 5],
      ["sqrt(sqrt(16))", 2],
      ["√(81)", 9],
    ])("%s = %s", (expression, expected) => {
      expect(calculateExpression(expression)).toBe(expected);
    });
  });

  describe("проценты", () => {
    it.each([
      ["25%", 0.25],
      ["200 * 10%", 20],
      ["(20 + 30)%", 0.5],
      ["100 + 10%", 100.1],
    ])("%s = %s", (expression, expected) => {
      expect(calculateExpression(expression)).toBeCloseTo(expected);
    });
  });

  describe("форматы ввода", () => {
    it.each([
      [" 2 + 3 ", 5],
      [".5 + .25", 0.75],
      ["1.5 * 2", 3],
      ["1e3 + 2", 1002],
      ["2 × 3", 6],
      ["8 ÷ 2", 4],
      ["5 − 2", 3],
    ])("%s = %s", (expression, expected) => {
      expect(calculateExpression(expression)).toBeCloseTo(expected);
    });
  });

  describe("ошибки", () => {
    it.each([
      "",
      "   ",
      "2 +",
      "(2 + 3",
      "2 + 3)",
      "2..3",
      "2 3",
      "2 * / 3",
      "abc",
      "sqrt()",
      "2(3 + 4)",
    ])("отклоняет некорректный ввод: %s", (expression) => {
      expect(() => calculateExpression(expression)).toThrow();
    });

    it("отклоняет деление на ноль", () => {
      expect(() => calculateExpression("10 / 0")).toThrow(
        /divide by zero/i,
      );
    });

    it("отклоняет деление на вычисленный ноль", () => {
      expect(() => calculateExpression("10 / (3 - 3)")).toThrow(
        /divide by zero/i,
      );
    });

    it("отклоняет корень из отрицательного числа", () => {
      expect(() => calculateExpression("sqrt(-1)")).toThrow(
        /negative number/i,
      );
    });

    it("отклоняет переполнение результата", () => {
      expect(() => calculateExpression("10 ^ 1000")).toThrow(
        /supported real-number range/i,
      );
    });

    it("отклоняет результат вне действительных чисел", () => {
      expect(() => calculateExpression("(-1) ^ 0.5")).toThrow();
    });

    it("ограничивает длину выражения", () => {
      expect(() => calculateExpression("1".repeat(501))).toThrow(
        /too long/i,
      );
    });
  });
});

describe("formatResult", () => {
  it("убирает погрешность отображения десятичных чисел", () => {
    const value = calculateExpression("0.1 + 0.2");

    expect(formatResult(value)).toBe("0.3");
  });

  it("форматирует целое число", () => {
    expect(formatResult(42)).toBe("42");
  });

  it("форматирует отрицательное число", () => {
    expect(formatResult(-3.5)).toBe("-3.5");
  });

  it("форматирует предельно большое число без переполнения", () => {
    const formatted = formatResult(Number.MAX_VALUE);
    const numeric = Number(formatted);

    expect(formatted).toBe("1.79769313486e+308");
    expect(Number.isFinite(numeric)).toBe(true);
    expect(numeric / Number.MAX_VALUE).toBeCloseTo(1, 10);
  });
});