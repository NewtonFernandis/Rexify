import { BaseRegexComponent } from "../abstract/BaseRegexComponent";
import { IRegexComponent } from "../interfaces/IRegexComponent";
import { IQuantifier } from "../interfaces/IQuantifier";

export class QuantifiedComponent extends BaseRegexComponent {
  constructor(
    private component: IRegexComponent,
    private quantifier: IQuantifier,
  ) {
    super();
  }

  build(): string {
    return this.quantifier.apply(this.component.build());
  }

  clone(): QuantifiedComponent {
    return new QuantifiedComponent(this.component.clone(), this.quantifier);
  }
}
