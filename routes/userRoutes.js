import express from "express";
import userController from "../controllers/userController.js";
import cartController from "../controllers/cartController.js";
import verifyToken from "../middleware/verifyToken.js";

const router = express.Router();

router
  .route("/cart/:id")
  .delete(verifyToken, cartController.removeFromCart)
  .put(verifyToken, cartController.updateCartItem);

router.route("/data").get(userController.getAllUsers);
router.route("/cart").post(verifyToken, cartController.addToCart);

export default router;
