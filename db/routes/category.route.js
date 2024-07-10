import express from "express";
import {
  createCategory,
  deleteCategoryById,
  getAllCategories,
  updateCategoryById,
} from "../controller/category.controller";

const router = express.Router();

router.post("/categories", createCategory);
router.get("/categories", getAllCategories);
router.put("/categories/:id", updateCategoryById);
router.delete("/categories/:id", deleteCategoryById);

export default router;
