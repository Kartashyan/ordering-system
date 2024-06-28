import express from "express";
import bodyParser from "body-parser";

import ordersRouter from "./routes/orders";
import menuRouter from "./routes/menu";
import kitchenRouter from "./routes/kitchen";
import { PrismaClient } from "@prisma/client";
import { kitchenQueue } from "../orders/infra/kitchen.queue";
const prisma = new PrismaClient();

const app = express();
const PORT = process.env.PORT || 3000;
app.use(bodyParser.json());

app.use("/api/orders", ordersRouter);
app.use("/api/menu", menuRouter);
app.use("/api/kitchen", kitchenRouter);

app.listen(PORT, async () => {
  console.log(`Server running on port ${PORT}`);
  // add panding orders to the kitchen queue ordered by creation date
  const orders = await prisma.order.findMany({ where: { status: "Pending" } });
  orders.forEach((order) => {
    kitchenQueue.enqueue(order.id);
  });
});
