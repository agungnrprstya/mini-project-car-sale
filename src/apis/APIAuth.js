import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../configs/firebase";
import authentication from "../utils/authentication";

export const APIAuth = {
  signInWithCredentials: async ({ email, password }) => {
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      const { idToken, refreshToken } = result._tokenResponse;
      authentication.storeCredentialsToCookie({ idToken, refreshToken });
      console.log(result);
    } catch (err) {
      console.error(err);
      throw new Error(err);
    }
  },
  signInWithGoogleOAuth: async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const { oauthAccessToken, refreshToken } = result._tokenResponse;
      authentication.storeCredentialsToCookie({ oauthAccessToken, refreshToken });
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
