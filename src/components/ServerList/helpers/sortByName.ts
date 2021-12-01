import { Server } from "../../../redux/servers/types";
import {
  sortServersByNameFromAToZ,
  sortServersByNameFromZToA,
} from "../../../utils/serverSort";

export type SortType = "up" | "down" | null;

export function sortByName(
  list: Server[],
  sortType: SortType
): { sortList: Server[]; sort: SortType } {
  if (sortType === "down") {
    const sortList = list.slice().sort(sortServersByNameFromAToZ);
    return { sortList, sort: "up" };
  }

  const sortList = list.slice().sort(sortServersByNameFromZToA);
  return { sortList, sort: "down" };
}
