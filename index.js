import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/connectDB.js";
import userRoutes from "./routes/userRoutes.js";
import NotFound from "./middleware/notFound.js";
import errorHandler from "./middleware/errorHandler.js";
import authRoutes from "./routes/authRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js";
import cookieParser from "cookie-parser";
import fs from "fs";
import https from "https";
import cors from "cors";

dotenv.config();
const PORT = process.env.PORT || 3001;
const app = express();

app.use(
  cors({
    origin: ["http://localhost:5173", "http://127.0.0.1:5173", "https://non-thao-fe.vercel.app"],
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static("./uploads"));

app.use("/api/v1/user", userRoutes);
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/product", productRoutes);
app.use("/api/v1/file", uploadRoutes);

app.use("*", NotFound);
app.use(errorHandler);

const start = async () => {
  try {
    await connectDB();
    https
      .createServer(
        {
          key: fs.readFileSync("./localhost+1-key.pem"),
          cert: fs.readFileSync("./localhost+1.pem"),
        },
        app
      )
      .listen(PORT, () => {
        console.log(`Server running on port: ${PORT}`);
      });
  } catch (error) {
    console.log(error);
  }
};

start();
