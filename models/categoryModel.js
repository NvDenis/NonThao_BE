import mongoose from "mongoose";

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    thumb: {
      type: String,
    },
    banner: {
      type: String,
    },
    id_parent: {
      type: mongoose.Schema.Types.ObjectId,
    },
    link: {
      type: String,
      required: true,
    },
  },
  { strict: false }
);

const Category = mongoose.model("Category", categorySchema);
export default Category;
