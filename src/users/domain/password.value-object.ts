import { ValueObject } from "../../shared";

export class Password extends ValueObject<string> {
  private constructor(password: string) {
    super(password);
  }

  public static create(password: string): Password {
    if (!Password.isValid(password)) {
      throw new Error("Invalid password");
    }

    return new Password(password);
  }

  public static isValid(password: string): boolean {
    return password.length >= 8;
  }
}