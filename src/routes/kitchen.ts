import { Router } from "express";
import { DomainEvents } from "../domain/DomainEvents";
const router = Router();
DomainEvents.subscribeToEvent("order-created", (payload) => {
  debugger;
  console.log("Order created", payload);
  // add to the kitchen queue
  // send a nodification to the kitchen
});
router.get("/", (req, res) => {
  res.send("Kitchen");
});
export default router;
