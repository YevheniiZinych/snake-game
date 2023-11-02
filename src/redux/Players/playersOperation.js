import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchPlayers = createAsyncThunk(
  "players/fetchPlayers",
  async (_, thunkAPI) => {
    try {
      const { data } = await axios.get(
        "https://snake-point-data-api.onrender.com/api/players"
      );

      return data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);

export const addPlayers = createAsyncThunk(
  "players/addPlayers",
  async (player, thunkAPI) => {
    try {
      const { data } = await axios.post(
        "https://snake-point-data-api.onrender.com/api/players",
        player
      );

      return data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);

export const removePlayers = createAsyncThunk(
  "players/removePlayers",
  async (playerId, thunkAPI) => {
    try {
      const { data } = await axios.post(
        `https://snake-point-data-api.onrender.com/api/players/${playerId}`
      );

      return data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);
