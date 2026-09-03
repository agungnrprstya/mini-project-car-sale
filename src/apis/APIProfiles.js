import { collection, getDocs, addDoc, doc, deleteDoc, query, where } from "firebase/firestore";
import { db } from "../configs/firebase";
import Swal from "sweetalert2";

export const APIProfiles = {
  getProfiles: async () => {
    try {
      const result = await getDocs(collection(db, "profiles"));
      const profiles = result.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      return profiles;
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Failed to get profile data!",
        showConfirmButton: false,
        timer: 1500,
      });
      console.error(error);
      throw error;
    }
  },

  getProfileByUid: async (uid) => {
    try {
      const profilesRef = collection(db, "profiles");
      const q = query(profilesRef, where("uid", "==", uid));
      const querySnapshot = await getDocs(q);
      const profiles = [];
      querySnapshot.forEach((doc) => {
        profiles.push(doc.data());
      });
      return profiles;
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Failed to get profile data!",
        showConfirmButton: false,
        timer: 1500,
      });
      console.error(error);
      throw error;
    }
  },

  addProfile: async (profile) => {
    try {
      const docRef = await addDoc(collection(db, "profiles"), profile);
      return docRef;
    } catch (e) {
      console.error("Error adding document: ", e);
      throw e;
    }
  },

  deleteProfile: async (id) => {
    try {
      const profileRef = doc(db, "profiles", id);
      await deleteDoc(profileRef);
      return "Successfully deleted profiles!";
    } catch (e) {
      console.error("Error deleting document: ", e);
      throw e;
    }
  },
};
