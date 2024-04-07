import { OrderRepository } from "../domain/OrderRepositoryInterface";
import { Order } from "../domain/core/Order";
import { kitchenQueue } from "../infra/KitchenQueue";
import { orderRepository } from "../infra/OrderDBRepository";
import {
  UpdateOrderStatusUsecase,
  updateOrderStatusUsecase,
} from "./UpdateOrderStatusUsecase";

type Success<S> = { success: true; data: S };
type Failure = { success: false; reason: string };
type UsecaseResponse<S> = Success<S> | Failure;

export class GetNextOrderUsecase {
  private orderRepository: OrderRepository;
  private updateOrderStatusUsecase: UpdateOrderStatusUsecase;
  constructor(
    orderRepository: OrderRepository,
    updateOrderStatusUsecase: UpdateOrderStatusUsecase
  ) {
    this.orderRepository = orderRepository;
    this.updateOrderStatusUsecase = updateOrderStatusUsecase;
  }
  async execute(): Promise<UsecaseResponse<Order>> {
    const orderId = kitchenQueue.dequeue();
    if (!orderId) {
      return { success: false, reason: "No orders" };
    }
    await this.updateOrderStatusUsecase.execute({ id: orderId });
    const order = await this.orderRepository.find(orderId);
    if (!order) {
      return { success: false, reason: "Order not found" };
    }
    return { success: true, data: order };
  }
}

export const getNextOrderUsecase = new GetNextOrderUsecase(
  orderRepository,
  updateOrderStatusUsecase
);
