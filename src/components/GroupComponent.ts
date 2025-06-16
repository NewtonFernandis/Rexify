import { BaseRegexComponent } from "../abstract/BaseRegexComponent";
import { IRegexComponent } from "../interfaces/IRegexComponent";

export class GroupComponent extends BaseRegexComponent {
  constructor(
    private components: IRegexComponent[],
    private isCapturing: boolean = true,
  ) {
    super();
  }

  build(): string {
    const innerPattern = this.components.map((c) => c.build()).join("");
    return this.isCapturing ? `(${innerPattern})` : `(?:${innerPattern})`;
  }

  clone(): GroupComponent {
    return new GroupComponent(
      this.components.map((c) => c.clone()),
      this.isCapturing,
    );
  }
}
