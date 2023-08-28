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
      return initialState;
    },
    updateField(state, action) {
      console.log(action.payload);
      const { payload } = action;
      const key = Object.keys(payload);
      state.user[key] = payload[key];
    },

    deleteField(state, action) {
      console.log(1, action.payload);
      const { payload } = action;
      const key = Object.keys(payload);
      const deleteIndex = state.user[key].findIndex(
        (obj) => obj._id.toString() === payload
      );

      state.user[key].splice(deleteIndex);
    },
  },
});

export const { logIn, logOut, updateField, deleteField, pushToField } =
  User.actions;

export default User.reducer;
