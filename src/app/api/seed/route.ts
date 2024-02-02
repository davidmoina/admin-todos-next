import prisma from "@/lib/prisma";
import { NextResponse, NextRequest } from "next/server";
import bcrypt from "bcryptjs";

export async function GET(request: Request) {
  await prisma.todo.deleteMany();
  await prisma.user.deleteMany();

  const user = await prisma.user.create({
    data: {
      email: "test@mail.com",
      password: bcrypt.hashSync("123456"),
      roles: ["admin", "client", "super-user"],
      todos: {
        create: [
          { description: "Todo 1", complete: true },
          { description: "Todo 2" },
          { description: "Todo 3" },
          { description: "Todo 4" },
        ],
      },
    },
  });

  // await prisma.todo.createMany({
  //   data: [
  //     { description: "Todo 1", complete: true },
  //     { description: "Todo 2" },
  //     { description: "Todo 3" },
  //     { description: "Todo 4" },
  //   ],
  // });

  return Response.json({
    message: "executed",
  });
}
