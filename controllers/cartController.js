import asyncHandler from "express-async-handler";
import Product from "../models/productModel.js";
import CustomError from "../utils/CustomError.js";
import User from "../models/userModels.js";

// Thêm sản phẩm vào giỏ hàng
const addToCart = asyncHandler(async (req, res) => {
  const { product, quantity, name, images, price, color } = req.body;
  const userId = req.user._id;
  let user = await User.findById(userId);

  if (!user) {
    throw new CustomError("Người dùng không tồn tại", 404);
  }

  const findProduct = await Product.findById(product);
  if (!findProduct) {
    throw new CustomError("Sản phẩm không tồn tại", 404);
  }

  const itemIndex = user.cart.findIndex((item) => item.product.toString() == product);
  if (itemIndex > -1) {
    user.cart[itemIndex].quantity += quantity;
  } else {
    user.cart.push(req.body);
  }

  await user.save();
  res.status(200).json({
    vcode: 0,
    data: user.cart,
    message: "Thêm sản phẩm vào giỏ hàng thành công",
  });
});

// Xóa sản phẩm khỏi giỏ hàng
const removeFromCart = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const userId = req.user._id;

  const user = await User.findById(userId);
  if (!user) {
    throw new CustomError("Người dùng không tồn tại", 404);
  }

  user.cart = user.cart.filter((item) => String(item._id) != id);
  await user.save();

  res.status(200).json({
    vcode: 0,
    data: user.cart,
    message: "Xóa sản phẩm khỏi giỏ hàng thành công",
  });
});

// Sửa số lượng sản phẩm trong giỏ hàng
const updateCartItem = asyncHandler(async (req, res) => {
  const { quantity } = req.body;
  const { id } = req.params;
  const userId = req.user._id;

  const user = await User.findById(userId);
  if (!user) {
    throw new CustomError("Người dùng không tồn tại", 404);
  }

  const itemIndex = user.cart.findIndex((item) => String(item._id) === id);
  if (itemIndex > -1) {
    user.cart[itemIndex].quantity = quantity;
  } else {
    throw new CustomError("Sản phẩm không tồn tại trong giỏ hàng", 404);
  }

  await user.save();
  res.status(200).json({
    vcode: 0,
    data: user.cart,
    message: "Cập nhật giỏ hàng thành công",
  });
});

export default { addToCart, removeFromCart, updateCartItem };
