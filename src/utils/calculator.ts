class ExpressionParser {
  private position = 0;

  constructor(private readonly expression: string) {}

  parse(): number {
    const result = this.parseSum();

    this.skipSpaces();

    if (this.position < this.expression.length) {
      throw new Error(
        "Invalid expression. Check the operators and parentheses.",
      );
    }

    return this.checkResult(result);
  }

  private parseSum(): number {
    let result = this.parseProduct();

    while (true) {
      const operator = this.consume("+")
        ? "+"
        : this.consume("-")
          ? "-"
          : null;

      if (operator === null) {
        return result;
      }

      const operand = this.parseProduct();

      result = this.checkResult(
        operator === "+" ? result + operand : result - operand,
      );
    }
  }

  private parseProduct(): number {
    let result = this.parseUnary();

    while (true) {
      const operator = this.consume("*")
        ? "*"
        : this.consume("/")
          ? "/"
          : null;

      if (operator === null) {
        return result;
      }

      const operand = this.parseUnary();

      if (operator === "/" && operand === 0) {
        throw new Error(
          "Cannot divide by zero. Change the divisor.",
        );
      }

      result = this.checkResult(
        operator === "*" ? result * operand : result / operand,
      );
    }
  }

  private parseUnary(): number {
    const sign = this.consume("+")
      ? "+"
      : this.consume("-")
        ? "-"
        : null;

    if (sign === null) {
      return this.parsePower();
    }

    const operand = this.parseUnary();

    return sign === "-" ? -operand : operand;
  }

  private parsePower(): number {
    const base = this.parsePercent();

    return this.consume("^")
      ? this.checkResult(base ** this.parseUnary())
      : base;
  }

  private parsePercent(): number {
    let result = this.parsePrimary();

    while (this.consume("%")) {
      result /= 100;
    }

    return result;
  }

  private parsePrimary(): number {
    if (this.consume("sqrt")) {
      this.expect("(");

      const value = this.parseSum();

      this.expect(")");

      if (value < 0) {
        throw new Error(
          "Cannot take the square root of a negative number. Change the value.",
        );
      }

      return Math.sqrt(value);
    }

    if (this.consume("(")) {
      const value = this.parseSum();

      this.expect(")");

      return value;
    }

    return this.parseNumber();
  }

  private parseNumber(): number {
    this.skipSpaces();

    const remaining = this.expression.slice(this.position);

    const match = remaining.match(
      /^(?:\d+(?:\.\d*)?|\.\d+)(?:[eE][+-]?\d+)?/,
    );

    if (!match) {
      throw new Error(
        "Expected a number. Check the expression near the operator.",
      );
    }

    this.position += match[0].length;

    return this.checkResult(Number(match[0]));
  }

  private consume(value: string): boolean {
    this.skipSpaces();

    if (!this.expression.startsWith(value, this.position)) {
      return false;
    }

    this.position += value.length;

    return true;
  }

  private expect(value: string): void {
    if (!this.consume(value)) {
      throw new Error(
        `Missing "${value}". Check the parentheses.`,
      );
    }
  }

  private skipSpaces(): void {
    while (
      this.position < this.expression.length &&
      /\s/.test(this.expression[this.position])
    ) {
      this.position += 1;
    }
  }

  private checkResult(value: number): number {
    if (!Number.isFinite(value)) {
      throw new Error(
        "Result is outside the supported real-number range. Change the expression.",
      );
    }

    return value;
  }
}

export function calculateExpression(expression: string): number {
  const normalized = expression
    .replaceAll("×", "*")
    .replaceAll("÷", "/")
    .replaceAll("−", "-")
    .replaceAll("√", "sqrt")
    .trim();

  if (!normalized) {
    throw new Error("Enter an expression before calculating.");
  }

  if (normalized.length > 500) {
    throw new Error(
      "Expression is too long. Use up to 500 characters.",
    );
  }

  return new ExpressionParser(normalized).parse();
}

export function formatResult(value: number): string {
  const rounded = Number(value.toPrecision(12));

  return Number.isFinite(rounded)
    ? String(rounded)
    : String(value);
}