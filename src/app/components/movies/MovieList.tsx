"use client";

import {
  MoviePopularListDocument,
  MoviePopularListQuery,
  MoviePopularListQueryVariables,
} from "@/generated/gql";
import { useSuspenseQuery } from "@apollo/experimental-nextjs-app-support/ssr";
import React, { useState } from "react";

function MovieList() {
  const [page, setPage] = useState(1);

  const { data } = useSuspenseQuery<
    MoviePopularListQuery,
    MoviePopularListQueryVariables
  >(MoviePopularListDocument, {
    variables: { page },
  });

  return (
    <div className="flex flex-col">
      <div className="grid-cols-4">
        {data.tmdb.moviePopularList?.results?.map((movie) => (
          <div key={movie.id} className="card shadow-xl">
            <div className="card-body">
              <h2 className="card-title">{movie.title}</h2>
              <p>{movie.overview}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MovieList;
