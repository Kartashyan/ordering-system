import { z } from "zod";
import { OrderStatus } from "./state-machine";

export type OrderId = string;

export const OrderRequestSchema = z.object({
  pizzaId: z.number(),
  quantity: z.number().min(1),
});

export type OrderRequest = z.infer<typeof OrderRequestSchema>;

export interface OrderResponse {
  orderId: OrderId;
  status: string;
  createdAt: string;
  details: OrderRequest;
}

export const OrderStatusSchema = z.enum([
  OrderStatus.Pending,
  OrderStatus.InPreparation,
  OrderStatus.ReadyForPickup,
  OrderStatus.Completed,
]);

export type StatusUpdate = z.infer<typeof OrderStatusSchema>;
export type StatusUpdateRequest = { status: StatusUpdate };

export interface ErrorResposne {
  error: string;
  message: string;
}
