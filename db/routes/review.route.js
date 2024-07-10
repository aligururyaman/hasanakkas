import express from "express";
const {
  createReview,
  getReviews,
  updateReview,
  deleteReview,
} = require("../controller/reviews.controller");
const router = express.Router();

router.post("/rewiews", createReview);
router.get("/rewiews", getReviews);
router.put("/rewiews/:id", updateReview);
router.delete("/rewiews/:id", deleteReview);

module.exports = router;
