import { createAsyncThunk } from "@reduxjs/toolkit";

import { LogInPayload } from "./types";
import { api } from "../../api";

export const loginUser = createAsyncThunk(
  "users/login",
  async ({ username, password }: LogInPayload) => {
    const response = await api.fetchUserToken({ username, password });
    return response;
  }
);
