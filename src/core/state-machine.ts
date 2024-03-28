export enum OrderEvent {
  PlaceOrder = "place order",
  StartPreparation = "start preparation",
  MarkAsReady = "mark as ready",
  CompleteOrder = "complete order",
}

export enum OrderStatus {
  Pending = "Pending",
  InPreparation = "InPreparation",
  ReadyForPickup = "ReadyForPickup",
  Completed = "Completed",
}

export class OrderStateMachine {
  private currentState: OrderStatus;

  constructor() {
    this.currentState = OrderStatus.Pending; // Default state
  }

  transition(event: OrderEvent): void {
    switch (event) {
      case OrderEvent.PlaceOrder:
        if (this.currentState === OrderStatus.Pending) {
          this.currentState = OrderStatus.InPreparation;
          console.log("Order is now in preparation.");
        }
        break;
      case OrderEvent.StartPreparation:
        if (this.currentState === OrderStatus.InPreparation) {
          this.currentState = OrderStatus.ReadyForPickup;
          console.log("Order is ready for pickup.");
        }
        break;
      case OrderEvent.MarkAsReady:
        if (this.currentState === OrderStatus.ReadyForPickup) {
          this.currentState = OrderStatus.Completed;
          console.log("Order has been completed.");
        }
        break;
      default:
        console.log("Invalid transition.");
    }
  }

  getCurrentState(): OrderStatus {
    return this.currentState;
  }
}
