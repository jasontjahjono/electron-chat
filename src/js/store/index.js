import { configureStore } from "@reduxjs/toolkit";
import thunkMiddleware from "redux-thunk";
import chatReducer from "../reducers/chats";

const store = configureStore({
  reducer: {
    chats: chatReducer,
  },
  middleware: [thunkMiddleware],
});

export default store;
