import { ValueObject } from "../../shared/lib";

export class Role extends ValueObject<string> {
  private constructor(role: string) {
    super(role);
  }

  public static create(role: string): Role {
    if (!Role.isValid(role)) {
      throw new Error("Invalid role");
    }

    return new Role(role);
  }

  public static isValid(role: string): boolean {
    return role === "admin" || role === "user";
  }
}