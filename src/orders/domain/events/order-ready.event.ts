import { DomainEvent } from "../../../shared/lib/core/domain-event";
import { Order } from "../order.aggregate";

export class OrderReadyEvent implements DomainEvent {
  readonly eventName: string = "Orders:order-ready";
  readonly aggregate: Order;
  constructor(order: Order) {
    this.aggregate = order;
  }
  static get eventName() {
    return this.name;
  }
}
