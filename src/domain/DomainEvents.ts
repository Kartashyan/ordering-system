import { EventEmitter } from "events";

export type DomainEvent = {
  type: string;
  payload: any;
};
export class DomainEvents {
  private static events: DomainEvent[] = [];
  private static emitter = new EventEmitter();
  static publishEvent(event: DomainEvent): void {
    this.events.push(event);
    this.emitter.emit(event.type, event.payload);
  }
  static subscribeToEvent(eventType: string, callback: (payload: any) => void) {
    this.emitter.on(eventType, callback);
  }
}
