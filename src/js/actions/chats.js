import { doc } from "firebase/firestore";
import * as api from "../api/chats";
import db from "../db/firestore";

export const fetchChats = () => (dispatch) => {
  api.fetchChats().then((chats) =>
    dispatch({
      type: "CHATS_FETCH_SUCCESS",
      chats,
    })
  );
};

export const createChat = (formData, userId) => (dispatch) => {
  const newChat = { ...formData };
  const userRef = doc(db, "profiles", userId);
  newChat.admin = userRef;
  newChat.joinedUsers = [userRef];

  return api
    .createChat(newChat)
    .then((_) => dispatch({ type: "CHATS_CREATE_SUCCESS" }));
};
