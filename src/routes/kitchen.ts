import { Router } from "express";
import { DomainEvents } from "../domain/DomainEvents";
const router = Router();
DomainEvents.subscribeToEvent("order-created", (payload) => {
  debugger;
  console.log("Order created", payload);
});
router.get("/", (req, res) => {
  res.send("Kitchen");
});
export default router;
