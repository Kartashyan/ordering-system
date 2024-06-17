import { DomainEvent } from "../../shared/lib/core/domain-event";
import { Order } from "./order.aggregate";

export class OrderCreatedEvent implements DomainEvent<Order>{
	eventName: string;
	aggregate: Order;
	constructor(order: Order) {
		this.eventName = "Orders:OrderCreatedEvent";
		this.aggregate = order;
	}
}

export default OrderCreatedEvent;