import Filter from "@pages/Filter";
import { createLazyFileRoute } from "@tanstack/react-router";

export type Genre =
  | "drama"
  | "action"
  | "comedy"
  | "sci-fi"
  | "family"
  | "adventure"
  | "crime"
  | "thriller"
  | "romance"
  | "horror";

export type RateAvrage = "asc" | "desc";

export type FilterSearch = {
  genre?: string;
  rate_avrage?: RateAvrage;
};

export const Route = createLazyFileRoute("/filter")({
  component: RouteComponent,
});

function RouteComponent() {
  return <Filter />;
}
