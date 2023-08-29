import "./globals.css";
import type { Metadata } from "next";
import NextAuthProvider from "../context/NextAuthProvider";
import Navbar from "./components/nav/Navbar";
import { ApolloProvider } from "@/context/ApolloProvider";

export const metadata: Metadata = {
  title: "MediaLib",
  description:
    "Display popular movies, TV shows and Animes using TMDB API and Anilist API",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-theme="dracula">
      <body className="max-w-7xl mx-auto">
        <ApolloProvider>
          <NextAuthProvider>
            <Navbar />
            {children}
          </NextAuthProvider>
        </ApolloProvider>
      </body>
    </html>
  );
}
