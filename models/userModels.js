import mongoose from "mongoose";
const { Schema } = mongoose;

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  email: {
    type: String,
  },
  city: {
    type: String,
  },
  district: {
    type: String,
  },
  commune: {
    type: String,
  },
  password: {
    type: String,
    required: true,
  },
  address: {
    type: String,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  cart: {
    type: Array,
    default: [],
  },
  avatar: {
    type: String,
  },
});

const User = mongoose.model("User", userSchema);

export default User;
