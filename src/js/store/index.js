import { combineReducers, configureStore } from "@reduxjs/toolkit";
import thunkMiddleware from "redux-thunk";
import authReducer from "../reducers/auth";
import chatReducer from "../reducers/chats";
import appReducer from "../reducers/app";

import appMiddleware from "./middlewares/app";

const mainReducer = combineReducers({
  chats: chatReducer,
  auth: authReducer,
  app: appReducer,
});

const rootReducer = (state, action) => {
  if (action.type === "AUTH_LOGOUT_SUCCESS") {
    state = undefined;
  }

  return mainReducer(state, action);
};

const store = configureStore({
  reducer: rootReducer,
  middleware: [thunkMiddleware, appMiddleware],
});

export default store;
