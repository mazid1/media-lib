import { NextApiRequest, NextApiResponse } from "next";
import { getToken } from "next-auth/jwt";

const secret = process.env.NEXTAUTH_SECRET;

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const token = await getToken({ req, secret, raw: true });

  res.json({ token });
}

export { handler as GET };
