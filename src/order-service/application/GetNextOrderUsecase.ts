import { OrderRepository } from "../domain/ports/OrderRepositoryInterface";
import { Order } from "../domain/entities/Order";
import { kitchenQueue } from "../infra/KitchenQueue";
import { orderRepository } from "../infra/OrderDBRepository";
import {
  OrderStatusService,
  orderStatusService,
} from "./UpdateOrderStatusUsecase";

type Success<S> = { success: true; data: S };
type Failure = { success: false; reason: string };
type UsecaseResponse<S> = Success<S> | Failure;

export class GetNextOrderUsecase {
  private orderRepository: OrderRepository;
  private updateOrderStatusUsecase: OrderStatusService;
  constructor(
    orderRepository: OrderRepository,
    updateOrderStatusUsecase: OrderStatusService
  ) {
    this.orderRepository = orderRepository;
    this.updateOrderStatusUsecase = updateOrderStatusUsecase;
  }
  async execute(): Promise<UsecaseResponse<Order>> {
    const orderId = kitchenQueue.dequeue();
    if (!orderId) {
      return { success: false, reason: "No orders" };
    }
    await this.updateOrderStatusUsecase.updateToNext({ id: orderId });
    const order = await this.orderRepository.find(orderId);
    if (!order) {
      return { success: false, reason: "Order not found" };
    }
    return { success: true, data: order };
  }
}

export const getNextOrderUsecase = new GetNextOrderUsecase(
  orderRepository,
  orderStatusService
);
