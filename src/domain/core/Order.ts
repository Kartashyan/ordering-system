import {
  OrderStatus,
  OrderStatuses,
  StatusStateManager,
} from "./OrderStatusManager";

export type OrderItemProps = { id: number; quantity: number };

export interface OrderInterface {
  id: string;
  status: string;
  items: OrderItemProps[];
}

export class Order implements OrderInterface {
  readonly id: string;
  status: string;
  items: OrderItemProps[];

  private constructor(items: OrderItemProps[], id?: string, status?: string) {
    this.id = id || crypto.randomUUID();
    this.status = status
      ? OrderStatus.create(status).value
      : OrderStatus.create(OrderStatuses.Pending).value;
    this.items = items;
  }

  public static create(
    items: OrderItemProps[],
    id?: string,
    status?: string
  ): Order {
    const order = new Order(items, id, status);
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
    this.status = newStatus;
  }
}
