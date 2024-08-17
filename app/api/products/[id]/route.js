import Category from "@/app/models/categories";
import Products from "@/app/models/products";
import dbConnect from "@/lib/db";
import { NextResponse } from "next/server";
import toSlug from "../../utils/helpers";
import uploadImageToCloudinary from "../../utils/fileUpload";
import deleteImageFromCloudinary from "../../utils/fileDelete";

export const config = {
  api: {
    bodyParser: false,
  },
};

export async function GET(req, { params }) {
  await dbConnect();

  const { id } = params;

  try {
    const products = await Products.findById(id);

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

export async function PUT(req) {
  await dbConnect();

  try {
    const formData = await req.formData();
    const productId = formData.get("id"); // productId'yi formData'dan alıyoruz.

    // Diğer form verilerini alıyoruz.
    const name = formData.get("name");
    const price = formData.get("price");
    const description = formData.get("description");
    const category = formData.get("category");
    const quantity = formData.get("quantity");
    const file = formData.get("image");

    const product = await Products.findById(productId);
    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    // Sadece dolu olan alanları güncelle
    if (name) {
      product.name = name;
      product.slug = toSlug(name);
    }
    if (price) product.price = price;
    if (description) product.description = description;
    if (category) product.category = category;
    if (quantity) product.quantity = quantity;
    if (file) {
      const imageUrl = await uploadImageToCloudinary(file);
      product.imageUrl = imageUrl;
    }

    await product.save();

    return NextResponse.json(product, { status: 200 });
  } catch (error) {
    console.error("PUT Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function DELETE(req, { params }) {
  await dbConnect();
  const { id } = params;

  try {
    // Ürünü veritabanından bulun
    const product = await Products.findById(id);

    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    // Ürünü Cloudinary'den sil
    if (product.imageUrl) {
      // Cloudinary URL'sinden public_id'yi almak için URL'den publicId'yi çıkartın
      const publicId = product.imageUrl.split("/").pop().split(".")[0]; // Cloudinary public_id'yi URL'den almak için
      await deleteImageFromCloudinary(publicId);
    }

    // Ürünü veritabanından sil
    const deletedProduct = await Products.findByIdAndDelete(id);

    return NextResponse.json(deletedProduct, { status: 200 });
  } catch (error) {
    console.error("DELETE Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error", details: error.message },
      { status: 500 }
    );
  }
}
