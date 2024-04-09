import { Payment } from "../domain/Payment";

export class PaymentRepositoryImplExample {
  async save(payment: Payment) {
    throw new Error("Method not implemented.");
  }
  async find(id: string) {
    throw new Error("Method not implemented.");
  }
}
const paymentRepository = new PaymentRepositoryImplExample();
