import {
  configureStore,
  createAsyncThunk,
  createSlice,
} from "@reduxjs/toolkit";
import { Server, ServersState } from "../redux/servers/types";
import { Statuses, Store } from "../redux/types";

import { LogInPayload, UserState } from "../redux/user/types";

const fetchUserToken = async ({ username, password }: LogInPayload) => {
  if (username === "cat" && password === "cat") {
    const promise: Promise<{ token: string }> = new Promise(
      (resolve, reject) => {
        resolve({ token: "cat" });
      }
    );

    return promise;
  } else {
    throw new Error("Wrong username or password");
  }
};

const fetchServersList = (token: string) => {
  if (token === "cat") {
    const promise: Promise<Server[]> = new Promise((resolve, reject) => {
      resolve([
        { id: "0", name: "United States #88", distance: 1234 },
        { id: "1", name: "United Kingdom #70", distance: 23 },
        { id: "2", name: "Singapore #91", distance: 5 },
        { id: "3", name: "United States #7", distance: 446 },
        { id: "4", name: "Japan #37", distance: 340 },
      ]);
    });

    return promise;
  } else {
    throw new Error("Something went wrong");
  }
};

export const fetchServers = createAsyncThunk(
  "servers/fetchServers",
  async (_, thunkAPI) => {
    const { user } = thunkAPI.getState() as { user: UserState };
    const token = user.token;

    const response = fetchServersList(token);
    return response;
  }
);

export const loginUser = createAsyncThunk(
  "users/login",
  async ({ username, password }: LogInPayload) => {
    const response = await fetchUserToken({ username, password });
    return response;
  }
);

const userSlice = createSlice({
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

export const { clearState } = userSlice.actions;

export const store = configureStore({
  reducer: {
    user: userSlice.reducer,
    servers: serversSlice.reducer,
  },
});

export const userTokenSelector = (state: Store): string => state.user.token;
export const userStatusSelector = (state: Store): Statuses => state.user.status;
export const userErrorMessageSelector = (state: Store): string | undefined =>
  state.user.errorMessage;
export const serversSelector = (state: Store): Server[] =>
  state.servers.servers;
export const serversStatusSelector = (state: Store): Statuses =>
  state.servers.status;
export const serversErrorMessageSelector = (state: Store): string | undefined =>
  state.servers.errorMessage;
