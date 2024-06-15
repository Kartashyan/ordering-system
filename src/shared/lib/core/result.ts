import { ICommand } from "../types";

/**
 * @summary The result is used to returns a operation result instead the own value.
 * @interface IResult<T, D, M>;
 * @classdesc on `T` refer to type of the value and `D` type of the error and `M` metaData type.
 * @default D is string.
 * @default M is empty object {}.
 *
 * @method `value()` get result value. return null if result is failure.
 * @method `error()` get result error. returns null if result is success.
 * @method `isFail()` check is result is failure
 * @method `isOk()` check if result is success
 * @method `metaData()` get result metadata
 * @method `toObject()` get an object with result state
 * @method `execute()` execute a hook as command on fail or on success
 */

export interface IResultObject<T, D, M> {
	isOk: boolean;
	isFail: boolean;
	data: T | null;
	error: D | null;
	metaData: M;
}

export interface IResult<T, D = string, M = {}> {
	value(): T;
	error(): D;
	isFail(): boolean;
	isOk(): boolean;
	metaData(): M;
	toObject(): IResultObject<T, D, M>;
	execute: <X, Y>(command: ICommand<X | void, Y>) => IResultExecute<X, Y>;
}

export class Result<T = void, D = string, M = {}> implements IResult<T, D, M> {

	#isOk: Readonly<boolean>;
	#isFail: Readonly<boolean>;
	#data: Readonly<T | null>;
	#error: Readonly<D | null>;
	#metaData: Readonly<M>;

	private constructor(isSuccess: boolean, data?: T, error?: D, metaData?: M) {
		this.#isOk = isSuccess;
		this.#isFail = !isSuccess;
		this.#data = data ?? null;
		this.#error = error ?? null;
		this.#metaData = metaData ?? {} as M;
	}

	/**
	 * Create an instance of Result as success state.
	 */
	public static Ok(): Result<void>;

	public static Ok(): IResult<void>;

	public static Ok<T, M = {}, D = string>(data: T, metaData?: M): Result<T, D, M>;

	public static Ok<T, M = {}, D = string>(data: T, metaData?: M): IResult<T, D, M>;

	public static Ok<T, M = {}, D = string>(data?: T, metaData?: M): IResult<T, D, M> {
		const _data = typeof data === 'undefined' ? null : data;
		const ok = new Result(true, _data, null, metaData) as unknown as IResult<T, D, M>;
		return Object.freeze(ok) as IResult<T, D, M>;
	}

	public static fail<D = string, M = {}, T = void>(error?: D, metaData?: M): Result<T, D, M>;

	public static fail<D = string, M = {}, T = void>(error?: D, metaData?: M): IResult<T, D, M> {
		const _error = typeof error !== 'undefined' && error !== null ? error : 'void error. no message!';
		const fail = new Result(false, null, _error, metaData) as unknown as IResult<T, D, M>;
		return Object.freeze(fail) as IResult<T, D, M>;
	}

	public static combine<A = any, B = any, M = any>(results: Array<IResult<any, any, any>>) {
		//TODO: Implement combine method
	}

	execute<X, Y>(command: ICommand<X | void, Y>): IResultExecute<X, Y> {
		return {
			on: (option: IResultOptions): Y | undefined => {
				if (option === 'Ok' && this.isOk()) return command.execute();
				if (option === 'fail' && this.isFail()) return command.execute();
			},
			/**
			 * Use this option the command require arguments.
			 */
			withData: (data: X): IResultHook<Y> => {
				return {
					/**
					 * Use this option the command does not require arguments.
					 */
					on: (option: IResultOptions): Y | undefined => {
						if (option === 'Ok' && this.isOk()) return command.execute(data);
						if (option === 'fail' && this.isFail()) return command.execute(data);
					}
				}
			}
		};
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

	metaData(): M {
		const metaData = this.#metaData;
		return Object.freeze(metaData);
	}

	toObject(): IResultObject<T, D, M> {
		const metaData = {
			isOk: this.#isOk,
			isFail: this.#isFail,
			data: this.#data as T | null,
			error: this.#error as D | null,
			metaData: this.#metaData as M
		}

		return Object.freeze(metaData);
	}
}

export default Result;
export const Combine = Result.combine;
/**
 *
 */

export type IResultOptions = 'fail' | 'Ok';
export interface IResultHook<Y> {
	on(option: IResultOptions): Y | undefined;
}
export interface IResultExecute<X, Y> extends IResultHook<Y> {
	withData(data: X): IResultHook<Y>;
}

