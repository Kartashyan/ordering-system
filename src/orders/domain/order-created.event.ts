import { DomainEvent } from "../../shared/lib/core/domain-event";

export class OrderCreatedEvent implements DomainEvent {
	eventName: string = "order-created";
	occurredOn: Date;
	constructor(public aggregateId: string) {
		this.occurredOn = new Date();
	}
}

export default OrderCreatedEvent;