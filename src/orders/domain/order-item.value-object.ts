import { ValueObject } from "../../shared";
import { DomainError } from "../../shared/core/domain-error";

export interface OrderItemProps {
    productId: string;
    quantity: number;
}
export class OrderItem extends ValueObject<OrderItemProps> {
    public readonly productId: string;
    public readonly quantity: number;

    private constructor(props: OrderItemProps) {
        super(props);
        this.productId = props.productId;
        this.quantity = props.quantity;
    }

    public getProductId(): string {
        return this.props.productId;
    }

    public static create(productId: string, quantity: number): OrderItem {
        if (quantity <= 0) {
            throw new DomainError(`Order item quantity <${quantity}> should be greater than 0`);
        }
        // quantity should be a whole number
        if (!Number.isInteger(quantity)) {
            throw new DomainError(`Order item quantity <${quantity}> should be a whole number`);
        }
        return new OrderItem({ productId, quantity });
    }
}
