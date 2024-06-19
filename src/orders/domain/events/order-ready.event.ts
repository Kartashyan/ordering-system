import { DomainEvent } from "../../../shared/lib/core/domain-event";

export class OrderReadyEvent implements DomainEvent {
  readonly eventName: string = "order-ready";
  readonly occurredOn: Date;
  readonly aggregateId: string
  constructor(aggregateId: string) {
    this.occurredOn = new Date();
    this.aggregateId = aggregateId;
  }
}
