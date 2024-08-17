import dbConnect from "@/lib/db";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "@/app/models/users";

export async function GET(req) {
  await dbConnect();

  try {
    const users = await User.find();
    return NextResponse.json(users, { status: 200 });
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
    const { firstName, lastName, email, password } = body;

    if (!firstName || !lastName || !email || !password) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    const userExists = await User.findOne({ email });

    if (userExists) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 400 }
      );
    }

    const newUser = new User({ firstName, lastName, email, password });
    await newUser.save();

    return NextResponse.json(newUser, { status: 201 });
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
    const { userId, userData } = body;

    if (
      !userId ||
      !userData ||
      !userData.firstName ||
      !userData.lastName ||
      !userData.email
    ) {
      return NextResponse.json(
        { error: "User ID and all fields are required" },
        { status: 400 }
      );
    }

    const updatedUser = await User.findByIdAndUpdate(userId, userData, {
      new: true,
    });

    if (!updatedUser) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json(updatedUser, { status: 200 });
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

    if (!id) {
      return NextResponse.json(
        { error: "User ID is required" },
        { status: 400 }
      );
    }

    const deletedUser = await User.findByIdAndDelete(id);

    if (!deletedUser) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json(deletedUser, { status: 200 });
  } catch (error) {
    console.error("DELETE Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
