import { Payment } from "../domain/Payment";
import { PaymentRepository } from "../domain/ports/payment-repo.port";

export class PaymentRepositoryImplExample implements PaymentRepository {
  async save(payment: Payment) {
    try {
      console.log(payment);
      throw new Error("Method not implemented.");
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  async findById(id: string) {
    try {
      throw new Error("Method not implemented.");
    } catch (error) {
      console.log(error);
      return null;
    }
  }
}
export const paymentRepository = new PaymentRepositoryImplExample();
