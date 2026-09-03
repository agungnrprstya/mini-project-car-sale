import { auth } from "../configs/firebase";
import { CONST } from "./constant";
import { signOut } from "firebase/auth";
import Cookies from "js-cookie";
import { persistor } from "../store";

// The list of admin UIDs, from env vars
const ADMIN_IDS = [CONST.ADMIN_ID_1, CONST.ADMIN_ID_2].filter(Boolean);

const authentication = {
  isAuthorizedAdmin() {
    // Only trust the Firebase Auth session — auth.currentUser is maintained
    // by the Firebase SDK and cannot be forged from the browser console.
    const currentUser = auth.currentUser;
    if (!currentUser) return false;
    return ADMIN_IDS.includes(currentUser.uid);
  },

  isAuthorized() {
    if (this.getToken()) return true;
    return false;
  },

  getToken() {
    const token = Cookies.get("idToken") || Cookies.get("oauthAccessToken");
    return token;
  },

  storeCredentialsToCookie({ idToken, oauthAccessToken, localId }) {
    if (idToken) Cookies.set("idToken", idToken);
    if (oauthAccessToken) Cookies.set("oauthAccessToken", oauthAccessToken);
    if (localId) Cookies.set("localId", localId);
  },

  clearCredentialsFromCookie() {
    Cookies.remove("idToken");
    Cookies.remove("oauthAccessToken");
    Cookies.remove("localId");
  },

  async logOut() {
    try {
      await signOut(auth);
      this.clearCredentialsFromCookie();
      await persistor.purge();
    } catch (err) {
      console.error(err);
    }
  },
};

export default authentication;
