import { DomainEvent } from "../../shared/lib/core/domain-event";
import { Order } from "./order.aggregate";

export class OrderCreatedEvent implements DomainEvent {
	eventName: string = "Orders:OrderCreatedEvent";;
	occurredOn: Date;
	constructor(public aggregateId: string) {
		this.occurredOn = new Date();
	}
}

export default OrderCreatedEvent;