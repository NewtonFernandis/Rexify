import { BaseRegexComponent } from "../abstract/BaseRegexComponent";
import { IRegexComponent } from "../interfaces/IRegexComponent";

export class AlternationComponent extends BaseRegexComponent {
  constructor(private alternatives: IRegexComponent[]) {
    super();
  }

  build(): string {
    return this.alternatives.map((alt) => alt.build()).join("|");
  }

  clone(): AlternationComponent {
    return new AlternationComponent(
      this.alternatives.map((alt) => alt.clone()),
    );
  }
}
