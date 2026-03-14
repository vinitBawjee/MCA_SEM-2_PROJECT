import express from "express";
import { authController } from "../controllers/index.js";

const router = express.Router();

router.post("/register", authController.register);
router.post("/login", authController.login);
router.post("/forgot/send-otp", authController.sendOtp);
router.post("/forgot/verify-otp", authController.verifyOtp);
router.post("/forgot/reset-password", authController.resetPassword);

export default router;