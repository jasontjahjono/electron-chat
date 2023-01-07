import db from "../db/firestore";
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  doc,
  arrayUnion,
  onSnapshot,
  setDoc,
} from "firebase/firestore";

export const fetchChats = async () => {
  const chatCollection = collection(db, "chats");
  const chatSnap = await getDocs(chatCollection);
  const chatList = chatSnap.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  return chatList;
};

export const createChat = async (chat) => {
  const docRef = await addDoc(collection(db, "chats"), chat);
  return docRef.id;
};

export const joinChat = async (userId, chatId) => {
  const userRef = doc(db, "profiles", userId);
  const chatRef = doc(db, "chats", chatId);

  // Update User's joinedChats
  await updateDoc(userRef, {
    joinedChats: arrayUnion(chatRef),
  });

  // Update Chat's joinedUsers
  await updateDoc(chatRef, {
    joinedUsers: arrayUnion(userRef),
  });
};

export const subscribeToChat = (chatId, onSubscribe) =>
  onSnapshot(doc(db, "chats", chatId), (chat) =>
    onSubscribe({ id: chatId, ...chat.data() })
  );

export const subscribeToProfile = (userId, onSubscribe) =>
  onSnapshot(doc(db, "profiles", userId), (user) => onSubscribe(user.data()));

export const sendChatMessage = (message, chatId) => {
  const messageRef = doc(db, "chats", chatId, "messages", message.timestamp);
  return setDoc(messageRef, message);
};

export const subscribeToMessages = (chatId, onSubscribe) => {
  const messagesRef = collection(db, "chats", chatId, "messages");
  return onSnapshot(messagesRef, (collection) => {
    return onSubscribe(collection.docChanges());
  });
};
