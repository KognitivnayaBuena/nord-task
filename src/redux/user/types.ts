import { Statuses } from "../types";

export type LogInPayload = {
  username: string;
  password: string;
};

export type UserState = {
  token: string;
  status: Statuses;
  errorMessage?: string;
};
