import express from "express";
import {
  createOther,
  deleteOtherById,
  getAllOther,
  updateOtherById,
} from "../controller/other.controller";

const router = express.Router();

router.post("/other", createOther);
router.get("/other", getAllOther);
router.put("/other/:id", updateOtherById);
router.delete("/other/:id", deleteOtherById);

export default router;
