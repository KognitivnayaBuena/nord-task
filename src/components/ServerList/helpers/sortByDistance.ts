import { Server } from "../../../redux/servers/types";
import {
  sortServersIncreaseByDistance,
  sortServersDecreaseByDistance,
} from "../../../utils/serverSort";

export type SortType = "up" | "down" | null;

export function sortByDistance(
  list: Server[],
  sortType: SortType
): { sortList: Server[]; sort: SortType } {
  if (sortType === "down") {
    const sortList = list.slice().sort(sortServersIncreaseByDistance);
    return { sortList, sort: "up" };
  }

  const sortList = list.slice().sort(sortServersDecreaseByDistance);
  return { sortList, sort: "down" };
}
