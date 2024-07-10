import { Router } from "express";
import {
  addBasketItem,
  deleteBasketItem,
  getBasketItems,
} from "../controller/basket.controller.js/index.js";
const router = Router();

router.post("/add", addBasketItem);
router.get("/:userId", getBasketItems);
router.delete("/:id", deleteBasketItem);

export default router;
