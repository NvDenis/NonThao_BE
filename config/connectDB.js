import mongoose from "mongoose";

const connectDB = async () => {
  try {
    return (await mongoose.connect("mongodb+srv://duycute248:duycute248@cluster0.ynpjzks.mongodb.net/web_non")).then(() => console.log('Connected to MongoDB')).catch(err => console.log(err));
  } catch (error) {
    console.log("error", error);
  }
};

export default connectDB;
