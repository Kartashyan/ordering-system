import { OrderRepository } from "../domain/ports/order.repo-port";
import { Order } from "../domain/order.aggregate";
import { OrderDto } from "../dto/orderDto";
import { orderRepository } from "../infra/order-prisma.repo-adapter";
import { ok, fail, Result } from "../../shared";
import { OrderItem } from "../domain/order-item.value-object";

export class CreateOrderUsecase {
  private orderRepository: OrderRepository;
  constructor(orderRepository: OrderRepository) {
    this.orderRepository = orderRepository;
  }
  async execute(orderDto: OrderDto): Promise<Result<void>> {
    if (orderDto.items.length === 0) {
      return fail("Order must have at least one item");
    }
    const orderItems = orderDto.items.map(item => OrderItem.create(
      item.id.toString(),
      item.quantity,
    ));

    const order = Order.create(orderItems);

    try {
      await this.orderRepository.save(order);
      return ok(undefined);
    } catch (error: unknown) {

      const message = `Error creating order: ${String(
        typeof error === "string" ? error : JSON.stringify(error)
      )}`;

      return fail(message);
    }
  }
}

export const createOrderUsecase = new CreateOrderUsecase(orderRepository);
