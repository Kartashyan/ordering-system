import { IResult } from "./core/result";
import { BuiltIns, ReadonlyDeep } from "./types-util";

export interface UID<T = string> {
	toShort(): UID<string>;
	value(): string;
	isNew(): boolean;
	createdAt(): Date;
	isShort(): boolean;
	equal(id: UID<string>): boolean;
	isEqual(id: UID<string>): boolean;
	deepEqual(id: UID<string>): boolean;
	cloneAsNew(): UID<string>;
	clone(): UID<T>;
}



/**
 * 
 */
export type IResultOptions = 'fail' | 'Ok';

/**
 * 
 */
export interface ICommand<A, B> {
	execute(data: A): B;
}

/**
 * 
 */
export type IUseCase<T, D> = ICommand<T, Promise<D>>;

export interface IVoSettings {
	disableGetters?: boolean;
}

export interface ISettings extends IVoSettings {
	disableSetters?: boolean;
}

export type OBJ = {};

export type EntityProps = OBJ | { id?: string, createdAt?: Date, updatedAt?: Date };

export interface EntityMapperPayload {
	id: string,
	createdAt: Date,
	updatedAt: Date
};

export type IPropsValidation<T> = { [P in keyof Required<T>]: (value: T[P]) => boolean };

export interface IAdapter<F, T, E = any, M = any> {
	build(target: F): IResult<T, E, M>;
}

export interface IValueObject<Props> {
	clone(): IValueObject<Props>;
	toObject<T>(adapter?: IAdapter<this, T>): T extends {} ? T : ReadonlyDeep<Props>;
}

export interface IBaseGettersAndSetters<Props> {
	get<Key extends keyof Props>(
		key: Props extends BuiltIns ?
			'value' :
			Props extends Symbol ?
			'value' :
			Props extends any[] ?
			'value' :
			Key
	): Props extends BuiltIns ?
		Props :
		Props extends Symbol ?
		string :
		Props extends any[] ?
		Readonly<Props> :
		Props extends {} ?
		Readonly<Props[Key]> : Props
	getRaw(): Props;
}


export type IParentName = 'ValueObject' | 'Entity';


export interface IManyData {
	class: any;
	props: any;
}

export type ICreateManyDomain = Array<IManyData>;

export type IClass = {};

export type Unit = 'minute' | 'hour' | 'day' | 'week' | 'month' | 'year';

export const ONE_MINUTE = 60000;
export const ONE_HOUR = ONE_MINUTE * 60;
export const ONE_DAY = ONE_HOUR * 24;
export const ONE_WEEK = ONE_DAY * 7;
export const ONE_MONTH = ONE_DAY * 30;
export const ONE_YEAR = ONE_DAY * 365;

export type CalcOpt = { fractionDigits: number };

/**
 * Interface representing an event.
 */
export interface DEvent<T> {
	eventName: string;
	aggregate: T;
}

export type HandlerArgs<T> = [T, [DEvent<T>, ...any[]]]

/**
 * Represents a promise-based event handler.
 */
export type PromiseHandler<T> = (...args: HandlerArgs<T>) => Promise<void>;

/**
 * Represents a normal event handler.
 */
export type NormalHandler<T> = (...args: HandlerArgs<T>) => void;

/**
 * Represents an event handler, which can be either a promise-based handler or a normal handler.
 */
export type Handler<T> = PromiseHandler<T> | NormalHandler<T>;

/**
 * Interface representing options for an event.
 */
export interface Options {
	priority: number;
}

/**
 * Parameters for defining an event.
 */
export interface EventParams {
	/**
	 * The name of the event.
	 */
	eventName: string;
	/**
	 * Additional options for the event.
	 */
	options?: Options;
}



