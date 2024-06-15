import { EventParams, DEvent, HandlerArgs } from "../types";

/**
 * Abstract class representing an event handler.
 * @template T - The type of aggregate this event handler is associated with.
 */


export abstract class EventHandler<T> {
	/**
	 * Creates an instance of EventHandler.
	 * @param {EventParams} params - Parameters for the event handler.
	 * @throws {Error} If params.eventName is not provided as a string.
	 */
	constructor(public readonly params: EventParams) {
		if (typeof params?.eventName !== 'string') {
			throw new Error('params.eventName is required as string');
		}
		this.dispatch = this.dispatch.bind(this);
	}

	/**
	 * Dispatches the event with the provided arguments.
	 * @abstract
	 * @param {T} aggregate - The aggregate associated with the event.
	 * @param {[DEvent<T>, any[]]} args - Arguments for the event dispatch.
	 * @returns {Promise<void> | void} A Promise if the event dispatch is asynchronous, otherwise void.
	 */
	abstract dispatch(aggregate: T, args: [DEvent<T>, any[]]): Promise<void> | void;

	/**
	 * Dispatches the event with the provided arguments.
	 * @abstract
	 * @param {...HandlerArgs<T>} args - Arguments for the event dispatch.
	 * @returns {Promise<void> | void} A Promise if the event dispatch is asynchronous, otherwise void.
	 */
	abstract dispatch(...args: HandlerArgs<T>): Promise<void> | void;
}
