export enum OrderStatuses {
  Pending = "Pending",
  InPreparation = "InPreparation",
  ReadyForPickup = "ReadyForPickup",
  Completed = "Completed",
}

export class OrderStatus {
  public readonly value: string;
  private constructor(value: string) {
    this.value = value;
  }

  public static create(value: string): OrderStatus {
    if (!StatusStateManager.isValidState(value)) {
      throw new Error(`'${value}' is not a valid order status.`);
    }
    return new OrderStatus(value);
  }
}

export class StatusStateManager {
  private static readonly StatusStateFlowList = Object.values(
    OrderStatuses
  ) as string[];

  public static canTransition(from: string, to: string): boolean {
    if (!this.StatusStateFlowList.includes(from)) {
      return false;
    }
    if (!this.StatusStateFlowList.includes(to)) {
      return false;
    }

    const fromIndex = this.StatusStateFlowList.indexOf(from);
    const toIndex = this.StatusStateFlowList.indexOf(to);

    if (fromIndex >= toIndex) {
      return false;
    }
    if (fromIndex + 1 !== toIndex) {
      return false;
    }
    return true;
  }

  public static getNextState(currentState: string): string {
    if (!this.StatusStateFlowList.includes(currentState)) {
      throw new Error(`'${currentState}' is not a valid order status.`);
    }

    const currentStateIndex = this.StatusStateFlowList.indexOf(currentState);
    if (currentStateIndex === this.StatusStateFlowList.length - 1) {
      throw new Error(`'${currentState}' is the final state.`);
    }

    return this.StatusStateFlowList[currentStateIndex + 1];
  }
  public static isValidState(state: string): boolean {
    return this.StatusStateFlowList.includes(state);
  }
}
