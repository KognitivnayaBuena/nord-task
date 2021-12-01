import { Statuses } from "../types";

export type Server = {
  id: string;
  name: string;
  distance: number;
};

export type ServersState = {
  servers: Server[];
  errorMessage?: string;
  status: Statuses;
};
