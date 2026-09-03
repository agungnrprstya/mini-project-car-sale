import { auth } from "../configs/firebase";
import { signOut } from "firebase/auth";
import Cookies from "js-cookie";

const authentication = {
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
