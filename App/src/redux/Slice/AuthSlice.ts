import { createSlice } from "@reduxjs/toolkit";
import { PayloadAction } from "@reduxjs/toolkit";
import Swal from "sweetalert2";
import { loginThunk } from "../Thunk/AuthThunk";

interface userInfo {
  id: number | null;
  username: string | null;
  first_name: string | null;
  last_name: string | null;
  email: string | null;
  birthday: Date | null;
  height: number | null;
  weight: number | null;
  gender: number | null;
  phone: number | null;
  address: string | null;
  profession: number | null;
  HKID: string | null;
  chronic_condition: number | null;
  education: number | null;
  is_deleted: boolean | null;
  is_user: boolean | null;
}

interface dietitianInfo {
  id: number | null;
  username: string | null;
  first_name: string | null;
  last_name: string | null;
  email: string | null;
  is_deleted: boolean | null;
  is_user: boolean | null;
}

export type userState = {
  user: Array<userInfo>;
  dietitian: Array<dietitianInfo>;
  loading: boolean;
  error: string | undefined;
  saveToken: boolean;
};

const initialState: userState = {
  user: [
    {
      id: null,
      username: null,
      first_name: null,
      last_name: null,
      email: null,
      birthday: null,
      height: null,
      weight: null,
      gender: null,
      phone: null,
      address: null,
      profession: null,
      HKID: null,
      chronic_condition: null,
      education: null,
      is_deleted: null,
      is_user: null,
    },
  ],
  dietitian: [
    {
      id: null,
      username: null,
      first_name: null,
      last_name: null,
      email: null,
      is_deleted: null,
      is_user: null,
    },
  ],
  loading: false,
  error: undefined,
  saveToken: false,
};

export type dietitianSavedInfo = {
  id: number;
  username: string;
  first_name: string;
  last_name: string;
  email: string;
  is_user: boolean;
  is_deleted: boolean;
  saveToken: boolean;
};
export type userSavedInfo = {
  id: number;
  username: string;
  first_name: string;
  last_name: string;
  email: string;
  birthday: Date;
  height: number;
  weight: number;
  gender: number;
  phone: number;
  address: string;
  profession: number;
  HKID: string;
  chronic_condition: number;
  education: number;
  is_deleted: boolean;
  is_user: boolean;
  saveToken: boolean;
};

export const authSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    userLogin: (state, action: PayloadAction<userSavedInfo>) => {
      return {
        ...state,
        user: [
          {
            id: action.payload.id,
            username: action.payload.username,
            first_name: action.payload.first_name,
            last_name: action.payload.last_name,
            email: action.payload.email,
            birthday: action.payload.birthday,
            height: action.payload.height,
            weight: action.payload.weight,
            gender: action.payload.gender,
            phone: action.payload.phone,
            address: action.payload.address,
            profession: action.payload.profession,
            HKID: action.payload.HKID,
            chronic_condition: action.payload.chronic_condition,
            education: action.payload.education,
            is_deleted: action.payload.is_deleted,
            is_user: action.payload.is_user,
          },
        ],
        saveToken: action.payload.saveToken,
      };
    },
    dietitianLogin: (state, action: PayloadAction<dietitianSavedInfo>) => {
      return {
        ...state,
        dietitian: [
          {
            id: action.payload.id,
            username: action.payload.username,
            first_name: action.payload.first_name,
            last_name: action.payload.last_name,
            email: action.payload.email,
            is_user: action.payload.is_user,
            is_deleted: action.payload.is_deleted,
          },
        ],
        saveToken: action.payload.saveToken,
      };
    },
    logout: (state) => {
      return {
        ...state,
        user: [
          {
            id: null,
            username: null,
            first_name: null,
            last_name: null,
            email: null,
            birthday: null,
            height: null,
            weight: null,
            gender: null,
            phone: null,
            address: null,
            profession: null,
            HKID: null,
            chronic_condition: null,
            education: null,
            is_deleted: null,
            is_user: null
          }
        ],
        dietitian: [
          {
            id: null,
            username: null,
            first_name: null,
            last_name: null,
            email: null,
            is_deleted: null,
            is_user: null
          }
        ]
      }
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(loginThunk.fulfilled, (state, action) => {
        console.log("check extra payload", action.payload);
        state.loading = false;

        if (action.payload.data.is_user === false) {
          state.dietitian = [
            {
              id: action.payload.data.id,
              username: action.payload.data.username,
              first_name: action.payload.data.first_name,
              last_name: action.payload.data.last_name,
              email: action.payload.data.email,
              is_deleted: action.payload.data.is_deleted,
              is_user: action.payload.data.is_user
            }
          ]
          state.saveToken = action.payload.saveToken;
        } else if (action.payload.data.is_user === true) {
          state.user = [
            {
              id: action.payload.data.id,
                  username: action.payload.data.username,
                  first_name: action.payload.data.first_name,
                  last_name: action.payload.data.last_name,
                  email: action.payload.data.email,
                  birthday: action.payload.data.birthday,
                  height: action.payload.data.height,
                  weight: action.payload.data.weight,
                  gender: action.payload.data.gender,
                  phone: action.payload.data.phone,
                  address: action.payload.data.address,
                  profession: action.payload.data.profession,
                  HKID: action.payload.data.hkid,
                  chronic_condition: action.payload.data.chronic_condition,
                  education: action.payload.data.education,
                  is_deleted: action.payload.data.is_deleted,
                  is_user: action.payload.data.is_user
            }
          ]
          state.saveToken = action.payload.saveToken;
        }
      })
      .addCase(loginThunk.rejected, (state, action: any) => {
        state.loading = false;
        Swal.fire("OOPS!", action.payload?.error, "error");
      });
  },
});

export const { userLogin, dietitianLogin, logout } = authSlice.actions;
export default authSlice.reducer;
