import { DomainEvents } from "../../shared/DomainEvents";
import { OrderRepository } from "../domain/ports/OrderRepositoryInterface";
import { OrderReadyEvent } from "../domain/events/OrderReadyEvent";
import { orderRepository } from "../infra/OrderDBRepository";

type Success = { success: true };
type Failure = { success: false; reason: string };
type UsecaseResponse = Success | Failure;

export class OrderReadyUsecase {
  private orderRepository: OrderRepository;
  constructor(orderRepository: OrderRepository) {
    this.orderRepository = orderRepository;
  }
  async execute(orderData: { id: string }): Promise<UsecaseResponse> {
    const order = await this.orderRepository.find(orderData.id);
    if (!order) {
      return { success: false, reason: "Order not found" };
    }
    try {
      order.changeStatusTo("ReadyForPickup");
    } catch (e: unknown) {
      if (e instanceof Error) {
        return { success: false, reason: e.message };
      } else {
        return { success: false, reason: "Failed to update order status" };
      }
    }
    await this.orderRepository.save(order);
    DomainEvents.publishEvent(new OrderReadyEvent(orderData.id));
    return { success: true };
  }
}

export const orderReadyUsecase = new OrderReadyUsecase(orderRepository);
