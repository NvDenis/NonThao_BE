import express from "express";
import userController from "../controllers/userController.js";

const router = express.Router();

router.route("/").get(userController.getAllUsers);

export default router;
