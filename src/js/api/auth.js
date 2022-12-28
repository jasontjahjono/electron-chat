import {
  getAuth,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
import db from "../db/firestore";
import { setDoc, doc } from "firebase/firestore";

const createUserProfile = async (userProfile) => {
  await setDoc(doc(db, "profiles", userProfile.uid), userProfile);
};

export const register = async ({ email, password, username, avatar }) => {
  const auth = getAuth();
  createUserWithEmailAndPassword(auth, email, password)
    .then(({ user }) => {
      createUserProfile({
        uid: user.uid,
        username,
        email,
        avatar,
        joinedChats: [],
      });
    })
    .catch((err) => {
      Promise.reject(err.message);
    });
};

export const onAuthStateChanges = (onAuth) => {
  const auth = getAuth();
  onAuthStateChanged(auth, onAuth);
};
