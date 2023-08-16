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
    uploadPhoto(state, action) {
      return { ...state.user, photo: action.payload };
    },
  },
});

export const { logIn, logOut, uploadPhoto } = User.actions;

export default User.reducer;
