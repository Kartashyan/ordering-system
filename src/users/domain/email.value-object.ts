import { Result, ValueObject } from "../../shared";


export class Email extends ValueObject<string> {
  private constructor(email: string) {
    super(email);
  }

  public static create(email: string): Result<Email> {
    if (!Email.isValid(email)) {
      return Result.fail("Invalid email");
    }

    return Result.Ok(new Email(email));
  }

  public static isValid(email: string): boolean {
    const length = email.length;
    const re = /\S+@\S+\.\S+/;
    return length >= 5 && length <= 255 && re.test(email);
  }
}