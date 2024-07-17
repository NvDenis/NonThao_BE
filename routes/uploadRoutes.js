import express from "express";
import multer from "multer";
import asyncHandler from "express-async-handler";
import CustomError from "../utils/CustomError.js";

const router = express.Router();

// Cấu hình nơi lưu trữ và tên file
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    console.log("file", file);
    const contentType = req.headers["upload-type"];
    let path = "uploads/";

    if (contentType === "hat") {
      path += "images/hat";
    } else if (contentType === "avatar") {
      path += "images/avatar";
    }
    cb(null, path); // Nơi lưu trữ file
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname); // Đặt tên file
  },
});

const upload = multer({ storage: storage });

router.post(
  "/uploads",
  upload.single("fileImg"),
  asyncHandler((req, res) => {
    console.log("file", req.file);
    if (!req.file) {
      throw new CustomError("Vui lòng chọn file", 400);
    }

    res.status(200).json({
      vcode: 0,
      data: {
        fileUploaded: req.file.filename,
      },
    });
  })
);

export default router;
