import { createAsyncThunk } from "@reduxjs/toolkit"
import jwt_decode, { JwtPayload } from "jwt-decode"
import axios from "axios"

export type Error = {
    error: string;
};

type Auth = {
    username: string
    password: string
}

// export const loginThunk createAsyncThunk
// <any, Auth, { rejectValue: Error; extra: { jwt: string | null } }>
