import { Router } from "express";
import { getNextOrderController } from "../../orders/infra/get-next-order.controller";
import { kitchenQueue } from "../../orders/infra/kitchen.queue";
import { orderReadyController } from "../../orders/infra/order-ready.controller";
import { DomainEvents } from "../../shared/DomainEvents";
const router = Router();

DomainEvents.subscribeToEvent(
  "order-created",
  (payload: any) => {
    console.log("Order created", payload);
    kitchenQueue.enqueue(payload);
  }
);

router.get("/orders", (req, res) => {
  res.send("Return all panding orders");
});

router.get("/orders/next", async (req, res) =>
  getNextOrderController.execute(req, res)
);

router.patch("/orders/:orderId/ready", (req, res) =>
  orderReadyController.execute(req, res)
);
router.get("/events", (req, res) => {
  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");

  DomainEvents.subscribeToEvent(
    "order-created",
    (payload: any) => {
      console.log("Order created", payload);
      // send a nodification to the kitchen (server sent events)
      res.write(`data: ${JSON.stringify(payload)}`);
    }
  );
});
export default router;
