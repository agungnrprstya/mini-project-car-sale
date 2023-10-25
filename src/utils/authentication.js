import { auth } from "../configs/firebase";
import { CONST } from "./constant";
import { signOut } from "firebase/auth";
import Cookies from "js-cookie";

const authentication = {
  isAuthorizedAdmin() {
    if (this.getLocalId() && this.getToken()) return true;
    return false;
  },

  isAuthorized() {
    if (this.getToken()) return true;
    return false;
  },

  getLocalId() {
    const localId = Cookies.get("localId");
    return localId === CONST.ADMIN_TOKEN_1 || localId === CONST.ADMIN_TOKEN_2;
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
      window.location.href = "/";
    } catch (err) {
      console.error(err);
    }
  },
};

export default authentication;
