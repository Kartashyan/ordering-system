
export type DomainEvent<D = {}> = {
	eventName: string;
	occurredOn: Date;
	payload?: D;
}