import express from "express";
import {
  PickupOrderStatusUsecase,
  pickupOrderStatusUsecase,
} from "../application/pickup-order.usecase";

export class PickupOrderController {
  private useCase: PickupOrderStatusUsecase;
  constructor(useCase: PickupOrderStatusUsecase) {
    this.useCase = useCase;
  }
  async execute(req: express.Request, res: express.Response) {
    const id = req.params.orderId;
    try {
      const result = await this.useCase.execute({ id });
      if (!result.isOk()) {
        res.status(400).send(result.error());
        return;
      }
      res.status(200).send("Order picked up");
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

export const pickupOrderController = new PickupOrderController(
  pickupOrderStatusUsecase
);
