import { configureStore } from "@reduxjs/toolkit";
import { userSlice } from "./user/reducer";
import { serversSlice } from "./servers/reducer";

export default configureStore({
  reducer: {
    user: userSlice.reducer,
    servers: serversSlice.reducer,
  },
});
