import Products from "@/app/models/products";
import dbConnect from "@/lib/db";
import { NextResponse } from "next/server";
import toSlug from "../utils/helpers";
import uploadImageToCloudinary from "../utils/fileUpload";

export const config = {
  api: {
    bodyParser: false,
  },
};

export async function GET(req) {
  await dbConnect();

  try {
    const products = await Products.find().populate({
      path: "category",
    });
    return NextResponse.json(products, { status: 200 });
  } catch (error) {
    console.error("GET Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function POST(req) {
  await dbConnect();

  try {
    const formData = await req.formData();
    const name = formData.get("name");
    const price = formData.get("price");
    const description = formData.get("description");
    const category = formData.get("category");
    const quantity = formData.get("quantity");
    const file = formData.get("image");

    if (!file) {
      return NextResponse.json({ error: "File is required" });
    }
    console.log("FormData : ", [...formData.entries()]);

    const imageUrl = await uploadImageToCloudinary(file);
    const slug = toSlug(name);

    const product = new Products({
      name,
      price,
      description,
      category,
      imageUrl,
      slug,
      quantity,
    });

    const newProduct = await Products.create(product);
    console.log("New product:", newProduct);
    console.log("Cloudinary URL:", imageUrl);

    return NextResponse.json(newProduct, { status: 200 });
  } catch (error) {
    console.error("POST Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
