
export interface ICommand<A, B> {
	execute(data: A): B;
}

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



