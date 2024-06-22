
export type DomainEvent<D = {}> = {
	eventName: string;
	occurredOn: Date;
	aggregateId: string;
	payload?: D;
}