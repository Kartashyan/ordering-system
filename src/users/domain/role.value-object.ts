import { Result, ValueObject } from "../../shared";


export class Role extends ValueObject<string> {
  private constructor(role: string) {
    super(role);
  }

  public static create(role: string): Result<Role> {
    if (!Role.isValid(role)) {
      return Result.fail("Invalid role");
    }

    return Result.ok(new Role(role));
  }

  public static isValid(role: string): boolean {
    return role === "admin" || role === "user";
  }
}