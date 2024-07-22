import { ValueObject } from "../../shared";
import { DomainError } from "../../shared/core/domain-error";


export class Role extends ValueObject<string> {
  private constructor(role: string) {
    super(role);
  }

  public static create(role: string): Role {
    if (!Role.isValid(role)) {
      throw new DomainError("Invalid role");
    }

    return new Role(role);
  }

  get value(): string {
    return this.props;
  }

  public static isValid(role: string): boolean {
    return role === "admin" || role === "user";
  }
}