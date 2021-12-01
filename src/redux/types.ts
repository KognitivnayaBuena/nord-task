import type { AnyAction } from "redux";
import type { ThunkDispatch } from "redux-thunk";

import { UserState } from "./user/types";
import { ServersState } from "./servers/types";

export type Store = {
  user: UserState;
  servers: ServersState;
};

export enum Statuses {
  Success = "success",
  Loading = "loading",
  Error = "error",
}

export type Dispatch = ThunkDispatch<Store, any, AnyAction>;

export type Action<TPayload> = {
  type: string;
  payload: TPayload;
};
