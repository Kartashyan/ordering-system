import { EventEmitter } from "events";
import { DomainEvent } from "./lib/core/domain-event";

export class LocalEventManager {
  private static events: DomainEvent[] = [];
  private static emitter = new EventEmitter();
  static publishEvent(event: DomainEvent): void {
    this.events.push(event);
    this.emitter.emit(event.eventName, event);
  }
  static subscribeToEvent(eventType: string, callback: (payload: any) => void) {
    this.emitter.on(eventType, callback);
  }
}
