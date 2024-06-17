import { OrderRepository } from "../domain/ports/OrderRepositoryInterface";
import { Order } from "../domain/order.aggregate";
import { OrderDto } from "../dto/orderDto";
import { orderRepository } from "../infra/order-prisma.repo-adapter";

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
    const orderItems = orderDto.items.map(item => ({
      productId: item.id.toString(),
      quantity: item.quantity,
    }));
    const order = Order.create(orderItems);

    await this.orderRepository.save(order.value());
    
    return { success: true };
  }
}

export const createOrderUsecase = new CreateOrderUsecase(orderRepository);
