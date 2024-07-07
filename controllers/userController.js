import asyncHandler from "express-async-handler";

const getAllUsers = asyncHandler(async (req, res) => {
  const users = await User.find();
  res.json(users);
});

export default {
  getAllUsers,
};
