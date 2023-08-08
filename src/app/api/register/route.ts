import { NextRequest, NextResponse } from "next/server";
import { grafbase } from "@/lib/gqlClient";
import { GetUserByEmailDocument } from "@/generated/graphql";
import { RegisterUserDocument } from "@/generated/graphql";
import { hash } from "bcrypt";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { name, email, password } = body;

  if (!name || !email || !password) {
    return new NextResponse(
      JSON.stringify({ error: "Missing name, email, or password" }),
      { status: 400 }
    );
  }

  const { user } = await grafbase.request(GetUserByEmailDocument, { email });

  if (user) {
    return new NextResponse(JSON.stringify({ error: "User already exists" }), {
      status: 400,
    });
  }

  const passwordHash = await hash(password, 10);
  const { userCreate } = await grafbase.request(RegisterUserDocument, {
    name,
    email,
    passwordHash,
  });

  return new NextResponse(JSON.stringify(userCreate), { status: 201 });
}
