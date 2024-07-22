
export interface ResultObject<T, D> {
	isOk: boolean;
	isFail: boolean;
	data: T | null;
	error: D | null;
}

export class Result<T = void, D = string> {

	#isOk: Readonly<boolean>;
	#isFail: Readonly<boolean>;
	#data: Readonly<T | null>;
	#error: Readonly<D | null>;

	private constructor(isSuccess: boolean, data?: T, error?: D) {
		this.#isOk = isSuccess;
		this.#isFail = !isSuccess;
		this.#data = data ?? null;
		this.#error = error ?? null;
	}

	public static ok(): Result<void>;

	public static ok<T, D = string>(data: T): Result<T, D>;

	public static ok<T, D = string>(data: T): Result<T, D>;

	public static ok<T, D = string>(data?: T): Result<T, D> {
		const _data = typeof data === 'undefined' ? null : data;
		const ok = new Result(true, _data, null) as unknown as Result<T, D>;
		return Object.freeze(ok) as Result<T, D>;
	}

	public static fail<D = string, T = void>(error?: D): Result<T, D>;

	public static fail<D = string, T = void>(error?: D): Result<T, D> {
		const _error = typeof error !== 'undefined' && error !== null ? error : 'An error occurred.';
		const fail = new Result(false, null, _error) as unknown as Result<T, D>;
		return Object.freeze(fail) as Result<T, D>;
	}

	public static combine(results: Array<Result<any, any>>) {
		const _results = results.filter((result) => result.isFail());
		if (_results.length > 0) {
			const errors = _results.map((result) => result.error());
			return Result.fail(errors);
		}
		return Result.ok();
	}

	value(): T {
		return this.#data as T;
	}

	error(): D {
		return this.#error as D;
	}

	isFail(): boolean {
		return this.#isFail;
	}

	isOk(): boolean {
		return this.#isOk;
	}
}

export default Result;


