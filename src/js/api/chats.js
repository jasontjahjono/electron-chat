import db from "../db/firestore";
import { collection, getDocs, addDoc } from "firebase/firestore";

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
