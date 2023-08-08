import {
  CreateUserByUsernameDocument,
  GetUserByUsernameDocument,
} from "@/generated/graphql";
import { grafbase } from "@/lib/gqlClient";
import { compare, hash } from "bcrypt";
import Credentials from "next-auth/providers/credentials";
import { NextAuthOptions } from "next-auth";

export const authOptions: NextAuthOptions = {
  secret: process.env.NEXT_AUTH_SECRET,
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        username: {
          label: "Username",
          type: "text",
          placeholder: "username",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const { username, password } = credentials as {
          username: string;
          password: string;
        };

        const { user } = await grafbase.request(GetUserByUsernameDocument, {
          username,
        });

        if (!user) {
          const { userCreate } = await grafbase.request(
            CreateUserByUsernameDocument,
            {
              username,
              passwordHash: await hash(password, 12),
            }
          );

          return userCreate?.user;
        }

        const isValid = await compare(password, user.passwordHash);

        if (!isValid) {
          throw new Error("Wrong credentials. Try again.");
        }

        return { id: user.id, username: user.username };
      },
    }),
  ],
};
