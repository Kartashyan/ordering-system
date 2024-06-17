import express from "express";
import {
  GetNextOrderUsecase,
  getNextOrderUsecase,
} from "../application/get-next-order.usecase";

export class GetNextOrderController {
  private useCase: GetNextOrderUsecase;
  constructor(useCase: GetNextOrderUsecase) {
    this.useCase = useCase;
  }
  async execute(req: express.Request, res: express.Response) {
    try {
      const result = await this.useCase.execute();
      if (result.isFail()) {
        return res.status(404).send(result.error());
      }
      res.type("application/json");
      res.status(200).send(result.value());
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

export const getNextOrderController = new GetNextOrderController(
  getNextOrderUsecase
);
