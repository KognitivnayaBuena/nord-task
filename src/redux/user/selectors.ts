import { Statuses, Store } from "../types";

export const userTokenSelector = (state: Store): string => state.user.token;
export const userStatusSelector = (state: Store): Statuses => state.user.status;
export const userErrorMessageSelector = (state: Store): string | undefined =>
  state.user.errorMessage;
