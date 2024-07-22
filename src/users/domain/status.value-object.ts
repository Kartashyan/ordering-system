import { ValueObject } from "../../shared";
import { DomainError } from "../../shared/core/domain-error";


export class Status extends ValueObject<string> {
  private constructor(status: string) {
    super(status);
  }

  public static create(status: string): Status {
    if (!Status.isValid(status)) {
      throw new DomainError("Invalid status");
    }

    return new Status(status);
  }

  get value(): string {
    return this.props;
  }

  public static isValid(status: string): boolean {
    return ["active", "inactive"].includes(status);
  }
}