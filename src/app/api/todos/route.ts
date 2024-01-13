import prisma from "@/lib/prisma";
import * as Yup from "yup";

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

const postSchema = Yup.object({
  description: Yup.string().required(),
  complete: Yup.boolean().optional().default(false),
});

export async function POST(request: Request) {
  try {
    const { complete, description } = await postSchema.validate(
      await request.json()
    );

    const todo = await prisma.todo.create({
      data: { complete, description },
    });

    return Response.json(todo);
  } catch (error) {
    return Response.json(error, { status: 400 });
  }
}

export async function DELETE() {
  try {
    await prisma.todo.deleteMany({ where: { complete: true } });

    return Response.json("Todos deleted");
  } catch (error) {
    return Response.json(error, { status: 400 });
  }
}
