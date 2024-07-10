import mongoose, { Schema as _Schema, model } from "mongoose";
const Schema = _Schema;

const basketSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  productId: {
    type: Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  totalAmount: {
    type: Number,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Basket = mongoose.models.Basket || mongoose.model("Basket", basketSchema);
export default Basket;
