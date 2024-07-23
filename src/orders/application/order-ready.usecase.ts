import { LocalEventManager } from "../../shared/locaal-event-manager";
import { OrderRepository } from "../domain/ports/order.repo-port";
import { OrderReadyEvent } from "../domain/events/order-ready.event";
import { orderRepository } from "../infra/order-prisma.repo-adapter";
import { ok, fail, Result } from "../../shared";

export class OrderReadyUsecase {
  private orderRepository: OrderRepository;
  constructor(orderRepository: OrderRepository) {
    this.orderRepository = orderRepository;
  }
  async execute(orderData: { id: string }): Promise<Result<void>> {
    const order = await this.orderRepository.find(orderData.id);
    if (!order) {
      return fail("Order not found");
    }
    try {
      order.changeStatusTo("ReadyForPickup");
    } catch (e: unknown) {
      if (e instanceof Error) {
        return fail(e.message);
      } else {
        return fail("An error occurred");
      }
    }
    await this.orderRepository.save(order);
    LocalEventManager.publishEvent(new OrderReadyEvent(order.getId()));
    return ok(undefined);
  }
}

export const orderReadyUsecase = new OrderReadyUsecase(orderRepository);
