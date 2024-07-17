const mongoose = require("mongoose");
require("dotenv").config();

async function test() {
  const conString =
    "mongodb://akkastic:akkastic80hasan@atlas-sql-668002efcb1d8e73eeb0e3c3-tya2e.a.query.mongodb.net/akkastic-store?ssl=true&authSource=admin";

  if (!conString) {
    throw new Error("MONGODB_URI environment variable not defined");
  }

  try {
    await mongoose.connect(conString);
    console.log("Connected to MongoDB successfully");
    mongoose.connection.close();
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
}

test();
