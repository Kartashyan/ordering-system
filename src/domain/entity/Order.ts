import { ProductItem } from "./ProductItem";
import { OrderStatus, OrderStatuses, StatusStateManager } from "../OrderStatus";

export interface OrderInterface {
  id: string;
  status: string;
  items: ProductItem[];
}

export class Order implements OrderInterface {
  readonly id: string;
  status: string;
  items: ProductItem[];

  private constructor(items: ProductItem[], id?: string, status?: string) {
    this.id = id || crypto.randomUUID();
    this.status = status || OrderStatus.create(OrderStatuses.Pending).value;
    this.items = items;
  }

  public static create(
    items: ProductItem[],
    id?: string,
    status?: string
  ): Order {
    return new Order(items, id, status);
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
