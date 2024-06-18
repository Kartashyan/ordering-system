import { DomainEvent } from "../../../shared/lib/core/domain-event";

export class StatusTransitionFailedEvent implements DomainEvent {
    eventName = "StatusTransitionFailed";
    occurredOn: Date;
    reason = "Invalid status transition";
    constructor(public aggregateId: string, public oldStatus: string, public attemptedStatus: string) {
        this.occurredOn = new Date();
    }
}