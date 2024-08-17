import mongoose, { Schema, model } from "mongoose";

const productSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  slug: {
    type: String,
    required: true,
    unique: true,
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
    type: Schema.Types.ObjectId,
    ref: "Category",
    required: true,
  },
  imageUrl: {
    type: String,
  },
  quantity: {
    type: Number,
    default: 0,
  },
});

const Products =
  mongoose.models.Products || mongoose.model("Products", productSchema);

export default Products;
