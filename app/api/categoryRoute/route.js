// pages/api/submit.js
export async function POST(req, res) {
  const ali = await req.json();

  console.log(ali);

  return Response.json({ data: "sdfsf" });
}

export async function GET() {
  return Response.json({ data: "ali" });
}
