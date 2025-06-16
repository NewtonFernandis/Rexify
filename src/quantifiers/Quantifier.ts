import { IQuantifier } from "../interfaces/IQuantifier";

export class Quantifier implements IQuantifier {
  constructor(private quantifierString: string) {}

  apply(pattern: string): string {
    return pattern + this.quantifierString;
  }

  static optional(): Quantifier {
    return new Quantifier("?");
  }

  static oneOrMore(): Quantifier {
    return new Quantifier("+");
  }

  static zeroOrMore(): Quantifier {
    return new Quantifier("*");
  }

  static exactly(n: number): Quantifier {
    return new Quantifier(`{${n}}`);
  }

  static between(min: number, max: number): Quantifier {
    return new Quantifier(`{${min},${max}}`);
  }

  static atLeast(n: number): Quantifier {
    return new Quantifier(`{${n},}`);
  }
}
