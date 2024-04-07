import { Router } from "express";
import { DomainEvents } from "../domain/DomainEvents";
import {
  NotifyKitchenEvent,
  NotifyKitchenEventPayload,
} from "../domain/core/NotifyKitchenEvent";
import { OrderCreatedEventPayload } from "../domain/core/OrderCreatedEvent";
import { getNextOrderController } from "../infra/GetNextOrderController";
import { kitchenQueue } from "../infra/KitchenQueue";
const router = Router();

DomainEvents.subscribeToEvent(
  "order-created",
  (payload: OrderCreatedEventPayload) => {
    console.log("Order created", payload);
    //TODO: add to the kitchen queue
    kitchenQueue.enqueue(payload.orderId);
    debugger;
    DomainEvents.publishEvent(new NotifyKitchenEvent(payload.orderId));
  }
);

router.get("/orders", (req, res) => {
  res.send("Return all panding orders");
});

router.get("/orders/next", async (req, res) =>
  getNextOrderController.execute(req, res)
);

router.post("/orders/:orderId/ready", (req, res) => {
  const orderId = req.params.orderId;
  //TODO: mark order as ready
  //TODO: emit notify-customer event
  res.send(`Order ${orderId} is ready`);
});
router.get("/events", (req, res) => {
  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");

  DomainEvents.subscribeToEvent(
    "notify-kitchen",
    (payload: NotifyKitchenEventPayload) => {
      debugger;
      console.log("Order created", payload);
      // send a nodification to the kitchen (server sent events)
      res.write(`data: ${JSON.stringify(payload)}`);
    }
  );
});
export default router;
