import AuthSliceReducer from "./Slice/AuthSlice";
import { configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";
import dietitianSlice from "./Slice/dietitianSlice";
import { useDispatch } from "react-redux";
import timeslotSlice from "./Slice/timeslotSlice";

export const store = configureStore({
  reducer: {
    user: AuthSliceReducer,
    dietitian: dietitianSlice,
    timeslot: timeslotSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: {
          jwt: window.localStorage.getItem("token"),
        },
      },
    }).concat(logger),
});

export type IRootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
