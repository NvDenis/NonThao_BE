import express from "express";
import productController from "../controllers/productController.js";
const router = express.Router();

router
  .route("/data/:id")
  .get(productController.getDetailProduct)
  .delete(productController.deleteProduct)
  .put(productController.updateProduct);
router.route("/data/").get(productController.getProducts).post(productController.createProduct);

router.route("/category/:id").get(productController.getProductsByCategory);

router.route("/link/:link").get(productController.getProductByLink);

export default router;
