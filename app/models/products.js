import mongoose, { Schema, model } from "mongoose";

// "Diğer" kategorisinin ObjectId'sini buraya ekleyin
const defaultCategoryId = "64c8e73cfb48ac0012d14d6e";

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
    default: defaultCategoryId, // Buraya "Diğer" kategorisinin ObjectId'sini koyun
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
