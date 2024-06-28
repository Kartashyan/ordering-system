import { Payment } from "../Payment";

export interface PaymentRepository {
  save(payment: Payment): Promise<boolean>;
  findById(id: string): Promise<Payment | null>;
}
