export type NotifyKitchenEventPayload = string;

export class NotifyKitchenEvent {
  readonly name: string;
  readonly orderId: NotifyKitchenEventPayload;

  constructor(orderId: string) {
    this.name = "notify-kitchen";
    this.orderId = orderId;
  }
}
