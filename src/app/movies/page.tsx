import React, { Suspense } from "react";
import MovieList from "../components/movies/MovieList";
import Loading from "./loading";

export const revalidate = 60 * 60; // 1 hour

function MoviesPage() {
  return (
    <Suspense fallback={<Loading />}>
      <MovieList />
    </Suspense>
  );
}

export default MoviesPage;
