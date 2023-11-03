import { createSlice } from "@reduxjs/toolkit";
import { fetchPlayers, addPlayers } from "./playersOperation";

const playersSlice = createSlice({
  name: "users",
  initialState: { players: [], isLoading: false },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchPlayers.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(fetchPlayers.fulfilled, (state, action) => {
      state.players = action.payload;
      state.isLoading = false;
    });
    builder.addCase(fetchPlayers.rejected, (state, action) => {
      state.isLoading = false;
    });
    builder.addCase(addPlayers.fulfilled, (state, action) => {
      state.players.push(...state.players, action.payload);
    });
  },
});

export const playersReducer = playersSlice.reducer;
