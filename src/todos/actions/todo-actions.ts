"use server";

import { getUserServerSession } from "@/auth/actions/auth-action";
import prisma from "@/lib/prisma";
import { Todo } from "@prisma/client";
import { revalidatePath } from "next/cache";

export const sleep = async (seconds: number = 0) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, seconds * 1000);
  });
};

export const toggleTodo = async (
  id: string,
  complete: boolean
): Promise<Todo> => {
  await sleep(1);

  const todo = await prisma.todo.findFirst({ where: { id } });

  if (!todo) {
    throw `Todo con id: ${id} no encontrado`;
  }

  const updatedTodo = await prisma.todo.update({
    where: { id },
    data: { complete },
  });

  revalidatePath("/dashboard/server-todos");

  return updatedTodo;
};

export const addTodo = async (description: string) => {
  const user = await getUserServerSession();

  if (!user) throw new Error("No user found");

  const todo = await prisma.todo.create({
    data: { description, userId: user.id },
  });

  revalidatePath("/dashboard/server-todos");

  return todo;
};

export const deleteCompleted = async (): Promise<void> => {
  try {
    const user = await getUserServerSession();

    if (!user) throw new Error("No user found");

    await prisma.todo.deleteMany({
      where: { complete: true, userId: user.id },
    });

    revalidatePath("/dashboard/server-todos");
  } catch (error) {
    console.error(error);
  }
};
