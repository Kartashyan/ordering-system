export type NotifyKitchenEventPayload = { orderId: string };

export class NotifyKitchenEvent {
  readonly type: string;
  readonly payload: NotifyKitchenEventPayload;

  constructor(orderId: string) {
    this.type = "notify-kitchen";
    this.payload = { orderId };
  }
}
