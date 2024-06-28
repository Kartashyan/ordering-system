import { EventEmitter } from "events";
import { DomainEvent } from "./core/domain-event";

export class LocalEventManager {
  private static emitter = new EventEmitter();
  static publishEvent(event: DomainEvent): void {
    this.emitter.emit(event.eventName, event);
  }
  static subscribeToEvent(eventType: string, callback: (payload: any) => void) {
    this.emitter.on(eventType, callback);
  }
}
