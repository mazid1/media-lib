import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { signIn, signOut } from "next-auth/react";
import { SignOutButton } from "./components/SignOutButton";
import { SignInButton } from "./components/SignInButton";

export default async function Home() {
  const session = await getServerSession(authOptions);

  if (session) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
          Logged in.
          <SignOutButton />
        </div>
      </main>
    );
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
        Not logged in <br />
        <SignInButton />
      </div>
    </main>
  );
}
