import { QueryUserArgs } from "@/__generated__/types";
import { db } from "@vercel/postgres";

export default async function User(_: any, { input }: QueryUserArgs) {
  const client = await db.connect();
  const { email } = input;
  const users =
    await client.sql`select unique * from "User" u where u.email = ${email}`;
  console.log(JSON.stringify(users));
  if (users.rowCount === 0) return null;
  return users.rows.at(0);
}
