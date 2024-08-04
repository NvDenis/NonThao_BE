import asyncHandler from "express-async-handler";
import User from "../models/userModels.js";

const getAllUsers = asyncHandler(async (req, res) => {
  const users = await User.find();
  res.json(users);
});

export default {
  getAllUsers,
};
