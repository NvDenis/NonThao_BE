import express from "express";
import { handleLogin, handleRegister, handleLogout } from "../controllers/userControllers.js";

const router = express.Router();

router.post("/register", handleRegister);
router.post("/login", handleLogin);
router.post("/logout", handleLogout);

export default router;
