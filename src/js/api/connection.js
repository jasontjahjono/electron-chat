import { ref, onValue, getDatabase } from "firebase/database";
import { doc, updateDoc, serverTimestamp } from "firebase/firestore";
import db from "../db/firestore";

export const onConnectionChanged = (onConnection) => {
  const db = getDatabase();
  return onValue(ref(db, ".info/connected"), (snap) => {
    onConnection(snap?.val() ? snap.val() : false);
  });
};

const getOnlineStatus = (isOnline) => ({
  state: isOnline ? "online" : "offline",
  lastChanged: serverTimestamp(),
});

export const setUserOnlineStatus = async (userId, isOnline) => {
  const userRef = doc(db, "profiles", userId);
  await updateDoc(userRef, getOnlineStatus(isOnline));
};
