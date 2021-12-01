import { Statuses, Store } from "../types";
import { Server } from "./types";

export const serversSelector = (state: Store): Server[] =>
  state.servers.servers;
export const serversStatusSelector = (state: Store): Statuses =>
  state.servers.status;
export const serversErrorMessageSelector = (state: Store): string | undefined =>
  state.servers.errorMessage;
