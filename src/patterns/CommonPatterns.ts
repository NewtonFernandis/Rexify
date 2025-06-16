import { BaseRegexComponent } from "../abstract/BaseRegexComponent";

export class CommonPatterns extends BaseRegexComponent {
  static email(): CommonPatterns {
    const pattern = new CommonPatterns();
    pattern.pattern = "[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}";
    return pattern;
  }

  static url(): CommonPatterns {
    const pattern = new CommonPatterns();
    pattern.pattern =
      "https?:\\/\\/(?:[-\\w.])+(?:[:\\d]+)?(?:\\/(?:[\\w._~!$&'()*+,;=:@]|%[\\dA-Fa-f]{2})*)*(?:\\?(?:[\\w._~!$&'()*+,;=:@/?]|%[\\dA-Fa-f]{2})*)?(?:#(?:[\\w._~!$&'()*+,;=:@/?]|%[\\dA-Fa-f]{2})*)?";
    return pattern;
  }

  static phone(): CommonPatterns {
    const pattern = new CommonPatterns();
    pattern.pattern = "\\(?\\d{3}\\)?[-.\\s]?\\d{3}[-.\\s]?\\d{4}";
    return pattern;
  }

  static ipAddress(): CommonPatterns {
    const pattern = new CommonPatterns();
    pattern.pattern =
      "(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)";
    return pattern;
  }

  static creditCard(): CommonPatterns {
    const pattern = new CommonPatterns();
    pattern.pattern = "\\b(?:\\d{4}[- ]?){3}\\d{4}\\b";
    return pattern;
  }

  static hexColor(): CommonPatterns {
    const pattern = new CommonPatterns();
    pattern.pattern = "#(?:[0-9a-fA-F]{3}){1,2}\\b";
    return pattern;
  }

  build(): string {
    return this.pattern;
  }

  clone(): CommonPatterns {
    const cloned = new CommonPatterns();
    cloned.pattern = this.pattern;
    return cloned;
  }
}
