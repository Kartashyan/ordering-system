import { EventManager } from "./event-manager";
import Context from "./context";
import Entity from "./entity";
import DomainEvents from "./events";
import ID from "./id";
import { DomainEvent } from "./domain-event";

export class Aggregate<Props> extends Entity<Props> {
	private _domainEvents: DomainEvents<this>;

	constructor(props: Props, id?: ID) {
		super(props, id);
		this._domainEvents = new DomainEvents(this);
	}

	public hashCode(): ID<string> {
		const name = Reflect.getPrototypeOf(this);
		return ID.create(`[Aggregate@${name?.constructor.name}]:${this.id.value()}`);
	}

	public context(): EventManager {
		return Context.events();
	}

	dispatchEvent<E>(eventName: string, eventBody: E): void | Promise<void> {
		this._domainEvents.dispatchEvent(eventName, eventBody);
	}

	async dispatchAll(): Promise<void> {
		await this._domainEvents.dispatchEvents();
	};

	clearEvents(): void {
		this._domainEvents.clearEvents();
	};

	addEvent(event: DomainEvent): void {
		this._domainEvents.addEvent(event);
	}

	deleteEvent(eventName: string): void {
		this._domainEvents.removeEvent(eventName);;
	}

	toObject(): Props {
		return this.props;
	}
}
export default Aggregate;
