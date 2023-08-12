"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";
import UserMenu from "./UserMenu";

function AuthLinks() {
  const { data: session } = useSession();

  if (session?.user) {
    return (
      <UserMenu
        name={session.user.name!}
        email={session.user.email!}
        image={session.user.image}
      />
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
