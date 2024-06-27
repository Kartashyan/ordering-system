import { OrderRepository } from "../domain/ports/order.repo-port";
import { Order } from "../domain/order.aggregate";
import { OrderDto } from "../dto/orderDto";
import { orderRepository } from "../infra/order-prisma.repo-adapter";
import { Result } from "../../shared";

export class CreateOrderUsecase {
  private orderRepository: OrderRepository;
  constructor(orderRepository: OrderRepository) {
    this.orderRepository = orderRepository;
  }
  async execute(orderDto: OrderDto): Promise<Result<void>> {
    if (orderDto.items.length === 0) {
      return Result.fail("Order must have at least one item");
    }
    const orderItems = orderDto.items.map(item => ({
      productId: item.id.toString(),
      quantity: item.quantity,
    }));
    const order = Order.create(orderItems);

    try {
      await this.orderRepository.save(order.value());
      return Result.ok();
    } catch (error: unknown) {

      const message = `Error creating order: ${String(
        typeof error === "string" ? error : JSON.stringify(error)
      )}`;

      return Result.fail(message);
    }
  }
}

export const createOrderUsecase = new CreateOrderUsecase(orderRepository);
