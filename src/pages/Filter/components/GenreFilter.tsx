import { ChangeEvent, useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate, useSearch } from "@tanstack/react-router";

import { FilterSearch } from "@routes/filter.lazy";
import Dropdown from "@components/Dropdown";

const GenreFilter: React.FC = () => {
  const navigate = useNavigate();
  const { genre } = useSearch({
    strict: false,
    select: (search: FilterSearch) => ({
      genre: search.genre?.split(","),
    }),
  });
  const [selected, setSelected] = useState<string[]>(genre ?? []);

  useEffect(() => {
    navigate({
      to: "/filter",
      replace: true,
      search: (prev: FilterSearch) => ({
        ...prev,
        genre: selected.length ? selected.join(",") : undefined,
      }),
    });
  }, [selected]);

  const handleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      if (selected.includes(e.target.name)) {
        setSelected((prev) => prev.filter((i) => i !== e.target.name));
      } else {
        setSelected((prev) => [...prev, e.target.name]);
      }
    },
    [selected, setSelected]
  );

  const options = useMemo(() => {
    return [
      {
        name: "drama",
        label: "درام",
        isActive: selected?.includes("drama"),
        onChange: handleChange,
      },
      {
        name: "action",
        label: "اکشن",
        isActive: selected?.includes("action"),
        onChange: handleChange,
      },
      {
        name: "comedy",
        label: "کمدی",
        isActive: selected?.includes("comedy"),
        onChange: handleChange,
      },
      {
        name: "sci-fi",
        label: "علمی تخیلی",
        isActive: selected?.includes("sci-fi"),
        onChange: handleChange,
      },
    ];
  }, [selected, handleChange]);

  return (
    <Dropdown options={options} placeholder="ژانر" badge={selected.length} />
  );
};

export default GenreFilter;
