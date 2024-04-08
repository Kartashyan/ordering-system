export class OrderReadyEvent {
  readonly orderId: string;
  readonly name: string = "order-ready";
  constructor(orderId: string) {
    this.orderId = orderId;
    this.name = "order-ready";
  }
  static get eventName() {
    return this.name;
  }
}
