import express from "express";
import {
  getUserProfile,
  signInController,
  signUpController,
} from "../controller/user.controller.js";

const router = express.Router();

router.post("/register", signUpController);
router.post("/signin", signInController);
router.get("/users/profile", getUserProfile);

export default router;
