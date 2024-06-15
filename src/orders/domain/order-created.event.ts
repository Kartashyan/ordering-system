import { Order } from "./order.aggregate";

export class OrderCreatedEvent{
	eventName: string;
	constructor(public readonly order: Order) { 
		this.eventName = 'OrderCreated';
		this.order = order;
	}
	
	getAggregateId(): string {
		return this.order.getId();
	}
}

export default OrderCreatedEvent;