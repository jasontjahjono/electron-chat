export const createErrorReducer = (actionType) => {
  return (state = null, action) => {
    switch (action.type) {
      case `${actionType}_INIT`:
        return null;
      case `${actionType}_ERROR`:
        return action.error;
      default:
        return state;
    }
  };
};

export const createIsCheckingReducer = (actionType) => {
  return (state = false, action) => {
    switch (action.type) {
      case `${actionType}_INIT`:
        return true;
      case `${actionType}_ERROR`:
      case `${actionType}_SUCCESS`:
        return false;
      default:
        return state;
    }
  };
};
