import asyncHandler from "express-async-handler";
import CustomError from "../utils/CustomError.js";
import User from "../models/userModels.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { CreateAccessToken, CreateRefreshToken } from "../utils/CreateToken.js";

const register = asyncHandler(async (req, res) => {
  const { name, password, phone } = req.body;

  switch (true) {
    case !name:
      throw new CustomError("Name is required", 400);
    case !phone:
      throw new CustomError("Phone is required", 400);
    case !password:
      throw new CustomError("Password is required", 400);
  }

  const foundUser = await User.findOne({ phone });
  if (foundUser) {
    throw new CustomError("Số điện thoại đã tồn tại", 400);
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await User.create({
    name,
    phone,
    password: hashedPassword,
  });

  const accessToken = CreateAccessToken(user);
  CreateRefreshToken(res, user._id);

  delete user.password;
  delete user.__v;
  user.accessToken = accessToken;

  res.status(200).json({ data: user, vcode: 0, message: "Đăng ký thành công" });
});

const login = asyncHandler(async (req, res) => {
  const { phone, password } = req.body;

  if (!phone || !password) {
    throw new CustomError("Vui nhập đầy đủ thông tin!", 400);
  }

  const foundUser = await User.findOne({ phone });

  if (!foundUser) {
    throw new CustomError("Thông tin không chính xác!", 401);
  }

  if (!foundUser.active) {
    throw new CustomError("Tài khoản của bạn đã bị khóa!", 401);
  }

  const match = await bcrypt.compare(password, foundUser.password);

  if (!match) {
    throw new CustomError("Thông tin không chính xác!", 401);
  }

  const accessToken = CreateAccessToken(foundUser._doc);
  CreateRefreshToken(res, foundUser._id);

  const user = {
    ...foundUser._doc,
    accessToken,
  };

  delete user.password;
  delete user.__v;

  res.status(200).json({ data: user, vcode: 0, message: "Đăng nhập thành công" });
});

const refresh = asyncHandler(async (req, res) => {
  const cookies = req.cookies;

  if (!cookies.refreshToken) {
    throw new CustomError("Bạn chưa đăng nhập", 401);
  }

  jwt.verify(cookies.refreshToken, process.env.REFRESH_TOKEN_SECRET, async (err, decoded) => {
    if (err) {
      // Xóa cookie refreshToken
      res.setHeader(
        "set-cookie",
        "refreshToken=;Path=/; HttpOnly; Max-Age=0; SameSite=None; Secure; Partitioned"
      );
      return res.status(401).json({ message: "Phiên của bạn đã hết hạn", vcode: 1 });
    }

    const user = await User.findById(decoded.userId);
    if (!user) {
      return res.status(401).json({ message: "Không tìm thấy người dùng", vcode: 1 });
    }

    const accessToken = CreateAccessToken(user);
    res.status(200).json({ accessToken, vcode: 0 });
  });
});

const logout = asyncHandler(async (req, res) => {
  const cookies = req.cookies;
  if (!cookies.refreshToken) {
    throw new CustomError("Bạn chưa đăng nhập", 401);
  }

  res.setHeader(
    "set-cookie",
    "refreshToken=;Path=/; HttpOnly; Max-Age=0; SameSite=None; Secure; Partitioned"
  );
  res.status(200).json({ vcode: 0, message: "Đăng xuất thành công" });
});

const account = asyncHandler(async (req, res) => {
  const foundUser = await User.findById(req.user._id);
  if (!foundUser) {
    throw new CustomError("Không tìm thấy người dùng", 404);
  }

  if (!foundUser.active) {
    throw new CustomError("Tài khoản của bạn đã bị khóa!", 401);
  }

  const user = {
    ...foundUser._doc,
  };
  delete user.password;
  delete user.__v;

  res.status(200).json({ data: user, vcode: 0 });
});

export default { register, login, logout, refresh, account };
