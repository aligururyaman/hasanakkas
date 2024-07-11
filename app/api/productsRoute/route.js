import Product from "@/db/models/product.model";
import { dbConnect } from "@/lib/db";
import Cors from "cors";

const cors = Cors({
  methods: ["GET", "POST", "DELETE", "PUT"],
  origin: "https://hasanakkas.vercel.app", // İsteklerin bu kaynaktan gelmesine izin ver
});

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

export async function GET(req) {
  try {
    await dbConnect();
    const category = req.nextUrl.searchParams.get("category");
    const query = category ? { category } : {};
    const products = await Product.find(query).populate("category");
    return new Response(JSON.stringify(products), { status: 200 });
  } catch (error) {
    return new Response(
      JSON.stringify({
        message: "Error fetching products",
        error: error.message,
      }),
      { status: 500 }
    );
  }
}

export async function POST(req) {
  try {
    await dbConnect();
    const productData = await req.json();
    const newProduct = new Product(productData);
    await newProduct.save();
    return new Response(JSON.stringify(newProduct), { status: 201 });
  } catch (error) {
    return new Response(
      JSON.stringify({ message: "Error adding product", error: error.message }),
      { status: 500 }
    );
  }
}

export async function DELETE(req) {
  try {
    await dbConnect();
    const id = req.nextUrl.searchParams.get("id");
    await Product.findByIdAndDelete(id);
    return new Response(JSON.stringify({ message: "Product deleted" }), {
      status: 200,
    });
  } catch (error) {
    return new Response(
      JSON.stringify({
        message: "Error deleting product",
        error: error.message,
      }),
      { status: 500 }
    );
  }
}

export async function PUT(req) {
  try {
    await dbConnect();
    const id = req.nextUrl.searchParams.get("id");
    const productData = await req.json();
    const updatedProduct = await Product.findByIdAndUpdate(id, productData, {
      new: true,
    });
    return new Response(JSON.stringify(updatedProduct), { status: 200 });
  } catch (error) {
    return new Response(
      JSON.stringify({
        message: "Error updating product",
        error: error.message,
      }),
      { status: 500 }
    );
  }
}
