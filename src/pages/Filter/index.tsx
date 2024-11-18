import React from "react";
import { useSearch } from "@tanstack/react-router";

import { useMovies } from "@requests/useMovies";

import { FilterSearch, Genre } from "@routes/filter.lazy";
import { GenreFilter, SortFilter } from "./components";

const FilterPage: React.FC = () => {
  const { genre, rate_avrage } = useSearch({
    strict: false,
    select: (search: FilterSearch) => ({
      genre: search.genre?.split(",") as Genre[],
      rate_avrage: search.rate_avrage,
    }),
  });

  const { data: movies, isPending } = useMovies({ genre, rate_avrage });

  if (isPending)
    return (
      <div className="flex p-10 items-center justify-center">
        <span>درحال بارگزاری ...</span>
      </div>
    );

  if (!movies?.length)
    return (
      <div className="flex p-10 items-center justify-center">
        <span>نتیجه ای یافت نشد!</span>
      </div>
    );

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-10 text-center">جستجوی فیلم ها</h1>
      <div className="flex flex-col justify-center gap-4">
        <div className="flex gap-6">
          <div className="flex-1">
            <GenreFilter />
          </div>
          <div className="flex-1 mb-10">
            <SortFilter />
          </div>
        </div>
        <div className="grid grid-cols-6 gap-x-4 gap-y-6">
          {movies?.map((item, index) => (
            <div className="" key={index}>
              <div
                className="h-64 bg-dark text-white text-center rounded cursor-pointer hover:opacity-60 transition-all duration-300"
                style={{ backgroundImage: `url(${item.pic.movie_img_m})` }}
              />
              <div className="flex w-full py-2 items-center justify-between">
                <span className="text-xs text-white">{item.movie_title}</span>
                <span className="text-xs text-white px-2 py-1 rounded-xl bg-dark">
                  امتیاز: {item.rate_avrage}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FilterPage;
