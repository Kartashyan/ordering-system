export class PaymentCreatedEvent {
  readonly name;
  readonly paymentId;
  constructor(paymentId: string) {
    this.name = "payment-created";
    this.paymentId = paymentId;
  }
}
