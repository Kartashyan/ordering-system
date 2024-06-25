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

	async dispatchAll(): Promise<void> {
		await this._domainEvents.dispatchEvents();
	};

	clearEvents(): void {
		this._domainEvents.clearEvents();
	};

	addEvent(event: DomainEvent): void {
		this._domainEvents.addEvent(event);
	}

	toObject(): Props {
		return this.props;
	}
}
export default Aggregate;
