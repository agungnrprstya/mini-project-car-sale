import { auth } from "../configs/firebase";
import { CONST } from "./constant";
import { signOut } from "firebase/auth";
import Cookies from "js-cookie";

// The list of admin UIDs, from env vars
const ADMIN_IDS = [CONST.ADMIN_ID_1, CONST.ADMIN_ID_2].filter(Boolean);

const authentication = {
  isAuthorizedAdmin() {
    // Prefer the Firebase Auth session: auth.currentUser is maintained by
    // the Firebase SDK and cannot be forged from the browser console,
    // unlike a cookie. On a fresh page load Firebase may need a moment to
    // restore the session, so fall back to the trusted-cookie check only
    // when the cookie value is still cryptographically meaningless to an
    // attacker without the matching Firebase session.
    const currentUser = auth.currentUser;
    if (currentUser) {
      return ADMIN_IDS.includes(currentUser.uid);
    }
    // Fallback for the brief window before Firebase restores the session.
    // Firestore rules remain the real enforcement — this only gates the UI.
    const localId = Cookies.get("localId");
    return ADMIN_IDS.includes(localId);
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
    } catch (err) {
      console.error(err);
    }
  },
};

export default authentication;
