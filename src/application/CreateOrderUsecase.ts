import { DomainEvents } from "../domain/DomainEvents";
import { OrderRepository } from "../domain/OrderRepositoryInterface";
import { Order } from "../domain/core/Order";
import { ProductItem } from "../domain/core/ProductItem";
import { orderRepository } from "../infra/OrderDBRepository";

type Success = { success: true };
type Failure = { success: false; reason: string };
type UsecaseResponse = Success | Failure;

export class CreateOrderUsecase {
  private orderRepository: OrderRepository;
  constructor(orderRepository: OrderRepository) {
    this.orderRepository = orderRepository;
  }
  async execute(orderData: { items: ProductItem[] }): Promise<UsecaseResponse> {
    if (orderData.items.length === 0) {
      return { success: false, reason: "Order should have at least one item" };
    }
    const order = Order.create(orderData.items);
    const result = await this.orderRepository.create(order);
    if (!result) {
      throw new Error("Failed to create order");
    }
    DomainEvents.publishEvent({
      type: "order-created",
      payload: { orderId: order.id },
    });
    return { success: true };
  }
}

export const createOrderUsecase = new CreateOrderUsecase(orderRepository);
