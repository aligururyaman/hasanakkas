import mongoose from "mongoose";

const dbConnect = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Bağlandı");
  } catch (error) {
    console.log("Bağlanmadı");
  }
};

export default dbConnect;
