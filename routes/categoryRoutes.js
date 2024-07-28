import express from "express";
const router = express.Router();
import categoryController from "../controllers/categoryController.js";

router.route("/").get(categoryController.getCategories).post(categoryController.createCategory);

router
  .route("/:id")
  .delete(categoryController.deleteCategory)
  .put(categoryController.updateCategory);

router.route("/:link").get(categoryController.getCategoriesByLink);

export default router;
