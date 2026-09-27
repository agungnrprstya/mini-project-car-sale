import { signInWithEmailAndPassword, signInWithPopup, createUserWithEmailAndPassword } from "firebase/auth";
import { auth, googleProvider } from "../configs/firebase";
import authentication from "../utils/authentication";

export const APIAuth = {
  signInWithCredentials: async ({ email, password }) => {
    try {
      // Sesi disimpan oleh Firebase (IndexedDB), bukan oleh cookie.
      await signInWithEmailAndPassword(auth, email, password);
    } catch (err) {
      console.error(err);
      throw new Error(err);
    }
  },
  signInWithGoogleOAuth: async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (err) {
      console.error(err);
      throw new Error(err);
    }
  },

  createAccount: async ({ email, password }) => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
    } catch (err) {
      console.error(err);
      throw new Error(err);
    }
  },

  signOut: async () => {
    try {
      await authentication.logOut();
    } catch (err) {
      console.error(err);
      throw new Error(err);
    }
  },
};
