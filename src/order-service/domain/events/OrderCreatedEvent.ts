export type OrderCreatedEventPayload = string;

export class OrderCreatedEvent {
  readonly name: string;
  readonly orderId: OrderCreatedEventPayload;

  constructor(orderId: string) {
    this.name = "order-created";
    this.orderId = orderId;
  }
}
