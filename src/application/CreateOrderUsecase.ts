import { DomainEvents } from "../domain/DomainEvents";
import { OrderRepository } from "../domain/OrderRepositoryInterface";
import { Order } from "../domain/core/Order";
import { OrderCreatedEvent } from "../domain/core/OrderCreatedEvent";
import { OrderDto } from "../dto/orderDto";
import { orderRepository } from "../infra/OrderDBRepository";

type Success = { success: true };
type Failure = { success: false; reason: string };
type UsecaseResponse = Success | Failure;

export class CreateOrderUsecase {
  private orderRepository: OrderRepository;
  constructor(orderRepository: OrderRepository) {
    this.orderRepository = orderRepository;
  }
  async execute(orderDto: OrderDto): Promise<UsecaseResponse> {
    if (orderDto.items.length === 0) {
      return { success: false, reason: "Order should have at least one item" };
    }
    const order = Order.create(orderDto.items);
    const result = await this.orderRepository.save(order);
    if (!result) {
      throw new Error("Failed to create order");
    }
    DomainEvents.publishEvent(new OrderCreatedEvent(order.id));
    return { success: true };
  }
}

export const createOrderUsecase = new CreateOrderUsecase(orderRepository);
