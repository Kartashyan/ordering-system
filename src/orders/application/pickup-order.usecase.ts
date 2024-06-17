import { OrderRepository } from "../domain/ports/order.repo-port";
import { OrderStatuses } from "../domain/entities/OrderStatusManager";
import { orderRepository } from "../infra/order-prisma.repo-adapter";
import { Result } from "../../shared/lib";
import { OrderMapper } from "../infra/order.mapper";

export class PickupOrderStatusUsecase {
  private orderRepository: OrderRepository;
  constructor(orderRepository: OrderRepository) {
    this.orderRepository = orderRepository;
  }
  async execute(orderData: { id: string }): Promise<Result<void>> {
    const order = await this.orderRepository.find(orderData.id);

    if (order.status === OrderStatuses.Completed) {
      return Result.fail("Order is already completed");
    }

    if (order.status !== OrderStatuses.ReadyForPickup) {
      return Result.fail("Order is not ready for pickup");
    }

    order.changeStatusTo(OrderStatuses.Completed);

    try {
      await this.orderRepository.save(order);
      return Result.Ok();
    } catch (error: unknown) {
      return Result.fail(
        `Error updating order status: ${String(
          typeof error === "string" ? error : JSON.stringify(error)
        )}`
      );
    }
  }
}

export const pickupOrderStatusUsecase = new PickupOrderStatusUsecase(
  orderRepository
);
