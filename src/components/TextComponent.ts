import { BaseRegexComponent } from "../abstract/BaseRegexComponent";

export class TextComponent extends BaseRegexComponent {
  constructor(private text: string) {
    super();
    this.pattern = this.escapeRegex(text);
  }

  build(): string {
    return this.pattern;
  }

  clone(): TextComponent {
    return new TextComponent(this.text);
  }
}
