import express from "express";
import {
  createReview,
  deleteReview,
  getReviews,
  updateReview,
} from "../controller/reviews.controller.js";
const router = express.Router();

router.post("/rewiews", createReview);
router.get("/rewiews", getReviews);
router.put("/rewiews/:id", updateReview);
router.delete("/rewiews/:id", deleteReview);

export default router;
