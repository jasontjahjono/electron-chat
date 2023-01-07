import { doc, getDoc } from "firebase/firestore";
import * as api from "../api/chats";
import db from "../db/firestore";

export const fetchChats = () => async (dispatch, getState) => {
  const { user } = getState().auth;
  dispatch({ type: "CHATS_FETCH_INIT" });
  const chats = await api.fetchChats();

  chats.forEach(
    (chat) => (chat.joinedUsers = chat.joinedUsers.map((user) => user.id))
  );

  const sortedChats = chats.reduce(
    (accumChats, chat) => {
      const chatToJoin = chat.joinedUsers.includes(user.uid)
        ? "joined"
        : "available";
      accumChats[chatToJoin].push(chat);
      return accumChats;
    },
    { joined: [], available: [] }
  );

  dispatch({ type: "CHATS_FETCH_SUCCESS", ...sortedChats });
};

export const createChat = (formData, userId) => async (dispatch) => {
  const newChat = { ...formData };
  newChat.admin = doc(db, "profiles", userId);

  const chatId = await api.createChat(newChat);
  dispatch({ type: "CHATS_CREATE_SUCCESS" });
  await api.joinChat(userId, chatId);
  dispatch({ type: "CHATS_JOIN_SUCCESS", chat: { ...newChat, id: chatId } });
  return chatId;
};

export const joinChat = (chat, userId) => (dispatch) => {
  api.joinChat(userId, chat.id).then((_) => {
    dispatch({ type: "CHATS_JOIN_SUCCESS", chat });
  });
};

export const subscribeToChat = (chatId) => (dispatch) =>
  api.subscribeToChat(chatId, async (chat) => {
    const joinedUsers = await Promise.all(
      chat.joinedUsers.map(async (userRef) => {
        const userSnap = await getDoc(userRef);
        return userSnap.data();
      })
    );
    chat.joinedUsers = joinedUsers;
    dispatch({ type: "CHATS_SET_ACTIVE_CHAT", chat });
  });

export const subscribeToProfile = (userId, chatId) => (dispatch) =>
  api.subscribeToProfile(userId, (user) => {
    dispatch({ type: "CHATS_UPDATE_USER_STATE", user, chatId });
  });

export const sendChatMessage =
  (message, chatId) => async (dispatch, getState) => {
    const { user } = getState().auth;
    const userRef = doc(db, "profiles", user.uid);
    const newMessage = { ...message, author: userRef };
    await api.sendChatMessage(newMessage, chatId);
    return dispatch({ type: "CHATS_MESSAGE_SENT" });
  };

export const subscribeToMessages = (chatId) => (dispatch) => {
  return api.subscribeToMessages(chatId, async (changedMessages) => {
    const newMessages = changedMessages.map((message) => {
      if (message.type === "added") {
        return { id: message.doc.id, ...message.doc.data() };
      }
    });

    const messagesWithAuthor = [];
    const cache = {};

    for await (let message of newMessages) {
      if (cache[message.author.uid]) {
        message.author = cache[message.author.id];
      } else {
        const userSnap = await getDoc(message.author);
        const user = userSnap.data();
        message.author = user;
        cache[user.uid] = user;
      }
      messagesWithAuthor.push(message);
    }

    return dispatch({ type: "CHATS_SET_MESSAGES", messagesWithAuthor, chatId });
  });
};
