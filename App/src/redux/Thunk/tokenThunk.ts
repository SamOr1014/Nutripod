import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const { REACT_APP_API_SERVER } = process.env;

export type Error = {
  error: string;
};

type ThunkExtraInfo = { rejectValue: Error; extra: { jwt: string | null } };

export const tokenThunk = createAsyncThunk<any, string, ThunkExtraInfo>(
  "@user/tokenLogin",
  async (token, thunkAPI) => {
    try {
      const result = await axios.post(
        `${REACT_APP_API_SERVER}/user/checkToken`,
        {
          data: {
            token: token,
          },
        }
      );

      if (result.data.success) {
        return { data: result.data.result, success: true };
      }
      return { success: false };
    } catch (err: any) {
      return thunkAPI.rejectWithValue({
        error: err.response.data.message,
      } as Error);
    }
  }
);
