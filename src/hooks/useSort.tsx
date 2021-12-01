import { useState } from "react";

export type SortType = "up" | "down" | null;

export function useSort() {
  const [value, setSort] = useState<SortType>("down");

  return {
    value,
    setSort,
  };
}
