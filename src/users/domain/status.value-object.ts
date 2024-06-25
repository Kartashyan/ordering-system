import { Result, ValueObject } from "../../shared";


export class Status extends ValueObject<string> {
  private constructor(status: string) {
    super(status);
  }

  public static create(status: string): Result<Status> {
    if (!Status.isValid(status)) {
      return Result.fail("Invalid status");
    }

    return Result.Ok(new Status(status));
  }

  public static isValid(status: string): boolean {
    return ["active", "inactive"].includes(status);
  }
}