export type OrderCreatedEventPayload = { orderId: string };

export class OrderCreatedEvent {
  readonly type: string;
  readonly payload: OrderCreatedEventPayload;

  constructor(orderId: string) {
    this.type = "order-created";
    this.payload = { orderId };
  }
}
