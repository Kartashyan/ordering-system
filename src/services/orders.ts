import { PrismaClient } from "@prisma/client";
import {
  OrderId,
  OrderRequest,
  OrderResponse,
  StatusUpdate,
} from "../core/orders";
import { OrderEvent, OrderStateMachine } from "../core/state-machine";
const prisma = new PrismaClient();

export async function createOrder(order: OrderRequest): Promise<OrderResponse> {
  const orderStateMachine = new OrderStateMachine();
  orderStateMachine.transition(OrderEvent.PlaceOrder);
  const status = orderStateMachine.getCurrentState();
  debugger;
  const result = await prisma.order.create({
    data: {
      pizzaId: order.pizzaId,
      quantity: order.quantity,
      status,
    },
  });
  return {
    orderId: result.id,
    status: result.status,
    createdAt: result.createdAt.toISOString(),
    details: {
      pizzaId: result.pizzaId,
      quantity: result.quantity,
    },
  };
}

export async function updateOrderStatus(
  orderId: OrderId,
  status: StatusUpdate
) {
  const result = await prisma.order.update({
    where: { id: orderId },
    data: { status },
  });
  return {
    orderId: result.id,
    status: result.status,
    createdAt: result.createdAt.toISOString(),
    details: {
      pizzaId: result.pizzaId,
      quantity: result.quantity,
    },
  };
}
