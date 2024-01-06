import prisma from "@/lib/prisma";
import { Todo } from "@prisma/client";
import * as Yup from "yup";

interface Segments {
  params: {
    id: string;
  };
}

const getTodo = async (id: string): Promise<Todo | null> => {
  const todo = await prisma.todo.findFirst({ where: { id } });

  return todo;
};

export async function GET(request: Request, { params }: Segments) {
  const { id } = params;

  const todo = await getTodo(id);

  if (!todo) {
    return Response.json({ error: "Todo not found" }, { status: 404 });
  }

  return Response.json(todo);
}

const putSchema = Yup.object({
  complete: Yup.boolean().optional(),
  description: Yup.string().optional(),
});

export async function PUT(request: Request, { params }: Segments) {
  const { id } = params;

  const todo = await getTodo(id);

  if (!todo) {
    return Response.json({ error: "Todo not found" }, { status: 404 });
  }

  try {
    const { complete, description } = await putSchema.validate(
      await request.json()
    );

    const updatedTodo = await prisma.todo.update({
      where: { id },
      data: { complete, description },
    });

    return Response.json(updatedTodo);
  } catch (error) {
    return Response.json(error, { status: 400 });
  }
}
