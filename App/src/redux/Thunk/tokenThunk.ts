import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const { REACT_APP_API_SERVER } = process.env;

export type Error = {
    error: string;
};
type userInfo = { username: string; password: string; saveLoggedIn: boolean };
type ThunkExtraInfo = { rejectValue: Error; extra: { jwt: string | null } };

