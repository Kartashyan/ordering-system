import { LocalEventManager } from "../../shared/locaal-event-manager";
import { PaymentCreatedEvent } from "../domain/events/PaymentCreatedEvent";
import {
  PaymentRepository,
  paymentRepository,
} from "../domain/ports/PaymentRepository";
import { Payment } from "../domain/Payment";

type PaymentData = {
  amount: number;
  orderId: string;
};

export class PaymentService {
  private paymentRepository: PaymentRepository;
  constructor(paymentRepository: PaymentRepository) {
    this.paymentRepository = paymentRepository;
  }
  async charge(paymentData: PaymentData) {
    const payment = Payment.create(paymentData);
    const result = await this.paymentRepository.save(payment);
    LocalEventManager.publishEvent(new PaymentCreatedEvent(payment.id));
    if (!result) {
      throw new Error("Failed to charge payment");
    }
  }
}
export const paymentService = new PaymentService(paymentRepository);
