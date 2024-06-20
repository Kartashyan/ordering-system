import { randomUUID } from './crypto';
import { UID } from "../types";

export class ID<T = string> implements UID<T> {
	private _value: string;
	private _isNew: boolean;
	private _createdAt: Date;
	private readonly MAX_SIZE: number = 16;

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

	equal(id: UID<any>): boolean {
		return (typeof this._value === typeof id?.value()) && (this._value as any === id?.value());
	}

	isEqual(id: UID<any>): boolean {
		return this.equal(id);
	}

	deepEqual(id: UID<any>): boolean {
		const A = JSON.stringify(this);
		const B = JSON.stringify(id);
		return A === B;
	}

	clone(): UID<T> {
		return new ID(this._value) as unknown as UID<T>;
	}

	public static create<T = string | number>(id?: T): UID<string> {
		return new ID(id) as unknown as UID<string>;
	}
}

export default ID;
export const id = ID;
export const Uid = ID.create;
export const Id = ID.create;
