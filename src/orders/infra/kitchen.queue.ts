
export class KitchenQueue {
  items: string[];
  constructor() {
    this.items = [];
  }
  enqueue(orderID: string) {
    this.items.push(orderID);
  }
  dequeue() {
    return this.items.shift();
  }
}

export const kitchenQueue = new KitchenQueue();
