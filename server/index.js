import mongoose from "mongoose";
import express from "express";
import cors from "cors";
import userRoutes from "../db/routes/user.route.js";
import categoryRoutes from "../db/routes/category.route.js";
import productRoutes from "../db/routes/product.route.js"
import reviewsRoutes from "../db/routes/review.route.js"
import otherRoutes from "../db/routes/other.route.js"
import cartRoutes from "../db/routes/cart.route.js"

import cloudinary from "cloudinary"
import { configDotenv } from "dotenv";




configDotenv();




export const metadata = {
  title: "Hasan Akkaş",
  description: "1900den beri",
};

mongoose
  .connect(
    `mongodb+srv://${process.env.MONGO_ID}:${process.env.MONGO_PASS}@akkastic-store.othv893.mongodb.net/${process.env.MONGO_DATA}?retryWrites=true&w=majority`
  )
  .then(() => {
    console.log("Database Connected");
  })
  .catch((error) => {
    console.error("Database connection error:", error);
  });

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

const app = express();

app.get("/healthCheck", (req, res) => {
  res.send("ok");
});

app.use(cors());
app.use(express.json());
app.use("/api", userRoutes);
app.use("/api", categoryRoutes);
app.use("/api", productRoutes);
app.use("/api", reviewsRoutes);
app.use("/api", otherRoutes)
app.use('/api', cartRoutes);


app.listen(2000, () => {
  console.log("Your server is running on port 2000");
});




