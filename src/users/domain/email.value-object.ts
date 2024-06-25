import { Result, ValueObject } from "../../shared";


export class Email extends ValueObject<string> {
  private constructor(email: string) {
    super(email);
  }

  public static create(email: string): Result<Email> {
    if (!Email.isValid(email)) {
      throw new Error("Invalid email");
    }

    return Result.Ok(new Email(email));
  }

  public static isValid(email: string): boolean {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  }
}