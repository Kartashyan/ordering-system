import { z } from "zod";
import { CreateOrderUsecase } from "../application/create-order.usecase";
import express from "express";
import { orderRepository } from "./order-prisma.repo-adapter";
import { OrderDto, OrderDtoSchema } from "../dto/orderDto";

class CreateOrderController {
  private useCase: CreateOrderUsecase;
  constructor(useCase: CreateOrderUsecase) {
    this.useCase = useCase;
  }
  async execute(req: express.Request, res: express.Response) {
    const orderDto = req.body as OrderDto;
    const dtoSafeParsed = OrderDtoSchema.safeParse(orderDto);
    if (!dtoSafeParsed.success) {
      res.status(400).send(dtoSafeParsed.error.errors);
      return;
    }
    try {
      const result = await this.useCase.execute(orderDto);
      if (!result.success) {
        res.status(400).send(result.reason);
        return;
      }
      res.status(201).send("Order created");
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
const createOrderUsecase = new CreateOrderUsecase(orderRepository);
export const createOrderController = new CreateOrderController(
  createOrderUsecase
);
