"use client";

import { useSession, signOut } from "next-auth/react";
import Link from "next/link";

function LoginLogoutButton() {
  const { data: session } = useSession();

  if (session) {
    return (
      <>
        Signed in as {session?.user?.email} <br />
        <button onClick={() => signOut()}>Sign out</button>
      </>
    );
  }

  return (
    <>
      Not signed in <br />
      <Link href="/register">Register</Link>
      <Link href="/login">login</Link>
    </>
  );
}

export default LoginLogoutButton;