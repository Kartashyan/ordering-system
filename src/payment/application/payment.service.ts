import { LocalEventManager } from "../../shared/locaal-event-manager";
import { PaymentCreatedEvent } from "../domain/events/payment-created.event";
import {
  PaymentRepository,
} from "../domain/ports/payment-repo.port";
import { Payment } from "../domain/Payment";
import { paymentRepository } from "../infra/payment-repo.adapter";

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
