import { OrderRepository } from "../domain/OrderRepositoryInterface";
import { StatusStateManager } from "../domain/core/OrderStatusManager";
import { orderRepository } from "../infra/OrderDBRepository";

export class OrderStatusService {
  private orderRepository: OrderRepository;
  constructor(orderRepository: OrderRepository) {
    this.orderRepository = orderRepository;
  }
  async updateToNext(orderData: { id: string }): Promise<void> {
    const order = await this.orderRepository.find(orderData.id);
    const nextStatus = StatusStateManager.getNextState(order.status);
    order.changeStatusTo(nextStatus);
    const result = await this.orderRepository.save(order);
    if (!result) {
      throw new Error("Failed to update order status");
    }
  }
}

export const orderStatusService = new OrderStatusService(orderRepository);
