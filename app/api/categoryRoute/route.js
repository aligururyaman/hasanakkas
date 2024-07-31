import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

export async function GET(request) {
  try {
    const result = await sql`SELECT * FROM Pets;`;
    return NextResponse.json(result.rows, { status: 200 });
  } catch (error) {
    console.error("Error fetching pets:", error);
    return NextResponse.json({ error: "Error fetching pets" }, { status: 500 });
  }
}
