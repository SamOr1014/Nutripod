import AuthSliceReducer from "./Slice/AuthSlice"
import { configureStore } from '@reduxjs/toolkit'
import logger from 'redux-logger';

export const store = configureStore({
    reducer: {
        user: AuthSliceReducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        thunk: {
            extraArgument: {
                jwt: window.localStorage.getItem("token")
            }
        }
    }).concat(logger)
})

export type IRootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch    