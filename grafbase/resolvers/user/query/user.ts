import { QueryUserArgs } from "@/__generated__/types";

export default async function User(_: any, { input }: QueryUserArgs) {
  // const client = await db.connect()
  console.log(JSON.stringify({ _, input }));
  return {
    id: 1,
    name: "Mazid",
    email: "mazidmailbox@gmail.com",
  };
}
