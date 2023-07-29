import { configureStore } from "@reduxjs/toolkit";
import userSlice from "../features/user/userSlice";
import consumptionSlice from "../features/consumption/consumptionSlice";

export const store = configureStore({
  reducer: {
    user: userSlice,
    consumption: consumptionSlice,
  },
});
