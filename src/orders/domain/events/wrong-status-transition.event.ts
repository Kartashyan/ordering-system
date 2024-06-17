import { DomainEvent } from "../../../shared/lib/core/domain-event";

export class StatusTransitionFailedEvent implements DomainEvent {
    eventName = "StatusTransitionFailed";
    occurredOn: Date;
    constructor(public aggregateId: string, public oldStatus: string, public newStatus: string) {
        this.occurredOn = new Date();
    }
}