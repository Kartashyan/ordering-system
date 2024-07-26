import { DomainEvent } from "../../../shared/core/domain-event";
import { Order } from "../order.aggregate";

export class StatusTransitionFailedEvent implements DomainEvent<Order> {
    eventName = "StatusTransitionFailed";
    occurredOn: Date;
    reason = "Invalid status transition";
    constructor(public aggregateId: string, public oldStatus: string, public attemptedStatus: string) {
        this.occurredOn = new Date();
    }
}