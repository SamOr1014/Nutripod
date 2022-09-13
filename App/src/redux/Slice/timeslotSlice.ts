import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const { REACT_APP_API_SERVER } = process.env;

export interface Timeslot {
  id: number;
  time: string;
}

export const fetchTimeSlotToRedux = createAsyncThunk(
  "@@timeslot/get",
  async (_, thunkAPI) => {
    const { data } = await axios.get(
      `${REACT_APP_API_SERVER}/booking/timeslot`
    );
    return data;
  }
);

const initialState: Array<Timeslot> = [];

export const timeslotSlice = createSlice({
  name: "timeslot",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchTimeSlotToRedux.fulfilled, (state, action) => {
      return action.payload;
    });
  },
});

export default timeslotSlice.reducer;
