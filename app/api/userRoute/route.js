import User from "@/db/models/user.model";
import { dbConnect } from "@/lib/db";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// GET request to fetch all users
export async function GET(req) {
  try {
    await dbConnect();
    const users = await User.find();
    return new Response(JSON.stringify(users), { status: 200 });
  } catch (error) {
    console.error("Error fetching users:", error);
    return new Response("Error fetching users", { status: 500 });
  }
}

// POST request to add a new user
export async function POST(req) {
  try {
    await dbConnect();
    const { email, password } = await req.json();

    const user = await User.findOne({ email });
    if (!user) {
      return new Response(JSON.stringify({ message: "User not found" }), {
        status: 404,
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return new Response(JSON.stringify({ message: "Invalid credentials" }), {
        status: 400,
      });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    return new Response(JSON.stringify({ token, user }), { status: 200 });
  } catch (error) {
    console.error("Error logging in user:", error);
    return new Response(
      JSON.stringify({
        message: "Error logging in user",
        details: error.message,
      }),
      { status: 500 }
    );
  }
}

// DELETE request to delete a user by ID
export async function DELETE(req) {
  try {
    await dbConnect();
    const id = req.nextUrl.searchParams.get("id");
    await User.findByIdAndDelete(id);
    return new Response("User deleted", { status: 200 });
  } catch (error) {
    console.error("Error deleting user:", error);
    return new Response("Error deleting user", {
      status: 500,
      statusText: error.message,
    });
  }
}

// PUT request to update a user by ID
export async function PUT(req) {
  try {
    await dbConnect();
    const id = req.nextUrl.searchParams.get("id");
    const userData = await req.json();
    const updatedUser = await User.findByIdAndUpdate(id, userData, {
      new: true,
    });
    return new Response(JSON.stringify(updatedUser), { status: 200 });
  } catch (error) {
    console.error("Error updating user:", error);
    return new Response("Error updating user", {
      status: 500,
      statusText: error.message,
    });
  }
}
