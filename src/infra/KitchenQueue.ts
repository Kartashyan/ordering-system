import { Order } from "../domain/core/Order";

export class KitchenQueue {
  items: Order[];
  constructor() {
    this.items = [];
  }
  enqueue(order: Order) {
    this.items.push(order);
  }
  dequeue() {
    return this.items.shift();
  }
}
