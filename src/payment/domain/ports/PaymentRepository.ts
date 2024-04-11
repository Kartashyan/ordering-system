import { Payment } from "../Payment";

export class PaymentRepository {
  save(payment: Payment) {
    return Promise.resolve(payment);
  }
  find(id: string) {
    return Promise.resolve(null);
  }
}

export const paymentRepository = new PaymentRepository();
