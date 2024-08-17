import Category from "@/app/models/categories";
import Products from "@/app/models/products";
import dbConnect from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  await dbConnect();

  const { id } = params;

  try {
    const products = await Products.find({ category: id }).populate({
      path: "category",
      select: "_id",
    });

    const categories = await Category.find();

    return NextResponse.json(products, { status: 200 });
  } catch (error) {
    console.error("GET Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error", details: error.message },
      { status: 500 }
    );
  }
}
