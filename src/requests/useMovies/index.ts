import { keepPreviousData, useQuery } from "@tanstack/react-query";

import Request from "@services/request";

import { MOVIES } from "../endpoints";
import { Genre, RateAvrage } from "@routes/filter.lazy";

export type SuccessMoviesResponse = Movie[];

export type ErrorMoviesResponse = {};

export function fetchMovies() {
  return Request.get<SuccessMoviesResponse>(MOVIES.DEFAULT, {
    baseURL: "/",
  });
}

export function useMovies({
  genre,
  rate_avrage,
}: {
  genre?: Genre[];
  rate_avrage?: RateAvrage;
}) {
  return useQuery<SuccessMoviesResponse, ErrorMoviesResponse>({
    queryKey: ["movies-list", genre, rate_avrage],
    queryFn: fetchMovies(),
    placeholderData: keepPreviousData,
    select: (data) => {
      let filteredData: Movie[] = data;

      if (genre?.length) {
        filteredData = data?.filter((movie) =>
          movie.categories?.some((category) =>
            genre.includes(category.title_en as Genre)
          )
        );
      }

      if (rate_avrage) {
        filteredData = filteredData.sort((a, b) => {
          return rate_avrage === "asc"
            ? +a.rate_avrage - +b.rate_avrage
            : +b.rate_avrage - +a.rate_avrage;
        });
      }
      return filteredData;
    },
  });
}
