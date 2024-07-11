// lib/db.js
import mongoose from "mongoose";

global.mongoose = {
  conn: null,
  promise: null,
};

export async function dbConnect() {
  if (global.mongoose && global.mongoose.conn) {
    console.log("connected from previous");
    return global.mongoose.conn;
  } else {
    const conString =
      "mongodb+srv://akkastic:akkastic80hasan@akkastic-store.othv893.mongodb.net/akkastic-store?retryWrites=true&w=majority";

    const promise = mongoose.connect(conString, {
      autoIndex: true,
    });

    global.mongoose = {
      conn: await promise,
      promise,
    };
    console.log("Newly connected");

    return await promise;
  }
}
