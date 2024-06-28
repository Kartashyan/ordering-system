import { randomUUID } from './crypto';

export class ID<T = string> {
	#value: string;
	#isNew: boolean;
	#createdAt: Date;

	private constructor(id?: T) {
		this.#createdAt = new Date();
		if (typeof id === 'undefined') {
			const uuid = randomUUID();
			this.#value = uuid;
			this.#isNew = true;
			return this;
		}
		const isString = typeof id === 'string';
		this.#value = isString ? id as unknown as string : String(id);
		this.#isNew = false;
		return this;
	};

	value(): string {
		return this.#value;
	}

	isNew(): boolean {
		return this.#isNew;
	}

	createdAt(): Date {
		return this.#createdAt;
	}

	equal(id: ID<any>): boolean {
		return (typeof this.#value === typeof id?.value()) && (this.#value as any === id?.value());
	}

	isEqual(id: ID<any>): boolean {
		return this.equal(id);
	}

	clone(): ID<T> {
		return new ID(this.#value) as unknown as ID<T>;
	}

	public static create<T = string | number>(id?: T): ID<string> {
		return new ID(id) as unknown as ID<string>;
	}
}

export default ID;
export const id = ID;
export const Uid = ID.create;

export const Id = ID.create;

