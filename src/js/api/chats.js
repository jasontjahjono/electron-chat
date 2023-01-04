import db from "../db/firestore";
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  doc,
  arrayUnion,
  getDoc,
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

export const subscribeToChat = async (chatId) => {
  const chat = await getDoc(doc(db, "chats", chatId));
  return { id: chatId, ...chat.data() };
};
