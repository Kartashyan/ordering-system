import { ValueObject } from "../../shared";
import { DomainError } from "../../shared/core/domain-error";


export class Email extends ValueObject<string> {
  private constructor(email: string) {
    super(email);
  }

  public static create(email: string): Email {
    if (!Email.isValid(email)) {
      throw new DomainError("Invalid email");
    }

    return new Email(email);
  }

  get value(): string {
    return this.props;
  }

  public static isValid(email: string): boolean {
    const length = email.length;
    const re = /\S+@\S+\.\S+/;
    return length >= 5 && length <= 255 && re.test(email);
  }
}