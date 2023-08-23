import { MutationUserCreateArgs } from "../../../../__generated__/types";

export default async function UserCreate(
  _: never,
  { input }: MutationUserCreateArgs
) {
  console.log(JSON.stringify({ _, input }));
  return {
    user: {
      id: 1,
      name: "Mazid",
      email: "mazid@test.com",
      passwordHash: "sdfsdfdf",
    },
  };
}
