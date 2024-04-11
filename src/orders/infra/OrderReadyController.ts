import express from "express";
import {
  OrderReadyUsecase,
  orderReadyUsecase,
} from "../application/OrderReadyUsecase";

export class OrderReadyController {
  private useCase: OrderReadyUsecase;
  constructor(useCase: OrderReadyUsecase) {
    this.useCase = useCase;
  }
  async execute(req: express.Request, res: express.Response) {
    const id = req.params.orderId;
    try {
      const result = await this.useCase.execute({ id });
      if (!result.success) {
        res.status(400).send(result.reason);
        return;
      }
      res.status(200).send("Order ststus updated to ready for pickup");
    } catch (error: unknown) {
      res
        .status(500)
        .send(
          `Internal error: ${String(
            typeof error === "string" ? error : JSON.stringify(error)
          )}`
        );
    }
  }
}

export const orderReadyController = new OrderReadyController(orderReadyUsecase);
