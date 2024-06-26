import Entity from "./entity";
import ID from "./id";
import { DomainEvent } from "./domain-event";
import EventEmitter from "events";

export class Aggregate<Props> extends Entity<Props> {
	#domainEvents: DomainEvent[];

	constructor(props: Props, id?: ID) {		
		super(props, id);
		this.#domainEvents = [];
	}

	async dispatchAll(emitter: EventEmitter = new EventEmitter()): Promise<void> {
		this.#domainEvents.forEach((event: DomainEvent) => {
			emitter.emit(event.eventName, event);
		});
	};

	get domainEvents(): DomainEvent[] {
		return this.#domainEvents;
	}

	clearEvents(): void {
		this.#domainEvents = [];
	};

	addEvent(event: DomainEvent): void {
		this.#domainEvents.push(event);
	}

	toObject(): Props {
		return this.props;
	}
}
export default Aggregate;
