import { Result, ValueObject } from "../../shared/lib";
import { Price } from "./price.value-object";

interface OrderItemProps {
    productId: string;
    quantity: number;
    price: Price;
}
export class OrderItem extends ValueObject<OrderItemProps> {
    public readonly productId: string;
    public readonly quantity: number;
    public readonly price: Price;

    private constructor(props: OrderItemProps) {
        super(props);
        this.productId = props.productId;
        this.quantity = props.quantity;
        this.price = props.price;
    }

    public static create(productId: string, quantity: number, price: Price): Result<OrderItem> {
        if (quantity <= 0) {
            return Result.fail(`Order item quantity <${quantity}> should be greater than 0`);
        }
        // quantity should be a whole number
        if (!Number.isInteger(quantity)) {
            return Result.fail(`Order item quantity <${quantity}> should be a whole number`);
        }
        return Result.Ok(new OrderItem({ productId, quantity, price }));
    }
}
