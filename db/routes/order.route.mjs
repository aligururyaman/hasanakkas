import express from "express";
import {
  createOrder,
  getAllOrders,
  getOrdersByUserId,
  updateOrder,
} from "../controller/order.controller.js/index.js";

const router = express.Router();

router.post("/orders", createOrder);
router.get("/orders/user/:userId", getOrdersByUserId);
router.get("/orders", getAllOrders);
router.put("/orders/:id", updateOrder);

export default router;
