import { Result, ValueObject } from "../../shared";

export class Password extends ValueObject<string> {
  private constructor(password: string) {
    super(password);
  }

  public static create(password: string): Result<Password> {
    if (!Password.isValid(password)) {
      return Result.fail("Invalid password");
    }

    return Result.ok(new Password(password));
  }

  public static isValid(password: string): boolean {
    return password.length >= 8;
  }
}