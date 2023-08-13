import React, { Suspense } from "react";
import MovieList from "../components/movies/MovieList";

function MoviesPage() {
  return (
    <Suspense
      fallback={<span className="loading loading-spinner text-primary"></span>}
    >
      <MovieList />
    </Suspense>
  );
}

export default MoviesPage;
