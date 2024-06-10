import { EventHandler } from "../../shared/lib";
import { Order } from "./order.aggregate";

export class OrderCreatedEvent extends EventHandler<Order>{

	constructor() { 
		super({ eventName: 'OrderCreated' });
	}
	
	dispatch(aggregate: Order): void {
		const model = aggregate.toObject();
        const orderItems = model.items;
        const orderId = model.id;
		console.log(`EVENT DISPATCH: ORDER CREATED`);
		console.log(model);
		aggregate.context().dispatchEvent('Kitchen:StartPreparing', { orderId, orderItems });
	}
}

export default OrderCreatedEvent;