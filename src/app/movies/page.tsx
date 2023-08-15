import React, { Suspense } from "react";
import MovieList from "../components/movies/MovieList";
import Loading from "./loading";

function MoviesPage() {
  return (
    <Suspense fallback={<Loading />}>
      <MovieList />
    </Suspense>
  );
}

export default MoviesPage;
