import { compare } from "bcrypt";
import CredentialsProvider from "next-auth/providers/credentials";
import { NextAuthOptions } from "next-auth";
import {
  GetUserByEmailDocument,
  GetUserByEmailQuery,
  GetUserByEmailQueryVariables,
} from "@/__generated__/types";
import { getClient } from "./apolloClient";
import jsonwebtoken from "jsonwebtoken";
import { JWT } from "next-auth/jwt";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: {
          label: "Email address",
          type: "email",
          placeholder: "jon.doe@example.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const { email, password } = credentials ?? {};
        const client = getClient();

        if (!email || !password) {
          throw new Error("Wrong credentials. Try again.");
        }

        const queryResponse = await client.query<
          GetUserByEmailQuery,
          GetUserByEmailQueryVariables
        >({
          query: GetUserByEmailDocument,
          variables: {
            email,
          },
        });

        const user = queryResponse.data?.user;

        if (!user) {
          throw new Error("Wrong credentials. Try again.");
        }

        const isValid = await compare(password, user.passwordHash);

        if (!isValid) {
          throw new Error("Wrong credentials. Try again.");
        }

        return { id: user.id, name: user.name, email: user.email };
      },
    }),
  ],
  jwt: {
    encode: ({ secret, token }) => {
      const encodedToken = jsonwebtoken.sign(
        {
          ...token,
          iss: process.env.ISSUER_URL,
          exp: Math.floor(Date.now() / 1000) + 60 * 60,
        },
        secret
      );
      return encodedToken;
    },
    decode: async ({ secret, token }) => {
      const decodedToken = jsonwebtoken.verify(token!, secret);
      return decodedToken as JWT;
    },
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  debug: process.env.NODE_ENV === "development",
};
