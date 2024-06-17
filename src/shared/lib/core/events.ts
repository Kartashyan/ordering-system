import { DEvent } from "../types";
import { DomainEvent } from "./domain-event";

export class DomainEvents<T> {
  private _events: DomainEvent[];

  constructor(private readonly aggregate: T) {
    this._events = [];
    this.aggregate = aggregate;
  }


  dispatchEvent<E>(eventName: string, eventBody?: E): void | Promise<void> {
    const _event = this._events.find(
      (evt): boolean => evt.eventName === eventName,
    );
    console.log(`EVENT DISPATCH: ${eventName}, ${eventBody}`);
    if (!_event) return;
    this.removeEvent(eventName);
  }

  addEvent(event: DomainEvent): void {
    this.validateEventName(event.eventName);
    this.removeEvent(event.eventName);
    this._events.push(event);
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
