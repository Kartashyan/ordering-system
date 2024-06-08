import { EntityProps, EventHandler, EventManager, Handler, IAggregate, ISettings, Options, UID } from "../types";
import Context from "./context";
import Entity from "./entity";
import DomainEvents from "./events";
import ID from "./id";

export class Aggregate<Props extends EntityProps> extends Entity<Props> implements IAggregate<Props> {
	private _domainEvents: DomainEvents<this>;

	constructor(props: Props, config?: ISettings, events?: DomainEvents<IAggregate<Props>>) {
		super(props, config);
		this._domainEvents = new DomainEvents(this);
		if (events) this._domainEvents = events as unknown as DomainEvents<this>;
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

	clone(props?: Partial<Props> & { copyEvents?: boolean }): this {
		const _props = props ? { ...this.props, ...props } : { ...this.props };
		const _events = (props && !!props.copyEvents) ? this._domainEvents : null;
		const instance = Reflect.getPrototypeOf(this);
		const args = [_props, this.config, _events];
		const aggregate = Reflect.construct(instance!.constructor, args);
		return aggregate;
	}

	dispatchEvent(eventName: string, ...args: any[]): void | Promise<void> {
		this._domainEvents.dispatchEvent(eventName, args);
	}

	async dispatchAll(): Promise<void> {
		await this._domainEvents.dispatchEvents();
	};

	clearEvents(): void {
		this._domainEvents.clearEvents();
	};

	addEvent(event: EventHandler<this>): void;

	addEvent(eventName: string, handler: Handler<this>, options?: Options): void;

	addEvent(eventNameOrEvent: string | EventHandler<this>, handler?: Handler<this>, options?: Options): void {
		if (typeof eventNameOrEvent === 'string' && handler) {
			this._domainEvents.addEvent(eventNameOrEvent, handler! ?? null, options);
			return;
		}
		const _options = (eventNameOrEvent as EventHandler<this>)?.params?.options;
		const eventName = (eventNameOrEvent as EventHandler<this>)?.params?.eventName;
		const eventHandler = (eventNameOrEvent as EventHandler<this>)?.dispatch;
		this._domainEvents.addEvent(eventName, eventHandler! ?? null, _options);
	}

	deleteEvent(eventName: string): void {
		this._domainEvents.removeEvent(eventName);;
	}
}
export default Aggregate;
