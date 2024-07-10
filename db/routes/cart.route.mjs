import { Router } from "express";
import {
  addToCart,
  clearCart,
  getCart,
  removeFromCart,
} from "../controller/cart.controller.js/index.js";

const router = Router();

router.post("/add", addToCart);
router.get("/cart/:userId", getCart);
router.delete("/remove", removeFromCart);
router.delete("/clear/:userId", clearCart);

export default router;
