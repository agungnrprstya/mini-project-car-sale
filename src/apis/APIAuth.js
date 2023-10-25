import { signInWithEmailAndPassword, signInWithPopup, createUserWithEmailAndPassword } from "firebase/auth";
import { auth, googleProvider } from "../configs/firebase";
import authentication from "../utils/authentication";

export const APIAuth = {
  signInWithCredentials: async ({ email, password }) => {
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      const { idToken, localId } = result._tokenResponse;
      authentication.storeCredentialsToCookie({ idToken, localId });
      console.log(result);
    } catch (err) {
      console.error(err);
      throw new Error(err);
    }
  },
  signInWithGoogleOAuth: async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const { oauthAccessToken, localId } = result._tokenResponse;
      authentication.storeCredentialsToCookie({ oauthAccessToken, localId });
      console.log(result);
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
