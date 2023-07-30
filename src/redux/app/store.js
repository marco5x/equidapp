import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import userSlice from "../features/user/userSlice";
import consumptionSlice from "../features/consumption/consumptionSlice";
import { dolarApi } from "../api/dolarApi";

export const store = configureStore({
  reducer: {
    user: userSlice,
    consumption: consumptionSlice,
    [dolarApi.reducerPath]: dolarApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(dolarApi.middleware),
});

setupListeners(store.dispatch);
