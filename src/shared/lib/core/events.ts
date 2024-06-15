import { DEvent } from "../types";

export class DomainEvents<T> {
  private _events: DEvent<T>[];

  constructor(private readonly aggregate: T) {
    this._events = [];
    this.aggregate = aggregate;
  }


  dispatchEvent(eventName: string): void | Promise<void> {
    const _event = this._events.find(
      (evt): boolean => evt.eventName === eventName,
    );

    if (!_event) return;
    this.removeEvent(eventName);
  }

  addEvent(eventName: string): void {
    this.validateEventName(eventName);
    this.removeEvent(eventName);
    this._events.push({ eventName, aggregate: this.aggregate});
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

  }
}

export default DomainEvents;
