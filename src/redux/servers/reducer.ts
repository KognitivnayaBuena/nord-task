import { createSlice } from "@reduxjs/toolkit";

import { Statuses } from "../types";
import { fetchServers } from "./actions";
import { Server, ServersState } from "./types";

export const serversSlice = createSlice({
  name: "servers",
  initialState: {
    servers: [
      {
        id: "0",
        name: "",
        distance: 1,
      },
    ],
    errorMessage: "",
    status: Statuses.Success,
  },
  reducers: {
    clearState: (state) => {
      state.servers = [
        {
          id: "0",
          name: "",
          distance: 1,
        },
      ];
      return state;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      fetchServers.fulfilled,
      (state: ServersState, { payload }) => {
        const serversWithId: Server[] = payload.map((server: Server) => {
          const id = `${server.name}-${server.distance}`;
          return { ...server, id };
        });
        state.servers = serversWithId;
        state.status = Statuses.Success;
      }
    );
    builder.addCase(fetchServers.rejected, (state: ServersState, action) => {
      state.errorMessage = action.error.message;
      state.status = Statuses.Error;
    });
    builder.addCase(fetchServers.pending, (state: ServersState) => {
      state.status = Statuses.Loading;
    });
    builder.addDefaultCase((state, action) => {});
  },
});
