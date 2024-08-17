import mongoose from "mongoose";

const otherSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Other = mongoose.models.Other || mongoose.model("Other", otherSchema);
export default Other;
