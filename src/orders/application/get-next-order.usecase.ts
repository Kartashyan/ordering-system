import { OrderRepository } from "../domain/ports/OrderRepositoryInterface";
import { kitchenQueue } from "../infra/kitchen.queue";
import { orderRepository } from "../infra/order-prisma.repo-adapter";
import {
  OrderStatusService,
  orderStatusService,
} from "./update-order-status.usecase";
import { Result } from "../../shared/lib";
import { Order } from "../domain/order.aggregate";
import { OrderMapper } from "../infra/order.mapper";

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
      return Result.fail("No orders in queue");
    }
    await this.updateOrderStatusUsecase.updateToNext({ id: orderId });
    const order = await this.orderRepository.find(orderId);
    if (!order) {
      return Result.fail("Order not found");
    }
    return Result.Ok(OrderMapper.toDomain(order));
  }
}

export const getNextOrderUsecase = new GetNextOrderUsecase(
  orderRepository,
  orderStatusService
);
