import {
  getAuth,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  signInWithEmailAndPassword,
} from "firebase/auth";
import db from "../db/firestore";
import { setDoc, doc, getDoc } from "firebase/firestore";

const createUserProfile = async (userProfile) => {
  await setDoc(doc(db, "profiles", userProfile.uid), userProfile);
};

export const register = async ({ email, password, username, avatar }) => {
  const auth = getAuth();
  const { user } = await createUserWithEmailAndPassword(auth, email, password);
  await createUserProfile({
    uid: user.uid,
    username,
    email,
    avatar,
    joinedChats: [],
  });
};

export const onAuthStateChanges = (onAuth) => {
  const auth = getAuth();
  onAuthStateChanged(auth, onAuth);
};

export const logout = () => {
  const auth = getAuth();
  return signOut(auth);
};

export const login = ({ email, password }) => {
  const auth = getAuth();
  return signInWithEmailAndPassword(auth, email, password);
};

export const getUserProfile = async (uid) => {
  try {
    const profile = await getDoc(doc(db, "profiles", uid));
    if (profile.exists()) {
      return profile.data();
    } else {
      console.log("Document does not exist");
      return null;
    }
  } catch (err) {
    console.log(err);
  }
};
