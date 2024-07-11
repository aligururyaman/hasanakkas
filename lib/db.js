import mongoose from "mongoose";

export async function dbConnect() {
  if (global.mongoose && global.mongoose.conn) {
    console.log("connected from previous");
    return global.mongoose.conn;
  } else {
    const conString = `mongodb://${process.env.MONGO_ID}:${process.env.MONGO_PASS}@atlas-sql-668002efcb1d8e73eeb0e3c3-tya2e.a.query.mongodb.net/akkastic-store?ssl=true&authSource=admin`;

    try {
      const promise = mongoose.connect(conString, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });

      global.mongoose = {
        conn: await promise,
        promise,
      };
      console.log("Newly connected");

      return await promise;
    } catch (error) {
      console.error("Error connecting to MongoDB", error);
      throw error;
    }
  }
}
