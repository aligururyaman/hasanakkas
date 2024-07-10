import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  slug: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    required: true,
  },
  imageUrl: {
    type: String,
  },
  reviews: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Reviews",
  },
  quantity: {
    type: Number,
    required: true,
  },
});

const Product =
  mongoose.models.Product || mongoose.model("Product", productSchema);
export default Product;
