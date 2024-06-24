import { DomainEvent } from "../../../shared/core/domain-event";

export class UserCreatedEvent implements DomainEvent {
    readonly eventName: string = "UserCreated";
    readonly occurredOn: Date;
    constructor() {
        this.occurredOn = new Date();
    }
}