import { Server } from "../redux/servers/types";

export function sortServersByNameFromAToZ(a: Server, b: Server) {
  return a.name.localeCompare(b.name);
}

export function sortServersByNameFromZToA(a: Server, b: Server) {
  return b.name.localeCompare(a.name);
}

export function sortServersIncreaseByDistance(a: Server, b: Server): number {
  if (a.distance > b.distance) {
    return 1;
  }
  if (a.distance < b.distance) {
    return -1;
  }
  return 0;
}

export function sortServersDecreaseByDistance(a: Server, b: Server): number {
  if (a.distance < b.distance) {
    return 1;
  }
  if (a.distance > b.distance) {
    return -1;
  }
  return 0;
}
