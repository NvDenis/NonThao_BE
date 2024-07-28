import asyncHandler from "express-async-handler";
import Product from "../models/productModel.js";
import CustomError from "../utils/CustomError.js";

const getDetailProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    throw new CustomError("Sản phẩm không tồn tại", 404);
  }
  return res.status(200).json({
    data: product,
    vcode: 0,
  });
});

const getProductsByCategory = asyncHandler(async (req, res) => {
  const products = await Product.find({ id_category: req.params.id });
  return res.status(200).json({
    data: products,
    vcode: 0,
  });
});

// Admin controllers 👇
const getProducts = asyncHandler(async (req, res) => {
  const { current, pageSize } = req.query;

  // Chuyển đổi sang số và xác định giá trị mặc định
  const currentNum = parseInt(current, 10) || 1;
  const pageSizeNum = parseInt(pageSize, 10) || 10;

  // Kiểm tra giá trị hợp lệ
  if (currentNum < 1 || pageSizeNum < 1) {
    // Xử lý trường hợp giá trị không hợp lệ
    throw new CustomError("Giá trị truy vấn không hợp lệ", 400);
  }

  const products = await Product.find()
    .limit(pageSizeNum)
    .skip((currentNum - 1) * pageSizeNum);

  return res.status(200).json({
    data: {
      meta: {
        current: currentNum,
        pageSize: pageSizeNum,
        total: await Product.countDocuments(),
      },
      result: products,
    },
    vcode: 0,
  });
});

const createProduct = asyncHandler(async (req, res) => {
  const { name, price, costPrice, status, active, desc, units } = req.body;

  switch (true) {
    case !name:
      throw new CustomError("Vui lòng nhập tên sản phẩm", 400);
    case units.length == 0:
      throw new CustomError("Vui lòng nhập thuộc tính", 400);
  }

  const product = new Product(req.body);

  await product.save();

  return res.status(201).json({
    data: product,
    vcode: 0,
    message: "Tạo sản phẩm thành công",
  });
});

const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findByIdAndDelete(req.params.id);

  if (!product) {
    throw new CustomError("Sản phẩm không tồn tại", 404);
  }

  return res.status(200).json({
    vcode: 0,
    message: "Xóa sản phẩm thành công",
  });
});

const updateProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const product = await Product.findById(id);

  if (!product) {
    throw new CustomError("Sản phẩm không tồn tại", 404);
  }

  const fieldsToUpdate = [
    "name",
    "image",
    "price",
    "discountedPrice",
    "inStock",
    "desc",
    "introduction",
  ];
  fieldsToUpdate.forEach((field) => {
    if (req.body[field] !== undefined) {
      product[field] = req.body[field];
    }
  });

  await product.save();

  return res.status(200).json({
    data: product,
    vcode: 0,
    message: "Cập nhật sản phẩm thành công",
  });
});

export default {
  getDetailProduct,
  getProducts,
  createProduct,
  deleteProduct,
  updateProduct,
  getProductsByCategory,
};
