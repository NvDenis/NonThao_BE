import asyncHandler from "express-async-handler";
import Category from "../models/categoryModel.js";
import CustomError from "../utils/CustomError.js";

const getCategories = asyncHandler(async (req, res) => {
  const categories = await Category.find({});
  res.json({
    vcode: 0,
    data: categories,
  });
});
const createCategory = asyncHandler(async (req, res) => {
  const { name, thumb, banner, id_parent, link } = req.body;
  const category = new Category({
    name,
    thumb,
    banner,
    id_parent,
    link,
  });
  const createdCategory = await category.save();
  res.json({
    vcode: 0,
    message: "Thêm danh mục thành công",
    data: createdCategory,
  });
});

const deleteCategory = asyncHandler(async (req, res) => {
  const category = await Category.findByIdAndDelete(req.params.id);
  if (!category) {
    throw CustomError("Không tìm thấy danh mục", 404);
  }
  res.json({
    vcode: 0,
    message: "Xóa danh mục thành công",
  });
});
const updateCategory = asyncHandler(async (req, res) => {
  const { name, thumb, banner, id_parent, link } = req.body;
  await Category.replaceOne(
    { _id: req.params.id },
    {
      name,
      thumb,
      banner,
      id_parent,
      link,
    }
  );

  res.json({
    vcode: 0,
    message: "Cập nhật danh mục thành công",
  });
});

const getCategoriesByLink = asyncHandler(async (req, res) => {
  const categories = await Category.find({ link: req.params.link });

  res.json({
    vcode: 0,
    data: categories[0],
  });
});

export default {
  getCategories,
  createCategory,
  deleteCategory,
  updateCategory,
  getCategoriesByLink,
};
