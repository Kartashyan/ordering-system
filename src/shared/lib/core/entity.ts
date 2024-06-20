import { ID } from "./id";

const isEntity = (v: any): v is Entity<any> => {
	return v instanceof Entity;
};
export class Entity<Props> {
	protected id: ID;
	public readonly props: Props;
	constructor(props: Props, id?: ID) {
		this.id = id ? id : ID.create();
		this.props = props;
	}

	public equals(other?: Entity<Props>): boolean {

		if (other == null || other == undefined) {
			return false;
		}

		if (this === other) {
			return true;
		}

		if (!isEntity(other)) {
			return false;
		}

		return this.id.isEqual(other.id);
	}

	hashCode(): ID<string> {
		const name = Reflect.getPrototypeOf(this);
		return ID.create(`[Entity@${name?.constructor?.name}]:${this.id.value()}`);
	}

	isNew(): boolean {
		return this.id.isNew();
	}
}

export default Entity;
