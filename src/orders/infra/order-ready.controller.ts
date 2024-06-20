import express from "express";
import {
  OrderReadyUsecase,
  orderReadyUsecase,
} from "../application/order-ready.usecase";

export class OrderReadyController {
  private useCase: OrderReadyUsecase;
  constructor(useCase: OrderReadyUsecase) {
    this.useCase = useCase;
  }
  async execute(req: express.Request, res: express.Response) {
    const id = req.params.orderId;
    try {
      const result = await this.useCase.execute({ id });
      if (result.isFail()) {
        res.status(400).send(result.error());
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
