type PaymentProps = {
  amount: number;
  orderId: string;
};

export class Payment {
  private amount: number;
  private orderId: string;
  readonly id: string;
  private constructor(amount: number, orderId: string, id?: string) {
    this.id = id || crypto.randomUUID();
    this.amount = amount;
    this.orderId = orderId;
  }
  static create(paymentProps: PaymentProps) {
    if (paymentProps.amount <= 0) {
      throw new Error(
        `amount number <${paymentProps.amount}> should be positive`
      );
    }
    if (paymentProps.orderId.length === 0) {
      throw new Error(`orderId <${paymentProps.orderId}> should not be empty`);
    }
    return new Payment(paymentProps.amount, paymentProps.orderId);
  }
}
