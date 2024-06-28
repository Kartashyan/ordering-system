import { DomainEvent } from "../../../shared/core/domain-event";

export class PaymentCreatedEvent implements DomainEvent {
    readonly eventName: string = "PaymentCreated";
    readonly occurredOn: Date;
    constructor(readonly paymentId: string) {
        this.occurredOn = new Date();
    }
}
