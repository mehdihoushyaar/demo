import { ChangeEvent, useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate, useSearch } from "@tanstack/react-router";

import { FilterSearch, RateAvrage } from "@routes/filter.lazy";
import Dropdown from "@components/Dropdown";

const SortFilter: React.FC = () => {
  const navigate = useNavigate();
  const { rate_avrage } = useSearch({
    strict: false,
    select: (search: FilterSearch) => ({
      rate_avrage: search.rate_avrage,
    }),
  });
  const [selected, setSelected] = useState<RateAvrage | undefined>(rate_avrage);

  useEffect(() => {
    navigate({
      to: "/filter",
      replace: true,
      search: (prev: FilterSearch) => ({
        ...prev,
        rate_avrage: selected,
      }),
    });
  }, [selected]);

  const handleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setSelected(e.target.checked ? (e.target.name as RateAvrage) : undefined);
    },
    [setSelected]
  );

  const options = useMemo(() => {
    return [
      {
        name: "desc",
        label: "بالاترین امتیاز",
        isActive: selected?.includes("desc"),
        onChange: handleChange,
      },
      {
        name: "asc",
        label: "پایین ترین امتیاز",
        isActive: selected?.includes("asc"),
        onChange: handleChange,
      },
    ];
  }, [selected, handleChange]);

  const badge = useMemo(() => {
    return options.find((i) => i.name === selected)?.label;
  }, [options, selected]);

  return <Dropdown options={options} placeholder="امتیاز فیلم" badge={badge} />;
};

export default SortFilter;
