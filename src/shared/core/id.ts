import { randomUUID } from './crypto';

export class ID<T = string> {
	private _value: string;
	private _isNew: boolean;
	private _createdAt: Date;

	private constructor(id?: T) {
		this._createdAt = new Date();
		if (typeof id === 'undefined') {
			const uuid = randomUUID();
			this._value = uuid;
			this._isNew = true;
			return this;
		}
		const isString = typeof id === 'string';
		this._value = isString ? id as unknown as string : String(id);
		this._isNew = false;
		return this;
	};

	value(): string {
		return this._value;
	}

	isNew(): boolean {
		return this._isNew;
	}

	createdAt(): Date {
		return this._createdAt;
	}

	equal(id: ID<any>): boolean {
		return (typeof this._value === typeof id?.value()) && (this._value as any === id?.value());
	}

	isEqual(id: ID<any>): boolean {
		return this.equal(id);
	}

	deepEqual(id: ID<any>): boolean {
		const A = JSON.stringify(this);
		const B = JSON.stringify(id);
		return A === B;
	}

	clone(): ID<T> {
		return new ID(this._value) as unknown as ID<T>;
	}

	public static create<T = string | number>(id?: T): ID<string> {
		return new ID(id) as unknown as ID<string>;
	}
}

export default ID;
export const id = ID;
export const Uid = ID.create;

export const Id = ID.create;

