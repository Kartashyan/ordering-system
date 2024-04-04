import { Router } from "express";
import { createOrderController } from "../infra/CreateOrderController";
const router = Router();

router.post("/", async (req, res) => createOrderController.execute(req, res));

router.get("/:orderId", (req, res) => {});

router.patch("/:orderId", async (req, res) => {});

router.get("/", (req, res) => {});

export default router;
