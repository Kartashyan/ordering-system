import express from "express";
import {
  GetNextOrderUsecase,
  getNextOrderUsecase,
} from "../application/GetNextOrderUsecase";

export class GetNextOrderController {
  private useCase: GetNextOrderUsecase;
  constructor(useCase: GetNextOrderUsecase) {
    this.useCase = useCase;
  }
  async execute(req: express.Request, res: express.Response) {
    try {
      const result = await this.useCase.execute();
      if (!result.success) {
        res.status(400).send(result.reason);
        return;
      }
      res.type("application/json");
      return res.send(JSON.stringify(result.data));
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
