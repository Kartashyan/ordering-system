import { ValueObject } from "../shared/lib";

export class Email extends ValueObject<string> {
  private constructor(email: string) {
    super(email);
  }

  public static create(email: string): Email {
    if (!Email.isValid(email)) {
      throw new Error("Invalid email");
    }

    return new Email(email);
  }

  public static isValid(email: string): boolean {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  }
}