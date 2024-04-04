import { Order } from "./entity/Order";

export interface OrderRepository {
  create(order: Order): Promise<boolean>;
  update(order: Order): Promise<boolean>;
  find(id: string): Promise<Order>;
}
