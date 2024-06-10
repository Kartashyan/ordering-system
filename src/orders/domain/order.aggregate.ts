import { i } from "vitest/dist/reporters-P7C2ytIv";
import { Aggregate, ID, Result, UID } from "../../shared/lib";
import { OrderStatus, OrderStatuses, StatusStateManager } from "./entities/OrderStatusManager";
import { OrderItem, OrderItemProps } from "./order-item.value-object";
import OrderCreatedEvent from "./order-created.event";

interface OrderProps {
    id: UID;
    status: string;
    items: OrderItem[];
}

export class Order extends Aggregate<OrderProps> {
    private constructor(props: OrderProps) {
        super(props);
    }

    public get items(): OrderItemProps[] {
        return this.props.items;
    }

    public get status(): string {
        return this.props.status;
    }

    public static create(
        items: OrderItem[],
        id?: UID,
        status?: string
    ): Result<Order> {
        const order = new Order({ id: id || ID.create(), status: status || OrderStatuses.Pending, items });
        if (order.items.length <= 0) {
            Result.fail("Order should have at least one item");
        }
        const isNewOrder = !id;
        if (isNewOrder) {
            order.addEvent(new OrderCreatedEvent());
        }
        return Result.Ok(order);
    }

    public changeStatusTo(status: string): void {
        const newStatus = OrderStatus.create(status).value;
        if (!StatusStateManager.canTransition(this.status, newStatus)) {
            throw new Error(
                `Transitioning order status from ${this.status} to ${newStatus} is prohibited`
            );
        }
        this.props.status = newStatus;
    }
}