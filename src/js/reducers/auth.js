import { combineReducers } from "redux";
import { createErrorReducer, createIsCheckingReducer } from "./common";

const createLoginReducer = () =>
  combineReducers({
    isChecking: createIsCheckingReducer("AUTH_LOGIN"),
    error: createErrorReducer("AUTH_LOGIN"),
  });

const createRegisterReducer = () =>
  combineReducers({
    isChecking: createIsCheckingReducer("AUTH_REGISTER"),
    error: createErrorReducer("AUTH_REGISTER"),
  });

const createAuthReducer = () => {
  const user = (state = null, action) => {
    switch (action.type) {
      case "AUTH_ON_ERROR":
      case "AUTH_ON_INIT":
        return null;
      case "AUTH_LOGIN_SUCCESS":
      case "AUTH_ON_SUCCESS":
        return action.user;
      default: {
        return state;
      }
    }
  };

  return combineReducers({
    user,
    isChecking: createIsCheckingReducer("AUTH_ON"),
    login: createLoginReducer(),
    register: createRegisterReducer(),
  });
};

export default createAuthReducer();
