import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/connectDB.js";
import userRoutes from "./routes/userRoutes.js";
import NotFound from "./middleware/not-found.js";
import errorHandler from "./middleware/err-handler.js";
import cors from "cors";

dotenv.config();
const PORT = process.env.PORT || 3001;
const app = express();

app.use(
  cors({
    origin: ["http://127.0.0.1:5173", "https://non-thao-fe.vercel.app"],
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1/user", userRoutes);

app.use("*", NotFound);
app.use(errorHandler);

const start = async () => {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`Server running on port: ${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
