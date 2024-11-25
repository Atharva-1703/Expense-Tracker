import { createSlice } from "@reduxjs/toolkit";

// ? initial state
const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: JSON.parse(localStorage.getItem("userInfo")) || null,
  },
  // ? reducers
  reducers: {
    loginAction: (state, action) => {
      state.user = action.payload;
    },
    // ? logout action
    logoutAction: (state, action) => {
      state.user = null;
    },
  },
});

// ! actions
export const { loginAction, logoutAction } = authSlice.actions;
// ? reducer
const authReducer = authSlice.reducer;
export default authReducer;
