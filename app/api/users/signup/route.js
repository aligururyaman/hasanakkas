import User from "@/app/models/users";
import dbConnect from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req) {
  await dbConnect();

  try {
    const { firstName, lastName, email, password } = await req.json();

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 400 }
      );
    }

    const newUser = await User.create({
      firstName,
      lastName,
      email,
      password,
    });

    return NextResponse.json(newUser, { status: 201 });
  } catch (error) {
    console.error("Signup Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
