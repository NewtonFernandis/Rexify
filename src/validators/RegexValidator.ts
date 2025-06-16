import { IValidator } from "../interfaces/IValidator";

export class RegexValidator implements IValidator {
  private errors: string[] = [];

  validate(pattern: string): boolean {
    this.errors = [];

    try {
      new RegExp(pattern);
      return this.validateSyntax(pattern);
    } catch (error: any) {
      this.errors.push(`Invalid regex syntax: ${error.message}`);
      return false;
    }
  }

  getErrors(): string[] {
    return [...this.errors];
  }

  private validateSyntax(pattern: string): boolean {
    const issues: string[] = [];

    // Check for unmatched parentheses
    if (!this.checkBalancedParentheses(pattern)) {
      issues.push("Unmatched parentheses detected");
    }

    // Check for unmatched brackets
    if (!this.checkBalancedBrackets(pattern)) {
      issues.push("Unmatched square brackets detected");
    }

    // Check for potential catastrophic backtracking
    if (this.checkCatastrophicBacktracking(pattern)) {
      issues.push("Potential catastrophic backtracking detected");
    }

    this.errors.push(...issues);
    return issues.length === 0;
  }

  private checkBalancedParentheses(pattern: string): boolean {
    let count = 0;
    let escaped = false;

    for (const char of pattern) {
      if (escaped) {
        escaped = false;
        continue;
      }

      if (char === "\\") {
        escaped = true;
        continue;
      }

      if (char === "(") count++;
      if (char === ")") count--;
      if (count < 0) return false;
    }

    return count === 0;
  }

  private checkBalancedBrackets(pattern: string): boolean {
    let inCharClass = false;
    let escaped = false;

    for (const char of pattern) {
      if (escaped) {
        escaped = false;
        continue;
      }

      if (char === "\\") {
        escaped = true;
        continue;
      }

      if (char === "[" && !inCharClass) {
        inCharClass = true;
      } else if (char === "]" && inCharClass) {
        inCharClass = false;
      }
    }

    return !inCharClass;
  }

  private checkCatastrophicBacktracking(pattern: string): boolean {
    // Simplified check for nested quantifiers
    return /(\*|\+|\{[^}]*\}).*(\*|\+|\{[^}]*\})/.test(pattern);
  }
}
