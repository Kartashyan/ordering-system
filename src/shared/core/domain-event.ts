
export type DomainEvent<D> = {
	eventName: string;
	occurredOn: Date;
	aggregate?: D;
}