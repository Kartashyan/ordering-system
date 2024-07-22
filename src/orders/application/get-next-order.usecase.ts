import { ok, fail } from "../../shared";
import { Order } from "../domain/order.aggregate";
import { OrderRepository } from "../domain/ports/order.repo-port";
import { kitchenQueue } from "../infra/kitchen.queue";
import { orderRepository } from "../infra/order-prisma.repo-adapter";
import {
  OrderStatusService,
  orderStatusService,
} from "./update-order-status.usecase";

export class GetNextOrderUsecase {
  private orderRepository: OrderRepository;
  private updateOrderStatusUsecase: OrderStatusService;
  constructor(
    orderRepository: OrderRepository,
    updateOrderStatusUsecase: OrderStatusService
  ) {
    this.orderRepository = orderRepository;
    this.updateOrderStatusUsecase = updateOrderStatusUsecase;
  }
  async execute(): Promise<Result<Order>> {
    const orderId = kitchenQueue.dequeue();
    if (!orderId) {
      return fail("No orders in queue");
    }
    await this.updateOrderStatusUsecase.updateToNext({ id: orderId });
    const order = await this.orderRepository.find(orderId);
    if (!order) {
      return fail("Order not found");
    }
    return ok(order);
  }
}

export const getNextOrderUsecase = new GetNextOrderUsecase(
  orderRepository,
  orderStatusService
);
