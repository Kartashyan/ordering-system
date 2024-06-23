import { describe, it, expect } from "vitest";
import { Order, OrderItemProps } from "./Order";
import { StatusStateManager } from "../OrderStatusManager";

describe("Order", () => {
  let order: Order;
  const items: OrderItemProps[] = [
    { id: 1, quantity: 2 },
    { id: 2, quantity: 1 },
  ];

  it("should create an order with the provided items, id, and status", () => {
    const order = Order.create(items, "123", "Pending");
    expect(order.id).toBe("123");
    expect(order.status).toBe("Pending");
    expect(order.items).toEqual(items);
  });

  it("should change the status of the order if transition is valid", () => {
    const order = Order.create(items, "123", "Pending");
    const nextState = StatusStateManager.getNextState(order.status);
    order.changeStatusTo(nextState);
    expect(order.status).toBe("InPreparation");
  });
  it("should throw an error if the status is invalid", () => {
    const order = Order.create(items, "123", "Pending");
    expect(() => order.changeStatusTo("invalid" as any)).toThrowError();
  });
  it("should throw an error if the status is the final state", () => {
    const order = Order.create(items, "123", "Completed");
    expect(() =>
      order.changeStatusTo(StatusStateManager.getNextState(order.status))
    ).toThrowError();
  });
  it("should throw an error if the status transition is not valid", () => {
    const order = Order.create(items, "123", "InPreparation");
    expect(() => order.changeStatusTo("Pending")).toThrowError();
  });
});
