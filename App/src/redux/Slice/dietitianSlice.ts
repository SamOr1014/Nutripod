import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const { REACT_APP_API_SERVER } = process.env;

export interface DietitianDetails {
  id: number;
  first_name: string;
  last_name: string;
}

export const fetchDietitianDetail = createAsyncThunk(
  "@@dietitian/get",
  async (_, thunkAPI) => {
    const { data } = await axios.get(`${REACT_APP_API_SERVER}/user/dietitians`);
    return data;
  }
);

const initialState: Array<DietitianDetails> = [];

export const dietitianSlice = createSlice({
  name: "dietitian",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchDietitianDetail.fulfilled, (state, action) => {
      return action.payload;
    });
  },
});

export default dietitianSlice.reducer;
