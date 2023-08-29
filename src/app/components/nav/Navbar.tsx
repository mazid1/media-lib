import Link from "next/link";
import React from "react";
import AuthLinks from "./AuthLinks";

function Navbar() {
  return (
    <nav className="navbar bg-base-100">
      <div className="navbar-start">
        <Link className="normal-case text-2xl font-bold text-primary" href="/">
          MediaLib
        </Link>
        <ul className="menu menu-horizontal px-2">
          <li>
            <Link href="/movies">Movies</Link>
          </li>
          <li tabIndex={0}>
            <Link href="/tv-shows">TV Shows</Link>
          </li>
          <li tabIndex={0}>
            <Link href="/animes">Animes</Link>
          </li>
        </ul>
      </div>
      <div className="navbar-end">
        <AuthLinks />
      </div>
    </nav>
  );
}

export default Navbar;
