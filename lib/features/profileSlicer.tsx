"use client";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface ProfileState {
  email: string;
  isLogin: boolean;
  token:string;
  name:string;
}

const initialState: ProfileState = {
  email: "",
  isLogin: false,
  token:"",
  name:""
};

export const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    setEmail: (state, action: PayloadAction<string>) => {
      state.email = action.payload;
    },
    setName: (state, action: PayloadAction<string>) => {
      state.name = action.payload;
    },
    setisLogin: (state,action: PayloadAction<boolean>) => {
      if(action.payload===false){
        state.email = "";
      }
      state.isLogin =  action.payload;
    },
    setToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setEmail, setisLogin,setToken,setName } = profileSlice.actions;

export default profileSlice.reducer;
