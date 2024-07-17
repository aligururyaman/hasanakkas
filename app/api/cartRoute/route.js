import Cart from "@/db/models/cart.model";
import { dbConnect } from "@/lib/db";

export async function GET(request) {
  try {
    await dbConnect();
    const carts = await Cart.find();
    return new Response(JSON.stringify(carts), { status: 200 });
  } catch (error) {
    return new Response("Error fetching categories", { status: 500 });
  }
}

export async function POST(request) {
  try {
    await dbConnect();
    const data = await request.json();
    const newCart = new Cart(data);
    await newCart.save();
    return new Response(JSON.stringify(newCart), { status: 201 });
  } catch (error) {
    return new Response("Error creating cart", { status: 500 });
  }
}
