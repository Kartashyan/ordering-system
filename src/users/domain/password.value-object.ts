import { ValueObject } from "../../shared";
import { DomainError } from "../../shared/core/domain-error";

export class Password extends ValueObject<string> {
  private constructor(password: string) {
    super(password);
  }

  public static create(password: string): Password {
    if (!Password.isValid(password)) {
      throw new DomainError("Invalid password");
    }

    return new Password(password);
  }

  get value(): string {
    return this.props;
  }

  public static isValid(password: string): boolean {
    return password.length >= 8;
  }
}