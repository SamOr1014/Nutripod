import { createAsyncThunk } from "@reduxjs/toolkit"
import jwt_decode, { JwtPayload } from "jwt-decode"
import axios from "axios"
const { REACT_APP_API_SERVER } = process.env;

export type Error = {
    error: string;
};
type userInfo = { username: string, password: string, saveLoggedIn: boolean }
type ThunkExtraInfo = { rejectValue: Error; extra: { jwt: string | null } }

export const loginThunk = createAsyncThunk<any, userInfo, ThunkExtraInfo>(
    '@user/login', async ({ username, password, saveLoggedIn }: { username: string, password: string, saveLoggedIn: boolean }, thunkAPI) => {

        try {
        let info = { username, password }
        const result = await axios.post
        (`${REACT_APP_API_SERVER}/user/login`, {
            data: {
                user:info
            }
        })

        if (result.data.success && saveLoggedIn) {
            thunkAPI.extra.jwt = result.data.token
            window.localStorage.setItem("userLocalToken", result.data.token)
            return {data: result.data.info, success: true}
        } else if (result.data.success && !saveLoggedIn) {
            thunkAPI.extra.jwt = result.data.token
            sessionStorage.setItem("userSessionToken", result.data.token)
            return {data: result.data.info, success: true}
        } 

        } catch (err:any) {
            return thunkAPI.rejectWithValue({ error: err.response.data.message } as Error)
        }
    }
)