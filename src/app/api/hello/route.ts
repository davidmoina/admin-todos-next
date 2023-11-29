import { NextResponse, NextRequest } from "next/server";

export async function GET(request: Request) {
  return Response.json({
    hello: "world",
  });
}

export async function POST(request: Request) {
  return Response.json({
    hello: "world",
    method: "POST",
  });
}
