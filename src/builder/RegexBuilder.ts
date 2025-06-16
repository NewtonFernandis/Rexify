import { IRegexBuilder } from "../interfaces/IRegexBuilder";
import { IRegexComponent } from "../interfaces/IRegexComponent";
import { ComponentFactory } from "../factories/ComponentFactory";
import { CharacterClasses } from "../enums/CharacterClasses";
import { RegexFlags } from "../enums/RegexFlags";
import { Quantifier } from "../quantifiers/Quantifier";
import { RegexValidator } from "../validators/RegexValidator";
import { CommonPatterns } from "../patterns/CommonPatterns";

export class RegexBuilder implements IRegexBuilder {
  private components: IRegexComponent[] = [];
  private flags: Set<RegexFlags> = new Set();
  private validator: RegexValidator = new RegexValidator();

  constructor() {}

  // Factory method
  static create(): RegexBuilder {
    return new RegexBuilder();
  }

  // Basic text matching
  text(value: string): RegexBuilder {
    this.components.push(ComponentFactory.createText(value));
    return this;
  }

  // Character classes
  digit(): RegexBuilder {
    this.components.push(
      ComponentFactory.createCharacterClass(CharacterClasses.DIGIT),
    );
    return this;
  }

  digits(): RegexBuilder {
    const digitComponent = ComponentFactory.createCharacterClass(
      CharacterClasses.DIGIT,
    );
    this.components.push(
      ComponentFactory.createQuantified(digitComponent, Quantifier.oneOrMore()),
    );
    return this;
  }

  letter(): RegexBuilder {
    this.components.push(ComponentFactory.createText("[a-zA-Z]"));
    return this;
  }

  letters(): RegexBuilder {
    this.components.push(ComponentFactory.createText("[a-zA-Z]+"));
    return this;
  }

  word(): RegexBuilder {
    this.components.push(
      ComponentFactory.createCharacterClass(CharacterClasses.WORD),
    );
    return this;
  }

  words(): RegexBuilder {
    const wordComponent = ComponentFactory.createCharacterClass(
      CharacterClasses.WORD,
    );
    this.components.push(
      ComponentFactory.createQuantified(wordComponent, Quantifier.oneOrMore()),
    );
    return this;
  }

  whitespace(): RegexBuilder {
    this.components.push(
      ComponentFactory.createCharacterClass(CharacterClasses.WHITESPACE),
    );
    return this;
  }

  whitespaces(): RegexBuilder {
    const wsComponent = ComponentFactory.createCharacterClass(
      CharacterClasses.WHITESPACE,
    );
    this.components.push(
      ComponentFactory.createQuantified(wsComponent, Quantifier.oneOrMore()),
    );
    return this;
  }

  anyChar(): RegexBuilder {
    this.components.push(
      ComponentFactory.createCharacterClass(CharacterClasses.ANY),
    );
    return this;
  }

  // Quantifiers
  optional(): RegexBuilder {
    if (this.components.length === 0) {
      throw new Error("Cannot apply quantifier to empty pattern");
    }
    const lastComponent = this.components.pop()!;
    this.components.push(
      ComponentFactory.createQuantified(lastComponent, Quantifier.optional()),
    );
    return this;
  }

  oneOrMore(): RegexBuilder {
    if (this.components.length === 0) {
      throw new Error("Cannot apply quantifier to empty pattern");
    }
    const lastComponent = this.components.pop()!;
    this.components.push(
      ComponentFactory.createQuantified(lastComponent, Quantifier.oneOrMore()),
    );
    return this;
  }

  zeroOrMore(): RegexBuilder {
    if (this.components.length === 0) {
      throw new Error("Cannot apply quantifier to empty pattern");
    }
    const lastComponent = this.components.pop()!;
    this.components.push(
      ComponentFactory.createQuantified(lastComponent, Quantifier.zeroOrMore()),
    );
    return this;
  }

  exactly(n: number): RegexBuilder {
    if (this.components.length === 0) {
      throw new Error("Cannot apply quantifier to empty pattern");
    }
    const lastComponent = this.components.pop()!;
    this.components.push(
      ComponentFactory.createQuantified(lastComponent, Quantifier.exactly(n)),
    );
    return this;
  }

  between(min: number, max: number): RegexBuilder {
    if (this.components.length === 0) {
      throw new Error("Cannot apply quantifier to empty pattern");
    }
    const lastComponent = this.components.pop()!;
    this.components.push(
      ComponentFactory.createQuantified(
        lastComponent,
        Quantifier.between(min, max),
      ),
    );
    return this;
  }

  atLeast(n: number): RegexBuilder {
    if (this.components.length === 0) {
      throw new Error("Cannot apply quantifier to empty pattern");
    }
    const lastComponent = this.components.pop()!;
    this.components.push(
      ComponentFactory.createQuantified(lastComponent, Quantifier.atLeast(n)),
    );
    return this;
  }

  // Character sets
  oneOf(chars: string): RegexBuilder {
    this.components.push(
      ComponentFactory.createText(`[${this.escapeCharClass(chars)}]`),
    );
    return this;
  }

  noneOf(chars: string): RegexBuilder {
    this.components.push(
      ComponentFactory.createText(`[^${this.escapeCharClass(chars)}]`),
    );
    return this;
  }

  range(from: string, to: string): RegexBuilder {
    this.components.push(ComponentFactory.createText(`[${from}-${to}]`));
    return this;
  }

  // Anchors
  startOfLine(): RegexBuilder {
    this.components.push(ComponentFactory.createText("^"));
    return this;
  }

  endOfLine(): RegexBuilder {
    this.components.push(ComponentFactory.createText("$"));
    return this;
  }

  wordBoundary(): RegexBuilder {
    this.components.push(ComponentFactory.createText("\\b"));
    return this;
  }

  // Grouping
  group(builderFn: (builder: RegexBuilder) => RegexBuilder): RegexBuilder {
    const groupBuilder = RegexBuilder.create();
    const result = builderFn(groupBuilder);
    this.components.push(ComponentFactory.createGroup(result.components, true));
    return this;
  }

  nonCapturingGroup(
    builderFn: (builder: RegexBuilder) => RegexBuilder,
  ): RegexBuilder {
    const groupBuilder = RegexBuilder.create();
    const result = builderFn(groupBuilder);
    this.components.push(
      ComponentFactory.createGroup(result.components, false),
    );
    return this;
  }

  // Alternation
  or(builderFn: (builder: RegexBuilder) => RegexBuilder): RegexBuilder {
    const altBuilder = RegexBuilder.create();
    const result = builderFn(altBuilder);

    const currentComponents = [...this.components];
    const alternativeComponents = result.components;

    this.components = [
      ComponentFactory.createAlternation([
        ComponentFactory.createGroup(currentComponents, false),
        ComponentFactory.createGroup(alternativeComponents, false),
      ]),
    ];

    return this;
  }

  // Common patterns
  email(): RegexBuilder {
    this.components.push(CommonPatterns.email());
    return this;
  }

  url(): RegexBuilder {
    this.components.push(CommonPatterns.url());
    return this;
  }

  phone(): RegexBuilder {
    this.components.push(CommonPatterns.phone());
    return this;
  }

  ipAddress(): RegexBuilder {
    this.components.push(CommonPatterns.ipAddress());
    return this;
  }

  creditCard(): RegexBuilder {
    this.components.push(CommonPatterns.creditCard());
    return this;
  }

  hexColor(): RegexBuilder {
    this.components.push(CommonPatterns.hexColor());
    return this;
  }

  // Flags
  global(): RegexBuilder {
    this.flags.add(RegexFlags.GLOBAL);
    return this;
  }

  ignoreCase(): RegexBuilder {
    this.flags.add(RegexFlags.IGNORE_CASE);
    return this;
  }

  multiline(): RegexBuilder {
    this.flags.add(RegexFlags.MULTILINE);
    return this;
  }

  dotAll(): RegexBuilder {
    this.flags.add(RegexFlags.DOT_ALL);
    return this;
  }

  unicode(): RegexBuilder {
    this.flags.add(RegexFlags.UNICODE);
    return this;
  }

  sticky(): RegexBuilder {
    this.flags.add(RegexFlags.STICKY);
    return this;
  }

  // Build methods
  getPattern(): string {
    return this.components.map((component) => component.build()).join("");
  }

  build(): RegExp {
    const pattern = this.getPattern();
    const flagString = Array.from(this.flags).join("");

    // Validate before building
    if (!this.validator.validate(pattern)) {
      const errors = this.validator.getErrors();
      throw new Error(`Invalid regex pattern: ${errors.join(", ")}`);
    }

    return new RegExp(pattern, flagString);
  }

  toString(): string {
    const pattern = this.getPattern();
    const flagString = Array.from(this.flags).join("");
    return `/${pattern}/${flagString}`;
  }

  // Test methods
  test(input: string): boolean {
    return this.build().test(input);
  }

  match(input: string): RegExpMatchArray | null {
    return input.match(this.build());
  }

  matchAll(input: string): RegExpMatchArray[] {
    const regex = this.build();
    if (!regex.global) {
      throw new Error("matchAll requires global flag. Use .global() method.");
    }
    return Array.from(input.matchAll(regex));
  }

  replace(input: string, replacement: string): string {
    return input.replace(this.build(), replacement);
  }

  split(input: string): string[] {
    return input.split(this.build());
  }

  // Utility methods
  clone(): RegexBuilder {
    const cloned = new RegexBuilder();
    cloned.components = this.components.map((c) => c.clone());
    cloned.flags = new Set(this.flags);
    return cloned;
  }

  private escapeCharClass(str: string): string {
    return str.replace(/[\]\\^-]/g, "\\$&");
  }
}
