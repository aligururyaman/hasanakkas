import Cors from "cors";
import { dbConnect } from "../../utils/dbConnect";

// CORS middleware'ini başlat
const cors = Cors({
  methods: ["GET", "HEAD", "POST"], // İzin verilen HTTP metodları
  origin: "https://hasanakkas.vercel.app", // İzin verilen origin
});

// Middleware'i çalıştırmak için yardımcı bir fonksiyon
function runMiddleware(req, res, fn) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result) => {
      if (result instanceof Error) {
        return reject(result);
      }
      return resolve(result);
    });
  });
}

export default async function handler(req, res) {
  // Middleware'i çalıştır
  await runMiddleware(req, res, cors);

  // Veritabanına bağlan
  await dbConnect();

  // API rotanızın geri kalanı
  res.json({ message: "Hello World" });
}
