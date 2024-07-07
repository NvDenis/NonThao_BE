import express from "express";
import authController from "../controllers/authController.js";
import verifyToken from "../middleware/verifyToken.js";
const router = express.Router();

router.post("/register", authController.register);
router.post("/login", authController.login);
router.post("/logout", authController.logout);
router.get("/account", verifyToken, authController.account);
router.get("/refresh", authController.refresh);

export default router;
