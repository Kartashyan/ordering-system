import { DEvent, Handler, Options, PromiseHandler } from "../types";

export class DomainEvents<T> {
  private _events: DEvent<T>[];

  constructor(private readonly aggregate: T) {
    this._events = [];
  }

  private getPriority(): number {
    const totalEvents = this._events.length;
    if (totalEvents <= 1) return 2;
    return totalEvents;
  }

  dispatchEvent(eventName: string, ...args: any[]): void | Promise<void> {
    const _event = this._events.find(
      (evt): boolean => evt.eventName === eventName,
    );
    if (!_event) return;
    _event.handler(this.aggregate, [_event, ...args]);
    this.removeEvent(eventName);
  }

  private getDefaultOptions(): Options {
    const priority = this.getPriority();
    return {
      priority,
    };
  }

  addEvent(eventName: string, handler: Handler<T>, options?: Options): void {
    const defaultOptions = this.getDefaultOptions();
    const opt = options ? options : defaultOptions;
    this.validateEventName(eventName);
    this.validateHandler(handler, eventName);
    this.removeEvent(eventName);
    this._events.push({ eventName, handler, options: opt });
  }

  private validateHandler(handler: Handler<T>, eventName: string): void {
    if (typeof handler !== "function") {
      const message = `addEvent: handler for ${eventName} is not a function`;
      throw new Error(message);
    }
  }

  private validateEventName(eventName: string): void {
    if (typeof eventName !== "string" || String(eventName).length < 3) {
      const message = `addEvent: invalid event name ${eventName}`;
      throw new Error(message);
    }
  }

  clearEvents(): void {
    this._events = [];
  }

  removeEvent(eventName: string): void {
    this._events = this._events.filter(
      (event): boolean => event.eventName !== eventName,
    );
  }

  async dispatchEvents(): Promise<void> {
    const promisesEvents: PromiseHandler<T>[] = [];
    const sorted = this._events.sort(
      (a, b): number => a.options.priority - b.options.priority,
    );
    sorted.forEach((_event): void => {
      const fn = _event.handler(this.aggregate, [_event]);
      if (fn instanceof Promise) {
        promisesEvents.push(fn as unknown as PromiseHandler<T>);
      }
    });
    await Promise.all(promisesEvents).catch(console.error);
    this.clearEvents();
  }
}

export default DomainEvents;
