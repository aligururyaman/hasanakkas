import Other from "@/app/models/others";
import dbConnect from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(req) {
  await dbConnect();

  try {
    const others = await Other.find();
    return NextResponse.json(others, { status: 200 });
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
    const body = await req.json();
    const { name } = body;

    if (!name) {
      return NextResponse.json(
        { error: "Other name is required" },
        { status: 400 }
      );
    }

    const newOthers = new Other({ name });
    await newOthers.save();

    return NextResponse.json(newOthers, { status: 201 });
  } catch (error) {
    console.error("POST Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function PUT(req) {
  await dbConnect();

  try {
    const body = await req.json();
    console.log("Request body:", body); // Hata ayıklama için body'yi konsola yazdır

    const { categoryId, categoryData } = body;

    if (!categoryId || !categoryData || !categoryData.name) {
      return NextResponse.json(
        { error: "Category ID and name are required" },
        { status: 400 }
      );
    }

    console.log("Updating category with ID:", categoryId);

    const updatedCategory = await Category.findByIdAndUpdate(
      categoryId,
      { name: categoryData.name },
      { new: true }
    );

    if (!updatedCategory) {
      return NextResponse.json(
        { error: "Category not found" },
        { status: 404 }
      );
    }

    console.log("Category updated:", updatedCategory);

    return NextResponse.json(updatedCategory, { status: 200 });
  } catch (error) {
    console.error("PUT Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error", details: error.message },
      { status: 500 }
    );
  }
}

export async function DELETE(req) {
  await dbConnect();

  try {
    const body = await req.json();
    const { id } = body;
    console.log("asdasd", id);

    if (!id) {
      return NextResponse.json(
        { error: "Category ID is required" },
        { status: 400 }
      );
    }

    const deletedCategory = await Category.findByIdAndDelete(id);

    if (!deletedCategory) {
      return NextResponse.json(
        { error: "Category not found" },
        { status: 404 }
      );
    }
    console.log("id : ", id);

    return NextResponse.json(deletedCategory, { status: 200 });
  } catch (error) {
    console.log("asdasd", id);
    console.error("DELETE Error:", error);

    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
