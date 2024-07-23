import { ValueObject } from "../../shared";

export class Price extends ValueObject<number> {

  private constructor(value: number) {
    super(value);
  }

  public static create(value: number): Price {
    if (value < 0) {
      throw new Error(`Price <${value}> should be positive`);
    }
    return new Price(value);
  }
}