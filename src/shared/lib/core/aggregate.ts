import { UID } from "../types";
import { EventManager } from "./event-manager";
import Context from "./context";
import Entity from "./entity";
import DomainEvents from "./events";
import ID from "./id";

export class Aggregate<Props> extends Entity<Props> {
	private _domainEvents: DomainEvents<this>;

	constructor(props: Props, id?: UID) {
		super(props, id);
		this._domainEvents = new DomainEvents(this);
	}

	public hashCode(): UID<string> {
		const name = Reflect.getPrototypeOf(this);
		return ID.create(`[Aggregate@${name?.constructor.name}]:${this.id.value()}`);
	}

	/**
	 * Event Manger to subscribe or dispatch global events
	 */
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

	addEvent(): void {

	}

	deleteEvent(eventName: string): void {
		this._domainEvents.removeEvent(eventName);;
	}

	toObject(): Props {
		return this.props;
	}
}
export default Aggregate;
