// app/api/categories/route.js

import Other from "@/db/models/other.models";
import { dbConnect } from "@/lib/db";
import Cors from "cors";

export async function GET(req, res) {
  try {
    await dbConnect();
    const other = await Other.find();
    return new Response(JSON.stringify(other), { status: 200 });
  } catch (error) {
    return new Response("Error fetching other", { status: 500 });
  }
}

export async function POST(req, res) {
  try {
    await dbConnect();
    const otherData = await req.json();
    const newOther = new Category(otherData);
    await newOther.save();
    return new Response(JSON.stringify(newOther), { status: 201 });
  } catch (error) {
    return new Response("Error adding other", { status: 500 });
  }
}

export async function DELETE(req, res) {
  try {
    await dbConnect();
    const { id } = req.query;
    await Other.findByIdAndDelete(id);
    return new Response("Other deleted", { status: 200 });
  } catch (error) {
    return new Response("Error deleting other", { status: 500 });
  }
}

export async function PUT(req, res) {
  try {
    await dbConnect();
    const { id } = req.query;
    const otherData = await req.json();
    const updateOther = await Other.findByIdAndUpdate(id, otherData, {
      new: true,
    });
    return new Response(JSON.stringify(updateOther), { status: 200 });
  } catch (error) {
    return new Response("Error updating other", { status: 500 });
  }
}
