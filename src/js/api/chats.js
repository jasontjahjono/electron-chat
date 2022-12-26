import db from "../db/firestore";
import { collection, getDocs } from "firebase/firestore";

export const fetchChats = async () => {
  const chatCollection = collection(db, "chats");
  const chatSnap = await getDocs(chatCollection);
  const chatList = chatSnap.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  return chatList;
};
