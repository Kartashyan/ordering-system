/**
 * @summary The result is used to returns a operation result instead the own value.
 * @interface IResult<T, D, M>;
 * @default D is string.
 *
 * @method `value()` get result value. return null if result is failure.
 * @method `error()` get result error. returns null if result is success.
 * @method `isFail()` check is result is failure
 * @method `isOk()` check if result is success
 * @method `toObject()` get an object with result state
 */

export interface IResultObject<T, D> {
	isOk: boolean;
	isFail: boolean;
	data: T | null;
	error: D | null;
}

export interface IResult<T, D = string, M = {}> {
	value(): T;
	error(): D;
	isFail(): boolean;
	isOk(): boolean;
	toObject(): IResultObject<T, D>;
}

export class Result<T = void, D = string> implements IResult<T, D> {

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

	public static Ok(): Result<void>;

	public static Ok(): IResult<void>;

	public static Ok<T, D = string>(data: T): Result<T, D>;

	public static Ok<T, D = string>(data: T): IResult<T, D>;

	public static Ok<T, D = string>(data?: T): IResult<T, D> {
		const _data = typeof data === 'undefined' ? null : data;
		const ok = new Result(true, _data, null) as unknown as IResult<T, D>;
		return Object.freeze(ok) as IResult<T, D>;
	}

	public static fail<D = string, T = void>(error?: D): Result<T, D>;

	public static fail<D = string, T = void>(error?: D): IResult<T, D> {
		const _error = typeof error !== 'undefined' && error !== null ? error : 'void error. no message!';
		const fail = new Result(false, null, _error) as unknown as IResult<T, D>;
		return Object.freeze(fail) as IResult<T, D>;
	}

	public static combine<A = any, B = any, M = any>(results: Array<IResult<any, any, any>>) {
		const _results = results.filter((result) => result.isFail());
		if (_results.length > 0) {
			const errors = _results.map((result) => result.error());
			return Result.fail(errors);
		}
		return Result.Ok();
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

	toObject(): IResultObject<T, D> {
		const metaData = {
			isOk: this.#isOk,
			isFail: this.#isFail,
			data: this.#data as T | null,
			error: this.#error as D | null,
		}

		return Object.freeze(metaData);
	}
}

export default Result;


