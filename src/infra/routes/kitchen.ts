import { Router } from "express";
import { DomainEvents } from "../../shared/DomainEvents";
import {
  NotifyKitchenEvent,
  NotifyKitchenEventPayload,
} from "../../order-service/domain/events/NotifyKitchenEvent";
import { OrderCreatedEventPayload } from "../../order-service/domain/events/OrderCreatedEvent";
import { getNextOrderController } from "../../order-service/infra/GetNextOrderController";
import { kitchenQueue } from "../../order-service/infra/KitchenQueue";
import { orderReadyController } from "../../order-service/infra/OrderReadyController";
const router = Router();

DomainEvents.subscribeToEvent(
  "order-created",
  (payload: OrderCreatedEventPayload) => {
    console.log("Order created", payload);
    kitchenQueue.enqueue(payload);
    DomainEvents.publishEvent(new NotifyKitchenEvent(payload));
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
    "notify-kitchen",
    (payload: NotifyKitchenEventPayload) => {
      console.log("Order created", payload);
      // send a nodification to the kitchen (server sent events)
      res.write(`data: ${JSON.stringify(payload)}`);
    }
  );
});
export default router;
