import { combineReducers } from "redux";

// const DEFAULT_STATE = {
//   isChecking: false,
//   user: null,
// };

const createAuthReducer = () => {
  const user = (state = null, action) => {
    switch (action.type) {
      case "AUTH_ON_ERROR":
      case "AUTH_ON_INIT":
        return null;
      case "AUTH_ON_SUCCESS":
        return action.user;
      default: {
        return state;
      }
    }
  };

  const isChecking = (state = false, action) => {
    switch (action.type) {
      case "AUTH_LOGIN_INIT":
      case "AUTH_REGISTER_INIT":
      case "AUTH_ON_INIT":
        return true;
      case "AUTH_LOGIN_SUCCESS":
      case "AUTH_REGISTER_SUCCESS":
        return false;
      default: {
        return state;
      }
    }
  };

  return combineReducers({ user, isChecking });
};

export default createAuthReducer();

// const authReducer = (state = DEFAULT_STATE, action) => {
//   switch (action.type) {
//     case "AUTH_LOGIN_INIT":
//     case "AUTH_REGISTER_INIT":
//       return { ...state, isChecking: true };
//     case "AUTH_LOGIN_SUCCESS":
//     case "AUTH_REGISTER_SUCCESS":
//       return { ...state, isChecking: false };
//     case "AUTH_ON_INIT":
//       return { user: null, isChecking: true };
//     case "AUTH_ON_SUCCESS":
//       return { user: action.user, isChecking: false };
//     case "AUTH_ON_ERROR":
//       return { user: null, isChecking: false };
//     default: {
//       return state;
//     }
//   }
// };

// export default authReducer;
