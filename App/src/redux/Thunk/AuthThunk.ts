import { createAsyncThunk } from "@reduxjs/toolkit"
import jwt_decode, { JwtPayload } from "jwt-decode"
import axios from "axios"
const { REACT_APP_API_SERVER } = process.env;

export type Error = {
    error: string;
};

type userInfo = { username: string, password: string }
type ThunkExtraInfo = { rejectValue: Error; extra: { jwt: string | null } }

export const loginThunk = createAsyncThunk<any, userInfo, ThunkExtraInfo>(
    '@user/login', async ({ username, password }: { username: string, password: string }, thunkAPI) => {

        try {
            let info = { username, password }
            const result = await axios.post
            (`${REACT_APP_API_SERVER}/api/user/`, {
                headers: {
                    "content-type": "application/json"
                },
                data: {
                    user:info
                }
            })

            
            if (result.data.success) {
                thunkAPI.extra.jwt = result.data.token
                window.localStorage.setItem("userToken", result.data.token)
                // decode and return the id & username to set status
                // let payload: JwtPayload = jwt_decode(result.token)
                // return payload as userInfo
                return { username, password }
            }
            // if failed, will return rejected action
         
        } catch (err) {
            return thunkAPI.rejectWithValue({ error: "login failed." } as Error)
        }
    })