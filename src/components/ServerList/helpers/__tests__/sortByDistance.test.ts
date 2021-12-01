import { Server } from "../../../../redux/servers/types";
import { sortByDistance } from "../sortByDistance";

const mockServersList: Server[] = [
  { id: "0", name: "Germany #1", distance: 1 },
  { id: "1", name: "Germany #4", distance: 5 },
  { id: "2", name: "Germany #5", distance: 8 },
  { id: "3", name: "Germany #2", distance: 2 },
  { id: "4", name: "Germany #3", distance: 4 },
];

test("sortByDistance increase", () => {
  const resultIncreaseServersList: Server[] = [
    { id: "0", name: "Germany #1", distance: 1 },
    { id: "3", name: "Germany #2", distance: 2 },
    { id: "4", name: "Germany #3", distance: 4 },
    { id: "1", name: "Germany #4", distance: 5 },
    { id: "2", name: "Germany #5", distance: 8 },
  ];

  expect(sortByDistance(mockServersList, "down")).toEqual({
    sortList: resultIncreaseServersList,
    sort: "up",
  });
});

test("sortByDistance decrease", () => {
  const resultDecreaseServersList: Server[] = [
    { id: "2", name: "Germany #5", distance: 8 },
    { id: "1", name: "Germany #4", distance: 5 },
    { id: "4", name: "Germany #3", distance: 4 },
    { id: "3", name: "Germany #2", distance: 2 },
    { id: "0", name: "Germany #1", distance: 1 },
  ];

  expect(sortByDistance(mockServersList, "up")).toEqual({
    sortList: resultDecreaseServersList,
    sort: "down",
  });
});

test("empty array", () => {
  const resultServersList: Server[] = [];

  expect(sortByDistance([], "down")).toEqual({
    sortList: resultServersList,
    sort: "up",
  });
});

test("empty array with wrong sort type", () => {
  const resultServersList: Server[] = [];

  // @ts-ignore Ingore type validation to test function with unexpected sort type
  expect(sortByDistance([], "cat")).toEqual({
    sortList: resultServersList,
    sort: "down",
  });
});
