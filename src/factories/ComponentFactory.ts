import { TextComponent } from "../components/TextComponent";
import { CharacterClassComponent } from "../components/CharacterClassComponent";
import { GroupComponent } from "../components/GroupComponent";
import { AlternationComponent } from "../components/AlternationComponent";
import { QuantifiedComponent } from "../components/QuantifiedComponent";
import { CharacterClasses } from "../enums/CharacterClasses";
import { IRegexComponent } from "../interfaces/IRegexComponent";
import { IQuantifier } from "../interfaces/IQuantifier";

export class ComponentFactory {
  static createText(text: string): TextComponent {
    return new TextComponent(text);
  }

  static createCharacterClass(
    charClass: CharacterClasses,
  ): CharacterClassComponent {
    return new CharacterClassComponent(charClass);
  }

  static createGroup(
    components: IRegexComponent[],
    capturing: boolean = true,
  ): GroupComponent {
    return new GroupComponent(components, capturing);
  }

  static createAlternation(
    alternatives: IRegexComponent[],
  ): AlternationComponent {
    return new AlternationComponent(alternatives);
  }

  static createQuantified(
    component: IRegexComponent,
    quantifier: IQuantifier,
  ): QuantifiedComponent {
    return new QuantifiedComponent(component, quantifier);
  }
}
