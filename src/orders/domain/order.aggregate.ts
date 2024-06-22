
import { Aggregate, ID, Result } from "../../shared";
import { OrderStatus, OrderStatuses, StatusStateManager } from "./entities/OrderStatusManager";
import { StatusTransitionFailedEvent } from "./events/wrong-status-transition.event";
import OrderCreatedEvent from "./order-created.event";
import { OrderItem, OrderItemProps } from "./order-item.value-object";

interface OrderProps {
    id: ID;
    status: string;
    items: OrderItem[];
}

export class Order extends Aggregate<OrderProps> {
    private constructor(props: OrderProps) {
        super(props);
    }

    public get items(): OrderItemProps[] {
        return this.props.items.map((item) => ({
            productId: item.productId,
            quantity: item.quantity,
        }));
    }

    public get status(): string {
        return this.props.status;
    }

    public getId(): string {
        return this.props.id.value();
    }

    public static create(
        items: OrderItemProps[],
        id?: ID,
        status?: string
    ): Result<Order> {
        const orderItems = items.map((item) => OrderItem.create(item.productId, item.quantity).value());

        const order = new Order({ id: id || ID.create(), status: status || OrderStatuses.Pending, items: orderItems});
        if (order.items.length <= 0) {
            Result.fail("Order should have at least one item");
        }
        const isNewOrder = !id;
        if (isNewOrder) {
            order.addEvent(new OrderCreatedEvent(order.getId()));
        }
        return Result.Ok(order);
    }

    public changeStatusTo(status: string): void {
        const newStatus = OrderStatus.create(status).value;
        if (!StatusStateManager.canTransition(this.status, newStatus)) {
            this.addEvent(new StatusTransitionFailedEvent(this.getId(), this.status, newStatus));
        }
        this.props.status = newStatus;
    }
}