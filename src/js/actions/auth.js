import * as api from "../api/auth";

export const registerUser = (formData) => (dispatch) => {
  dispatch({ type: "AUTH_REGISTER_INIT" });
  return api
    .register(formData)
    .then((user) => dispatch({ type: "AUTH_REGISTER_SUCCESS", user }))
    .catch((error) => dispatch({ type: "AUTH_REGISTER_ERROR", error }));
};

export const listenToAuthChanges = () => (dispatch) => {
  dispatch({ type: "AUTH_ON_INIT" });
  return api.onAuthStateChanges(async (user) => {
    if (user) {
      const userProfile = await api.getUserProfile(user.uid);
      dispatch({ type: "AUTH_ON_SUCCESS", user: userProfile });
    } else {
      dispatch({ type: "AUTH_ON_ERROR" });
    }
  });
};

export const logout = () => (dispatch) => {
  api.logout().then((_) => {
    dispatch({ type: "AUTH_LOGOUT_SUCCESS" });
    dispatch({ type: "CONNECTION_USER_STATUS_CHANGED" });
    dispatch({ type: "CHATS_FETCH_RESTART" });
  });
};

export const loginUser = (formData) => (dispatch) => {
  dispatch({ type: "AUTH_LOGIN_INIT" });
  return api
    .login(formData)
    .then((user) => dispatch({ type: "AUTH_LOGIN_SUCCESS", user }))
    .catch((error) => {
      dispatch({ type: "AUTH_LOGIN_ERROR", error });
    });
};
