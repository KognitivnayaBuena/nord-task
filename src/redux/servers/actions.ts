import { UserState } from "../user/types";
import { createAsyncThunk } from "@reduxjs/toolkit";

import { api } from "../../api";

export const fetchServers = createAsyncThunk(
  "servers/fetchServers",
  async (_, thunkAPI) => {
    const { user } = thunkAPI.getState() as { user: UserState };
    const token = user.token;

    const response = await api.fetchServersList({ token });
    return response;
  }
);
