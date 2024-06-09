import { ICommand, IIterator, IResult, IResultExecute, IResultHook, IResultObject, IResultOptions } from "../types";
import Iterator from "./iterator";

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

	public static iterate<A, B, M>(results?: Array<IResult<A, B, M>>): IIterator<IResult<A, B, M>> {
		return Iterator.create<IResult<A, B, M>>({ initialData: results, returnCurrentOnReversion: true });
	}

	public static combine<A = any, B = any, M = any>(results: Array<IResult<any, any, any>>): IResult<A, B, M> {
		const iterator = Result.iterate(results);
		if (iterator.isEmpty()) return Result.fail('No results provided on combine param' as B) as IResult<A, B, M>;
		while (iterator.hasNext()) {
			const currentResult = iterator.next();
			if (currentResult.isFail()) return currentResult as IResult<A, B, M>;
		}
		return iterator.first() as IResult<A, B, M>;
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
