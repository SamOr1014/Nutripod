import { createAsyncThunk } from "@reduxjs/toolkit"
import jwt_decode, { JwtPayload } from "jwt-decode"
import axios from "axios"

export type Error = {
    error: string;
};

type userInfo = { username: string, password: string }
type ThunkExtraInfo = { rejectValue: Error; extra: { jwt: string | null } }

export const loginThunk = createAsyncThunk<any, userInfo, ThunkExtraInfo>(
    '@user/login', async ({ username, password }: { username: string, password: string }, thunkAPI) => {

        try {
            let info = { username, password }
            const res = await fetch("http://localhost:8080/user", {
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify(info)
            })

            const result = await res.json()
            if (result.success) {
                thunkAPI.extra.jwt = result.token
                window.localStorage.setItem("userToken", result.token)
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