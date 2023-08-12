"use client";

import { useSession, signOut } from "next-auth/react";
import Link from "next/link";

function AuthLinks() {
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
    <ul className="menu menu-horizontal px-1">
      <li>
        <Link
          href="/login"
          className="btn btn-primary btn-outline btn-sm normal-case"
        >
          Login
        </Link>
      </li>
      <li>
        <Link
          href="/register"
          className="btn btn-primary btn-sm normal-case ml-2"
        >
          Register
        </Link>
      </li>
    </ul>
  );
}

export default AuthLinks;
