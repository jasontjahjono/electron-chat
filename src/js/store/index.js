import { configureStore } from "@reduxjs/toolkit";
import thunkMiddleware from "redux-thunk";
import authReducer from "../reducers/auth";
import chatReducer from "../reducers/chats";

const store = configureStore({
  reducer: {
    chats: chatReducer,
    auth: authReducer,
  },
  middleware: [thunkMiddleware],
});

export default store;
