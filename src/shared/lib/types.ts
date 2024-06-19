
export interface UID<T = string> {
	value(): string;
	isNew(): boolean;
	createdAt(): Date;
	equal(id: UID<string>): boolean;
	isEqual(id: UID<string>): boolean;
	deepEqual(id: UID<string>): boolean;
}

export interface ICommand<A, B> {
	execute(data: A): B;
}

export type Unit = 'minute' | 'hour' | 'day' | 'week' | 'month' | 'year';

export const ONE_MINUTE = 60000;
export const ONE_HOUR = ONE_MINUTE * 60;
export const ONE_DAY = ONE_HOUR * 24;
export const ONE_WEEK = ONE_DAY * 7;
export const ONE_MONTH = ONE_DAY * 30;
export const ONE_YEAR = ONE_DAY * 365;

export interface DEvent<T> {
	eventName: string;
	aggregate: T;
}

export type HandlerArgs<T> = [T, [DEvent<T>, ...any[]]]

export interface Options {
	priority: number;
}

export interface EventParams {
	eventName: string;
	options?: Options;
}



