import { collection, getDocs, doc, setDoc, deleteDoc } from "firebase/firestore";
import { db } from "../configs/firebase";

export const APIAdmins = {
  getAdmins: async () => {
    try {
      const result = await getDocs(collection(db, "admins"));
      const admins = result.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      return admins;
    } catch (error) {
      console.error(error);
      throw error;
    }
  },

  addAdmin: async (uid) => {
    try {
      // doc id == auth UID; set() allows creating with a known id
      await setDoc(doc(db, "admins", uid), { uid, addedAt: new Date().toISOString() });
      return "Successfully added admin!";
    } catch (e) {
      console.error("Error adding document: ", e);
      throw e;
    }
  },

  deleteAdmin: async (uid) => {
    try {
      await deleteDoc(doc(db, "admins", uid));
      return "Successfully deleted admin!";
    } catch (e) {
      console.error("Error deleting document: ", e);
      throw e;
    }
  },
};
