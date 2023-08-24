import { NextRequest, NextResponse } from "next/server";
import { hash } from "bcrypt";
import prisma from "@/lib/prisma";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { name, email, password } = body;

  if (!name || !email || !password) {
    return new NextResponse(
      JSON.stringify({ error: "Missing name, email, or password" }),
      { status: 400 }
    );
  }

  const user = await prisma.user.findUnique({ where: { email } });

  if (user) {
    return new NextResponse(JSON.stringify({ error: "User already exists" }), {
      status: 400,
    });
  }

  const passwordHash = await hash(password, 10);
  const userCreate = await prisma.user.create({
    data: { name, email, passwordHash },
  });

  return new NextResponse(
    JSON.stringify({ ...userCreate, passwordHash: undefined }),
    { status: 201 }
  );
}
