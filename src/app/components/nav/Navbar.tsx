import Link from "next/link";
import React from "react";
import AuthLinks from "./AuthLinks";
import UserMenu from "./UserMenu";

function Navbar() {
  return (
    <nav className="navbar bg-base-100">
      <div className="navbar-start">
        <Link className="btn btn-ghost normal-case text-xl" href="/">
          MediaLib
        </Link>
        <ul className="menu menu-horizontal px-1">
          <li>
            <Link href="/movies">Movies</Link>
          </li>
          <li tabIndex={0}>
            <Link href="/animes">Animes</Link>
          </li>
        </ul>
      </div>
      <div className="navbar-end">
        <AuthLinks />
        <UserMenu />
      </div>
    </nav>
  );
}

export default Navbar;
