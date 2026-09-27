import { auth } from "../configs/firebase";
import { signOut } from "firebase/auth";
import Cookies from "js-cookie";
import { persistor } from "../store";

const authentication = {
  // Status login dibaca dari sesi Firebase (lihat hooks/useAuthUser.js).
  // Cookie kredensial tidak lagi dipakai sebagai sumber status login, jadi
  // fungsi isAuthorized()/getToken() sudah dihapus agar tidak ada dua sumber
  // kebenaran yang bisa berbeda.
  async logOut() {
    try {
      await signOut(auth);
      this.clearLegacyCookies();
      await persistor.purge();
    } catch (err) {
      console.error(err);
    }
  },

  // Membersihkan cookie kredensial versi lama yang mungkin masih tersimpan di
  // browser pengguna agar tidak tertinggal setelah mekanisme ini dihapus.
  clearLegacyCookies() {
    Cookies.remove("idToken");
    Cookies.remove("oauthAccessToken");
    Cookies.remove("localId");
  },
};

export default authentication;
