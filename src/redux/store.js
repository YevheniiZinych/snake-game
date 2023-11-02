import { configureStore } from "@reduxjs/toolkit";
import { playersReducer } from "./Players/playersSlice";

export const store = configureStore({
  reducer: {
    players: playersReducer,
  },
});
