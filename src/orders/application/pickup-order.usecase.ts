import { ok, fail, Result } from "../../shared";
import { DomainError } from "../../shared/core/domain-error";
import { OrderStatuses } from "../domain/OrderStatusManager";
import { OrderRepository } from "../domain/ports/order.repo-port";
import { orderRepository } from "../infra/order-prisma.repo-adapter";

export class PickupOrderStatusUsecase {
  private orderRepository: OrderRepository;
  constructor(orderRepository: OrderRepository) {
    this.orderRepository = orderRepository;
  }
  async execute(orderData: { id: string }): Promise<Result<void>> {
    try {
      const order = await this.orderRepository.find(orderData.id);

      if (order.status === OrderStatuses.Completed) {
        return fail("Order is already completed");
      }

      if (order.status !== OrderStatuses.ReadyForPickup) {
        return fail("Order is not ready for pickup");
      }

      order.changeStatusTo(OrderStatuses.Completed);

      await this.orderRepository.save(order);
      return ok(undefined);

    } catch (error: unknown) {
      if (error instanceof DomainError) {
        return fail(error.message);
      }
      return fail(
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
