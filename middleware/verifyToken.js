import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import CustomError from "../utils/CustomError.js";

const verifyToken = asyncHandler(async (req, res, next) => {
  const accessToken = req.headers["authorization"]?.split(" ")[1];

  if (!accessToken) {
    throw new CustomError("Bạn chưa đăng nhập", 401);
  }

  jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET, async (err, decoded) => {
    if (err) {
      return res.status(401).json({ vcode: 1, message: "Phiên của bạn đã hết hạn" });
    }

    req.user = decoded.userInfo;
    next();
  });
});

export default verifyToken;
