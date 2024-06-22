
export type Event = { detail: any[]; };

export abstract class EventManager {
	abstract subscribe(eventName: string, fn: (event: Event) => void | Promise<void>): void | Promise<void>;
	abstract exists(eventName: string): boolean | Promise<boolean>;
	abstract removerEvent(eventName: string): boolean | Promise<boolean>;
	abstract dispatchEvent(eventName: string, ...args: any[]): void | Promise<void>;
}
