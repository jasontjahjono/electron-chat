import { configureStore } from "@reduxjs/toolkit";
import thunkMiddleware from "redux-thunk";
import authReducer from "../reducers/auth";
import chatReducer from "../reducers/chats";
import appReducer from "../reducers/app";

import appMiddleware from "./middlewares/app";

const store = configureStore({
  reducer: {
    chats: chatReducer,
    auth: authReducer,
    app: appReducer,
  },
  middleware: [thunkMiddleware, appMiddleware],
});

export default store;
