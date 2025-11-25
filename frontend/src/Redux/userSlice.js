import { createSlice } from "@reduxjs/toolkit";
import { act } from "react";
const userSlice = createSlice({
  name: "user",
  initialState: {
    userData: null,
    otherUsers: null,
    selectedUser: null,
    socket: null,
    onlineUsers: null,
    searchedUsers: null,
  },
  reducers: {
    setUserData: (state, action) => {
      state.userData = action.payload;
    },
    setOtherUsers: (state, action) => {
      state.otherUsers = action.payload;
    },
    setselectedUser: (state, action) => {
      state.selectedUser = action.payload;
    },
    setSocket: (state, action) => {
      state.socket = action.payload;
    },
    setOnlineUsers: (state, action) => {
      state.onlineUsers = action.payload;
    },
    setSearchedUsers: (state, action) => {
      state.searchedUsers = action.payload;
    },
  },
});

export const {
  setUserData,
  setOtherUsers,
  setselectedUser,
  setSocket,
  setOnlineUsers,
  setSearchedUsers,
} = userSlice.actions;
export default userSlice.reducer;
