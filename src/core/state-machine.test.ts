import { describe, it, expect } from "vitest";
import { OrderStateMachine, OrderStatus, OrderEvent } from "./state-machine";

describe("OrderStateMachine", () => {
  it("should transition from Pending to InPreparation", () => {
    const machine = new OrderStateMachine();
    machine.transition(OrderEvent.PlaceOrder);
    expect(machine.getCurrentState()).toBe(OrderStatus.InPreparation);
  });

  it("should transition from InPreparation to ReadyForPickup", () => {
    const machine = new OrderStateMachine();
    machine.transition(OrderEvent.PlaceOrder); // Necessary to move to InPreparation first
    machine.transition(OrderEvent.StartPreparation);
    expect(machine.getCurrentState()).toBe(OrderStatus.ReadyForPickup);
  });

  it("should transition from ReadyForPickup to Completed", () => {
    const machine = new OrderStateMachine();
    machine.transition(OrderEvent.PlaceOrder);
    machine.transition(OrderEvent.StartPreparation);
    machine.transition(OrderEvent.MarkAsReady);
    expect(machine.getCurrentState()).toBe(OrderStatus.Completed);
  });

  it("should not transition out of Completed", () => {
    const machine = new OrderStateMachine();
    machine.transition(OrderEvent.PlaceOrder);
    machine.transition(OrderEvent.StartPreparation);
    machine.transition(OrderEvent.MarkAsReady);
    machine.transition(OrderEvent.CompleteOrder); // Attempt an invalid transition
    expect(machine.getCurrentState()).toBe(OrderStatus.Completed);
  });
});
