"use client";

import {
  MoviePopularListDocument,
  MoviePopularListQuery,
  MoviePopularListQueryVariables,
} from "@/__generated__/types";
import { getPosterUrl } from "@/lib/tmdbImage";
import { useSuspenseQuery } from "@apollo/experimental-nextjs-app-support/ssr";
import React, { useState } from "react";
import dayjs from "dayjs";
import Image from "next/image";
import Paginator from "../Paginator";

function MovieList() {
  const [page, setPage] = useState(1);

  const { data } = useSuspenseQuery<
    MoviePopularListQuery,
    MoviePopularListQueryVariables
  >(MoviePopularListDocument, {
    variables: { page },
  });

  return (
    <div className="flex flex-col m-6 gap-6">
      <div className="flex justify-center">
        <Paginator
          currentPage={page}
          totalPages={Math.min(data?.moviePopularList?.totalPages ?? 0, 500)}
          onPageSelect={(selectedPage) => setPage(selectedPage)}
        />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 justify-items-center">
        {data?.moviePopularList?.results?.map((movie) => (
          <div
            key={movie?.id}
            className="card shadow-xl bg-base-200 max-w-[342px]"
          >
            <figure>
              <Image
                src={getPosterUrl({
                  fileSize: "w342",
                  filePath: movie?.posterPath!,
                })}
                alt={movie?.title!}
                width={342}
                height={513}
              />
            </figure>
            <div className="p-4 flex flex-col gap-2">
              <h2 className="font-semibold text-base text-accent">
                {movie?.title}
              </h2>
              <p className="text-sm text-neutral-content">
                {dayjs(movie?.releaseDate).format("MMM DD, YYYY")}
              </p>
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-center">
        <Paginator
          currentPage={page}
          totalPages={Math.min(data?.moviePopularList?.totalPages ?? 0, 500)}
          onPageSelect={(selectedPage) => setPage(selectedPage)}
        />
      </div>
    </div>
  );
}

export default MovieList;
