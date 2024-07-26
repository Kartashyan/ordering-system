import { DomainEvent } from "../../shared/core/domain-event";
import { Order } from "./order.aggregate";

export class OrderCreatedEvent implements DomainEvent<Order> {
	eventName: string = "order-created";
	occurredOn: Date;
	constructor(public aggregate: Order) {
		this.occurredOn = new Date();
	}
}

export default OrderCreatedEvent;