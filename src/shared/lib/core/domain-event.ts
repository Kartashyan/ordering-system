import Aggregate from "./aggregate";

export type DomainEvent<T = Aggregate<any>> = {
	eventName: string;
	aggregate: T;
}