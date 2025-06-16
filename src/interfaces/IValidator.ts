export interface IValidator {
  validate(input: string): boolean;
  getErrors(): string[];
}
