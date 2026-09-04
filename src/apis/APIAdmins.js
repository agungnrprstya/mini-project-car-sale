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
      // Cheap sanity check — Firebase Auth UIDs are 28 chars, alphanumeric.
      // A typo would otherwise create a phantom admin doc.
      if (!/^[a-zA-Z0-9]{28}$/.test(uid)) {
        throw new Error("Invalid UID: expected a 28-character alphanumeric Firebase Auth UID");
      }
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
