import express from "express";
import productController from "../controllers/productController.js";
const router = express.Router();

router
  .route("/:id")
  .get(productController.getDetailProduct)
  .delete(productController.deleteProduct)
  .put(productController.updateProduct);
router.route("/").get(productController.getProducts).post(productController.createProduct);

export default router;
