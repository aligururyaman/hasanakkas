import express from "express";
import { upload } from "../middleware/multer";
import {
  createProduct,
  deleteProduct,
  getAllProducts,
  getProductsById,
  updateProducts,
} from "../controller/product.controller.js/index.js";

const router = express.Router();

router.post("/products", upload.single("image"), createProduct);
router.get("/products", getAllProducts);
router.get("/products/:id", getProductsById);
router.put("/products/:id", upload.single("image"), updateProducts);
router.delete("/products/:id", deleteProduct);

export default router;
