import { Router } from "express";
const router = Router();
import { createOrder, updateOrderStatus } from "../services/orders";
import { OrderRequestSchema, OrderStatusSchema } from "../core/orders";

router.post("/", async (req, res) => {
  try {
    const result = OrderRequestSchema.safeParse(req.body);
    if (!result.success) {
      return res.status(400).json(result.error.format());
    }
    const validatedData = result.data;
    const order = await createOrder(validatedData);
    res.status(201).json(order);
  } catch (error) {
    console.error("Error creating order:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/:orderId", (req, res) => {});

router.patch("/:orderId", async (req, res) => {
  // Implementation for updating an order's status
  try {
    // Validate the request body
    const result = OrderStatusSchema.safeParse(req.body);
    if (!result.success) {
      return res.status(400).json(result.error.format());
    }
    const validatedData = result.data;
    const updatedOrder = await updateOrderStatus(
      req.params.orderId,
      validatedData
    );
    res.json(updatedOrder);
  } catch (error) {
    console.error("Error updating order status:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/", (req, res) => {});

export default router;
