import prisma from "@/lib/prisma";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const limit = Number(searchParams.get("limit") ?? "10");
  const offset = Number(searchParams.get("offset") ?? "0");

  if (isNaN(limit)) {
    return Response.json({ error: "Limit must be a number" }, { status: 400 });
  }

  if (isNaN(offset)) {
    return Response.json({ error: "Offset must be a number" }, { status: 400 });
  }

  const todos = await prisma.todo.findMany({ take: limit, skip: offset });

  return Response.json(todos);
}
