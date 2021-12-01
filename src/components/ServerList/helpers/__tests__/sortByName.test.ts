import { Server } from "../../../../redux/servers/types";
import { sortByName } from "../sortByName";

const mockServersList: Server[] = [
  { id: "3", name: "Germany #2", distance: 2 },
  { id: "0", name: "Germany #1", distance: 1 },
  { id: "4", name: "Germany #3", distance: 4 },
  { id: "2", name: "Germany #5", distance: 8 },
  { id: "1", name: "Germany #4", distance: 5 },
];

test("sortByName increase", () => {
  const resultAlphabeticServersList: Server[] = [
    { id: "0", name: "Germany #1", distance: 1 },
    { id: "3", name: "Germany #2", distance: 2 },
    { id: "4", name: "Germany #3", distance: 4 },
    { id: "1", name: "Germany #4", distance: 5 },
    { id: "2", name: "Germany #5", distance: 8 },
  ];

  expect(sortByName(mockServersList, "down")).toEqual({
    sortList: resultAlphabeticServersList,
    sort: "up",
  });
});

test("sortByName decrease", () => {
  const resultNonAlphabeticServersList: Server[] = [
    { id: "2", name: "Germany #5", distance: 8 },
    { id: "1", name: "Germany #4", distance: 5 },
    { id: "4", name: "Germany #3", distance: 4 },
    { id: "3", name: "Germany #2", distance: 2 },
    { id: "0", name: "Germany #1", distance: 1 },
  ];

  expect(sortByName(mockServersList, "up")).toEqual({
    sortList: resultNonAlphabeticServersList,
    sort: "down",
  });
});

test("empty array", () => {
  const resultServersList: Server[] = [];

  expect(sortByName([], "down")).toEqual({
    sortList: resultServersList,
    sort: "up",
  });
});

test("empty array with wrong sort type", () => {
  const resultServersList: Server[] = [];

  // @ts-ignore Ingore type validation to test function with unexpected sort type
  expect(sortByName([], "cat")).toEqual({
    sortList: resultServersList,
    sort: "down",
  });
});
