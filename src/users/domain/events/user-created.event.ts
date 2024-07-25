import { DomainEvent } from "../../../shared/core/domain-event";
import { User } from "../user.aggregate";

export class UserCreatedEvent<User> implements DomainEvent<User> {
    readonly eventName: string = "UserCreated";
    readonly occurredOn: Date;
    readonly aggregate: User;
    constructor(user: User) {
        this.occurredOn = new Date();
        this.aggregate = user;
    }
}