import { createSlice } from "@reduxjs/toolkit";

import { Statuses } from "../types";
import { loginUser } from "./actions";
import { UserState } from "./types";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    token: "",
    status: Statuses.Success,
    errorMessage: "",
  },
  reducers: {
    clearState: (state: UserState) => {
      state.status = Statuses.Success;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      loginUser.fulfilled,
      (state: UserState, { payload }: { payload: { token: string } }) => {
        state.token = payload.token;
        state.status = Statuses.Success;
      }
    );
    builder.addCase(loginUser.rejected, (state: UserState, action) => {
      state.status = Statuses.Error;
      state.errorMessage = action.error.message;
    });
    builder.addCase(loginUser.pending, (state: UserState) => {
      state.status = Statuses.Loading;
    });
    builder.addDefaultCase((state, action) => {});
  },
});

export const { clearState } = userSlice.actions;
