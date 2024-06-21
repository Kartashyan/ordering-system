import { ValueObject } from "../../shared";


export class Status extends ValueObject<string> {
  private constructor(status: string) {
    super(status);
  }

  public static create(status: string): Status {
    if (!Status.isValid(status)) {
      throw new Error("Invalid status");
    }

    return new Status(status);
  }

  public static isValid(status: string): boolean {
    return ["active", "inactive"].includes(status);
  }
}