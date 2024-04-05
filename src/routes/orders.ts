import { Router } from "express";
import { createOrderController } from "../infra/CreateOrderController";
import { pickupOrderController } from "../infra/PickupOrderController";
const router = Router();

router.get("/", (req, res) => {});

router.post("/", async (req, res) => createOrderController.execute(req, res));

router.get("/:orderId", (req, res) => {});

router.patch("/:orderId", async (req, res) => {});

router.get("/:orderId/pickup", async (req, res) =>
  pickupOrderController.execute(req, res)
);

export default router;
