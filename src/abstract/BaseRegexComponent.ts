import { IRegexComponent } from "../interfaces/IRegexComponent";

export abstract class BaseRegexComponent implements IRegexComponent {
  protected pattern: string = "";

  abstract build(): string;

  abstract clone(): IRegexComponent;

  protected escapeRegex(str: string): string {
    return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  }

  protected escapeCharClass(str: string): string {
    return str.replace(/[\]\\^-]/g, "\\$&");
  }
}
