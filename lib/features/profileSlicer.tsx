"use client";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface ProfileState {
  email: string;
  password: string;
  isLogin: boolean;
}

const initialState: ProfileState = {
  email: "",
  password: "",
  isLogin: false,
};

export const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    setEmail: (state, action: PayloadAction<string>) => {
      state.email += action.payload;
    },
    setPass: (state, action: PayloadAction<string>) => {
      state.password += action.payload;
    },
    setisLogin: (state,action: PayloadAction<boolean>) => {
      if(action.payload===false){
        state.email = "";
        state.password="";
      }
      state.isLogin =  action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setEmail, setPass, setisLogin } = profileSlice.actions;

export default profileSlice.reducer;
