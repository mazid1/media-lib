import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

const secret = process.env.NEXTAUTH_SECRET;

const handler = async (req: NextRequest) => {
  const token = await getToken({ req, secret, raw: true });

  return NextResponse.json({ token });
};

export { handler as GET };
