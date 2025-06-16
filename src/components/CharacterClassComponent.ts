import { BaseRegexComponent } from "../abstract/BaseRegexComponent";
import { CharacterClasses } from "../enums/CharacterClasses";

export class CharacterClassComponent extends BaseRegexComponent {
  constructor(private characterClass: CharacterClasses) {
    super();
    this.pattern = characterClass;
  }

  build(): string {
    return this.pattern;
  }

  clone(): CharacterClassComponent {
    return new CharacterClassComponent(this.characterClass);
  }
}
