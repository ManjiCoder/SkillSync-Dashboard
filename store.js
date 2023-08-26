import { configureStore } from "@reduxjs/toolkit";
import User from "./redux-slices/User";
import Static from "./redux-slices/Static";

const store = configureStore({
  reducer: {
    static: Static,
    user: User,
  },
});

export default store;
