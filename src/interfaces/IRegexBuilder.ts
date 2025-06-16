export interface IRegexBuilder {
  text(value: string): IRegexBuilder;
  digit(): IRegexBuilder;
  letter(): IRegexBuilder;
  whitespace(): IRegexBuilder;
  optional(): IRegexBuilder;
  oneOrMore(): IRegexBuilder;
  zeroOrMore(): IRegexBuilder;
  build(): RegExp;
  getPattern(): string;
}
