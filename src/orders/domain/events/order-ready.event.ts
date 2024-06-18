import { DomainEvent } from "../../../shared/lib/core/domain-event";

export class OrderReadyEvent implements DomainEvent {
  readonly eventName: string = "order-ready";
  readonly occurredOn: Date;
  constructor(readonly aggregateId: string) {
    this.occurredOn = new Date();
    this.aggregateId = aggregateId;
  }
}
