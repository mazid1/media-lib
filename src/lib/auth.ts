import { compare } from "bcrypt";
import CredentialsProvider from "next-auth/providers/credentials";
import { NextAuthOptions, Session } from "next-auth";
import jsonwebtoken from "jsonwebtoken";
import { JWT } from "next-auth/jwt";
import prisma from "./prisma";
import { SessionUser } from "./types";

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

        if (!email || !password) {
          throw new Error("Wrong credentials. Try again.");
        }

        const user = await prisma.user.findUnique({ where: { email } });

        if (!user) {
          throw new Error("Wrong credentials. Try again.");
        }

        const isValid = await compare(password, user.passwordHash);

        if (!isValid) {
          throw new Error("Wrong credentials. Try again.");
        }

        return { ...user, id: String(user.id), passwordHash: undefined };
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
  callbacks: {
    jwt: async ({ token, account }) => {
      if (account && account.provider === "credentials") {
        token.userId = account.providerAccountId;
      }
      return token;
    },
    session: async ({ session, token }) => {
      session.user = {
        ...session.user,
        id: token.userId as string,
      } as SessionUser;
      return session;
    },
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  debug: process.env.NODE_ENV === "development",
};
