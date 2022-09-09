import { createSlice } from "@reduxjs/toolkit";
import { PayloadAction } from "@reduxjs/toolkit";

interface userInfo {
    id: number|null
    name : string|null
    isStuff: boolean|null
}

export type userState = {
    user: Array<userInfo>,
    loading:boolean,
    error:string|undefined

}

const initialState:userState = {
    user:[{id:null,name:"",isStuff:null}],
    loading:false,
    error:undefined
}

export const authSlice = createSlice({
    name:"user",
    initialState,
    reducers:{
        login: (state, action:PayloadAction<userInfo>) => {
            return {
                ...state,
                user:[{
                    id:action.payload.id,
                    name:action.payload.name,
                    isStuff:action.payload.isStuff
                }]
    }
}}})


export const {login} = authSlice.actions
export default authSlice.reducer
