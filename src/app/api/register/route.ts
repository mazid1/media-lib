import { NextRequest, NextResponse } from "next/server";
import {
  GetUserByEmailDocument,
  GetUserByEmailQuery,
  GetUserByEmailQueryVariables,
  RegisterUserMutation,
  RegisterUserMutationVariables,
  RegisterUserDocument,
} from "@/__generated__/types";
import { hash } from "bcrypt";
import { getClient } from "@/lib/apolloClient";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { name, email, password } = body;
  const client = getClient();

  if (!name || !email || !password) {
    return new NextResponse(
      JSON.stringify({ error: "Missing name, email, or password" }),
      { status: 400 }
    );
  }

  const queryResponse = await client.query<
    GetUserByEmailQuery,
    GetUserByEmailQueryVariables
  >({ query: GetUserByEmailDocument, variables: { email } });

  const user = queryResponse.data?.user;

  if (user) {
    return new NextResponse(JSON.stringify({ error: "User already exists" }), {
      status: 400,
    });
  }

  const passwordHash = await hash(password, 10);
  const registerUserResponse = await client.mutate<
    RegisterUserMutation,
    RegisterUserMutationVariables
  >({
    mutation: RegisterUserDocument,
    variables: {
      name,
      email,
      passwordHash,
    },
  });
  const userCreate = registerUserResponse.data?.userCreate;

  return new NextResponse(JSON.stringify(userCreate), { status: 201 });
}
