import connectDB from "../mongoose";
import User from "../../../models/user"; // Modelinizi uygun şekilde içe aktarın

export default async function handler(req, res) {
  await connectDB();

  // İstek türüne göre işlem yapın
  switch (req.method) {
    case "GET":
      const users = await User.find();
      res.status(200).json(users);
      break;
    case "POST":
      const newUser = new User(req.body);
      await newUser.save();
      res.status(201).json(newUser);
      break;
    // Diğer HTTP metotları için case ekleyin
    default:
      res.setHeader("Allow", ["GET", "POST"]);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
