import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  isAuth: false,
  user: {},
};

const User = createSlice({
  name: "user",
  initialState,
  reducers: {
    logIn(state, action) {
      state.isAuth = true;
      state.user = action.payload;
    },
    logOut(state, action) {
      return (state = initialState);
    },
    updateField(state, action) {
      const { payload } = action;
      const key = Object.keys(payload);
      state.user[key] = payload[key];
    },
  },
});

export const { logIn, logOut, updateField } = User.actions;

export default User.reducer;
