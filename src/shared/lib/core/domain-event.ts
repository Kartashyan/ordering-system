import Aggregate from "./aggregate";

export type DomainEvent = {
	eventName: string;
	occurredOn: Date;
}