import { Order as OrderModel } from "@prisma/client";
import { Order } from "./core/Order";

export interface OrderRepository {
  create(order: Order): Promise<OrderModel>;
  update(order: Order): Promise<OrderModel>;
  find(id: string): Promise<Order>;
}
