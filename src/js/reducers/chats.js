const DEFAULT_STATE = {
  items: [],
};

const chatReducer = (state = DEFAULT_STATE, action) => {
  switch (action.type) {
    case "CHATS_FETCH_SUCCESS":
      return { items: action.chats };
    default: {
      return state;
    }
  }
};

export default chatReducer;
