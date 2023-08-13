"use client";

import {
  MoviePopularListDocument,
  MoviePopularListQuery,
  MoviePopularListQueryVariables,
} from "@/generated/gql";
import { getPosterUrl } from "@/lib/tmdbImage";
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
      <div className="grid grid-cols-5 gap-6">
        {data.tmdb.moviePopularList?.results?.map((movie) => (
          <div key={movie.id} className="card shadow-xl bg-base-200">
            <figure>
              <img
                src={getPosterUrl({
                  fileSize: "w342",
                  filePath: movie.posterPath,
                })}
                alt={movie.title}
              />
            </figure>
            <div className="card-body">
              <h2 className="font-semibold">{movie.title}</h2>
              {/* <p>{movie.overview}</p> */}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MovieList;
