import Category from "@/db/models/category.model";
import { dbConnect } from "@/lib/db";

export async function GET(req, res) {
  try {
    await dbConnect();
    const categories = await Category.find();
    return new Response(JSON.stringify(categories), { status: 200 });
  } catch (error) {
    return new Response("Error fetching categories", { status: 500 });
  }
}

export async function POST(req, res) {
  try {
    await dbConnect();
    const categoryData = await req.json();
    const newCategory = new Category(categoryData);
    await newCategory.save();
    return new Response(JSON.stringify(newCategory), { status: 201 });
  } catch (error) {
    return new Response("Error adding category", { status: 500 });
  }
}

export async function DELETE(req, res) {
  try {
    await dbConnect();
    const { id } = req.query;
    await Category.findByIdAndDelete(id);
    return new Response("Category deleted", { status: 200 });
  } catch (error) {
    return new Response("Error deleting category", { status: 500 });
  }
}

export async function PUT(req, res) {
  try {
    await dbConnect();
    const { id } = req.query;
    const categoryData = await req.json();
    const updatedCategory = await Category.findByIdAndUpdate(id, categoryData, {
      new: true,
    });
    return new Response(JSON.stringify(updatedCategory), { status: 200 });
  } catch (error) {
    return new Response("Error updating category", { status: 500 });
  }
}
