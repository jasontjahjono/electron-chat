import { ref, onValue, getDatabase } from "firebase/database";

export const onConnectionChanged = (onConnection) => {
  const db = getDatabase();
  return onValue(ref(db, ".info/connected"), (snap) => {
    onConnection(snap.val() ? "connected" : "disconnected");
  });
};
