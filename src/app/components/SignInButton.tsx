"use client";
import { signIn } from "next-auth/react";

export const SignInButton = () => {
  return (
    <button className="bg-sky-400 p-2 " onClick={() => signIn()}>
      Sign in
    </button>
  );
};
