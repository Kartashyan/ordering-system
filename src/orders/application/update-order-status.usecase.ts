import { OrderRepository } from "../domain/ports/order.repo-port";
import { StatusStateManager } from "../domain/OrderStatusManager";
import { orderRepository } from "../infra/order-prisma.repo-adapter";

export class OrderStatusService {
  private orderRepository: OrderRepository;
  constructor(orderRepository: OrderRepository) {
    this.orderRepository = orderRepository;
  }
  async updateToNext(orderData: { id: string }): Promise<void> {
    const order = await this.orderRepository.find(orderData.id);
    const nextStatus = StatusStateManager.getNextState(order.status);
    order.changeStatusTo(nextStatus);
    await this.orderRepository.save(order);
  }
}

export const orderStatusService = new OrderStatusService(orderRepository);
