import { ValueObject } from "../../shared";

export class ProductName extends ValueObject<{ value: string }> {
    public readonly value: string;

    private constructor(value: string) {
        super({ value });
        this.value = value;
    }

    public static create(value: string): ProductName {
        if (value.length < 2) {
            throw new Error(`Product name <${value}> should have at least 2 characters`);
        }
        return new ProductName(value);
    }
}