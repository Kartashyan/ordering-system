import { ValueObject } from "../../shared";

interface PriceProps {
  value: number;
}

export class Price extends ValueObject<PriceProps> {
  public readonly value: number;

  private constructor(value: number) {
    super({ value });
    this.value = value;
  }

  public static create(value: number): Price {
    if (value < 0) {
      throw new Error(`Price <${value}> should be positive`);
    }
    return new Price(value);
  }
}