import mongoose from "mongoose";

const productSchema = mongoose.Schema({
  name: { type: String, required: true },
  id_category: { type: mongoose.Schema.Types.ObjectId, ref: "Category", required: true },
  units: [
    {
      color: { type: String, required: true },
      price: { type: Number, required: true },
      images: [{ type: String, required: true }],
    },
  ],
  status: { type: Boolean, required: true },
  active: { type: Boolean, required: true },
  desc: { type: String, required: true },
});

const Product = mongoose.model("Product", productSchema);

export default Product;
