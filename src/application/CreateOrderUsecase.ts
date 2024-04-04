import { OrderRepository } from "../domain/OrderRepositoryInterface";
import { Order } from "../domain/core/Order";
import { ProductItem } from "../domain/core/ProductItem";
import { orderRepository } from "../infra/OrderDBRepository";

export class CreateOrderUsecase {
  private orderRepository: OrderRepository;
  constructor(orderRepository: OrderRepository) {
    this.orderRepository = orderRepository;
  }
  async execute(orderData: { items: ProductItem[] }): Promise<void> {
    const order = Order.create(orderData.items);
    const result = await this.orderRepository.create(order);
    if (!result) {
      throw new Error("Failed to create order");
    }
  }
}

export const createOrderUsecase = new CreateOrderUsecase(orderRepository);
