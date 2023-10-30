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
      throw new Error(error);
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
      console.log("Console log profiles: ", profiles);
      return profiles;
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Failed to get profile data!",
        showConfirmButton: false,
        timer: 1500,
      });
      console.error(error);
      throw new Error(error);
    }
  },

  addProfile: async (profile) => {
    try {
      const docRef = await addDoc(collection(db, "profiles"), profile);
      console.log("Document written with ID: ", docRef.id);
      return docRef;
    } catch (e) {
      console.error("Error adding document: ", e);
      throw new Error(e);
    }
  },

  deleteProfile: async (id) => {
    try {
      console.log(id);
      const profileRef = doc(db, "profiles", id);
      await deleteDoc(profileRef);
      return "Successfully deleted profiles!";
    } catch (e) {
      console.error("Error deleting document: ", e);
      throw new Error(e);
    }
  },
};
