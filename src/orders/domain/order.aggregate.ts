import { Aggregate, ID, UID } from "../../shared/lib";
import { OrderStatus, OrderStatuses, StatusStateManager } from "./entities/OrderStatusManager";

type OrderItemProps = { id: number; quantity: number, name: string, price: number};
interface OrderProps {
    id: UID;
    status: string;
    items: OrderItemProps[];
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
        items: OrderItemProps[],
        id?: UID,
        status?: string
    ): Order {
        const order = new Order({ id: id || ID.create(), status: status || OrderStatuses.Pending, items });
        if (order.items.length === 0) {
            throw new Error("Order should have at least one item");
        }
        return order;
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