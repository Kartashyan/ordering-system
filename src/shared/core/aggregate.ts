import Entity from "./entity";
import ID from "./id";
import { DomainEvent } from "./domain-event";
import EventEmitter from "events";

export class Aggregate<Props> extends Entity<Props> {
	private _domainEvents: DomainEvent[];

	constructor(props: Props, id?: ID) {		
		super(props, id);
		this._domainEvents = [];
	}

	async dispatchAll(emitter: EventEmitter = new EventEmitter()): Promise<void> {
		this._domainEvents.forEach((event: DomainEvent) => {
			emitter.emit(event.eventName, event);
		});
	};

	clearEvents(): void {
		this._domainEvents = [];
	};

	addEvent(event: DomainEvent): void {
		this._domainEvents.push(event);
	}

	toObject(): Props {
		return this.props;
	}
}
export default Aggregate;
