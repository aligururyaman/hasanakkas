import express, { json } from "express";
import { config } from "dotenv";
import { connect } from "mongoose";
import cors from "cors";
import { v2 as cloudinary } from "cloudinary";

// Import routes
import userRoutes from "./routes/user.routes";
import categoryRoutes from "./routes/category.routes";
import productRoutes from "./routes/product.routes";
import reviewsRoutes from "./routes/reviews.routes";
import cartRoutes from "./routes/cart.route";
import orderRoutes from "./routes/order.route";

// Initialize Express app
const app = express();

// Configure environment variables
config();

// Note: you have create your own MongoDB Database
// Connect to MongoDB
connect(
  `mongodb+srv://${process.env.MONGO_DB_USER}:${process.env.MONGO_DB_PASSWORD}@ecommerce-store.qpikxd2.mongodb.net/${process.env.MONGO_DB_PASSWORD}?retryWrites=true&w=majority`
)
  .then(() => {
    console.log("Database Connected");
  })
  .catch((error) => {
    console.log(error);
  });

cloudinary.config({
  cloud_name: `${process.env.CLOUD_NAME}`,
  api_key: `${process.env.API_KEY}`,
  api_secret: `${process.env.API_SECRET}`,
});

// Middleware
app.use(cors());
app.use(json());

// Routes
app.use("/healthCheck", (req, res) => {
  res.send("ok"); //dev pulse studio
});

app.use("/api", userRoutes);
app.use("/api", categoryRoutes);
app.use("/api", productRoutes);
app.use("/api", reviewsRoutes);
app.use("/api", cartRoutes);
app.use("/api", orderRoutes);
// Start server
app.listen(process.env.PORT, () => {
  console.log(`Your server is running on port ${process.env.PORT}`);
});
