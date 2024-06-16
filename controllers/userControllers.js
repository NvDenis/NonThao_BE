import asyncHandler from "express-async-handler";
import CustomError from "../utils/CustomError.js";
import User from "../models/userModels.js";
import bcrypt from "bcrypt";
import CreateToken from "../utils/CreateToken.js";

const handleRegister = asyncHandler(async (req, res) => {
  const { name, password, phone } = req.body;

  switch (true) {
    case !name:
      throw new CustomError("Name is required", 400);
    case !phone:
      throw new CustomError("Phone is required", 400);
    case !password:
      throw new CustomError("Password is required", 400);
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await User.create({
    name,
    phone,
    password: hashedPassword,
  });

  CreateToken(res, user._id);

  res.status(200).json({ data: user, vcode: 0 });
});

const handleLogin = asyncHandler(async (req, res) => {
  const { phone, password } = req.body;
  const user = await User.findOne({ phone });
  if (!user) {
    throw new CustomError("Invalid phone number or password", 401);
  }

  const isPasswordMatched = await bcrypt.compare(password, user.password);

  if (!isPasswordMatched) {
    throw new CustomError("Invalid phone number or password", 401);
  }

  CreateToken(res, user._id);

  res.status(200).json({ data: user, vcode: 0 });
});

const handleLogout = asyncHandler(async (req, res) => {
  res.cookie("token", null, {
    httpOnly: true,
    expires: new Date(0),
  });
  res.status(200).json({ vcode: 0 });
});

export { handleRegister, handleLogin, handleLogout };
