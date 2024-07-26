import { DomainEvent } from "../../../shared/core/domain-event";
import { Order } from "../order.aggregate";

export class OrderReadyEvent implements DomainEvent<Order> {
  readonly eventName: string = "order-ready";
  readonly occurredOn: Date;
  constructor(public aggregate: Order) {
    this.occurredOn = new Date();
  }
}
