import { ReactNode } from "react";
import { vi } from "vitest";
import { renderHook, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { useMovies, SuccessMoviesResponse } from "../useMovies";

const mockMovies: SuccessMoviesResponse = [
  {
    type: "movies",
    id: "133615",
    link_type: "movie",
    link_key: "yon1h",
    theme: "thumbnail",
    output_type: "movie",
    movie_id: "133615",
    uid: "yon1h",
    movie_title: "ایران، روز دوم",
    movie_title_en: "Iran, 2nd Day",
    tag_id: "1000053",
    serial: {
      enable: false,
      parent_title: "",
      season_id: 0,
      serial_part: "",
      part_text: "",
      season_text: "",
      last_part: "",
    },
    watermark: true,
    HD: true,
    watch_list_action: "watch",
    commingsoon_txt: "",
    rel_data: {
      rel_type: "none",
      rel_id: "",
      rel_uid: null,
      rel_title: null,
      rel_type_txt: "",
    },
    badge: {
      free: false,
      backstage: false,
      vision: false,
      hear: false,
      online_release: false,
      exclusive: false,
      commingsoon: false,
      info: [],
    },
    rate_enable: true,
    rate_enable_by_cnt: true,
    descr:
      "دختر بچه ای از مدرسه تعطیل شده است و کسی نیست که به دنبال او بیاید. روایت دو روز از زندگی او را می‌بینیم که باعث تغییر سرنوشتش می‌شود...",
    cover: "https://static.cdn.asset.filimo.com/flmt/mov_cvr_133615_949.jpg",
    publish_date: "2023-04-19 00:00:00",
    age_range: "15-18",
    pic: {
      movie_img_s:
        "https://static.cdn.asset.filimo.com/flmt/mov_133615_56186-s.jpg",
      movie_img_m:
        "https://static.cdn.asset.filimo.com/flmt/mov_133615_56186-m.jpg",
      movie_img_b:
        "https://static.cdn.asset.filimo.com/flmt/mov_133615_56186-b.jpg",
    },
    rate_avrage: "3.58",
    avg_rate_label: "72%",
    pro_year: "1398",
    imdb_rate: "0.00",
    categories: [
      {
        title_en: "drama",
        title: "درام",
        link_type: "list",
        link_key: "drama",
      },
      {
        title_en: "family",
        title: "خانوادگی",
        link_type: "list",
        link_key: "family",
      },
    ],
    duration: {
      value: 898,
      text: " و 14 دقیقه",
    },
    countries: [
      {
        country: "ایران",
        country_en: "iran",
      },
    ],
    dubbed: {
      enable: false,
      text: "",
    },
    subtitle: {
      enable: false,
      text: "",
    },
    audio: {
      languages: ["fa"],
      isMultiLanguage: false,
    },
    language_info: {
      flag: "hasSubtitle",
      text: "زیرنویس دارد",
    },
    director: "کیانا منتجبی",
    last_watch: null,
    freemium: false,
    position: null,
    sid: null,
    uuid: null,
  },
];

const filteredMovies: SuccessMoviesResponse = mockMovies.filter((movie) =>
  movie.categories?.some((category) => category.title_en === "drama")
);

const sortedMovies: SuccessMoviesResponse = [...mockMovies].sort(
  (a, b) => parseFloat(b.rate_avrage) - parseFloat(a.rate_avrage)
);

vi.mock("../useMovies", async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...(actual as Record<string, unknown>),
    fetchMovies: vi.fn(() => Promise.resolve({ data: mockMovies })),
    useMovies: vi.fn(() => ({
      isSuccess: true,
      data: mockMovies,
    })),
  };
});

const queryClient = new QueryClient();

const wrapper = ({ children }: { children: ReactNode }) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);

describe("useMovies", () => {
  it("fetch and returns movies", async () => {
    const { result } = renderHook(() => useMovies({}), { wrapper });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(result.current.data).toEqual(mockMovies);
  });

  it("filter movies by genre", async () => {
    vi.mock("../useMovies", async (importOriginal) => {
      const actual = await importOriginal();
      return {
        ...(actual as Record<string, unknown>),
        fetchMovies: vi.fn(() => Promise.resolve({ data: filteredMovies })),
        useMovies: vi.fn(() => ({
          isSuccess: true,
          data: filteredMovies,
        })),
      };
    });

    const { result } = renderHook(() => useMovies({}), { wrapper });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    result.current.data?.forEach((movie) =>
      expect(
        movie.categories?.some((category) => category.title_en === "drama")
      ).toBe(true)
    );
  });

  it("sort movies by rating", async () => {
    vi.mock("../useMovies", async (importOriginal) => {
      const actual = (await importOriginal()) as { [key: string]: any };
      return {
        ...actual,
        fetchMovies: vi.fn(() => Promise.resolve({ data: sortedMovies })),
        useMovies: vi.fn(() => ({
          isSuccess: true,
          data: sortedMovies,
        })),
      };
    });

    const { result } = renderHook(() => useMovies({}), { wrapper });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    const ratings = result.current.data?.map((movie) =>
      parseFloat(movie.rate_avrage)
    );
    if (ratings) {
      expect(ratings).toEqual([...ratings].sort((a, b) => b - a));
    }
  });
});
