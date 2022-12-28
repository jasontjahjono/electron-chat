const DEFAULT_STATE = {
  isChecking: false,
  user: null,
};

const authReducer = (state = DEFAULT_STATE, action) => {
  switch (action.type) {
    case "AUTH_ON_INIT":
      return { user: null, isChecking: true };
    case "AUTH_ON_SUCCESS":
      return { user: action.user, isChecking: false };
    case "AUTH_ON_ERROR":
      return { user: null, isChecking: false };
    default: {
      return state;
    }
  }
};

export default authReducer;
