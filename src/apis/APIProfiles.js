import { collection, getDocs, addDoc, query, where } from "firebase/firestore";
import { db } from "../configs/firebase";
import { message } from "antd";

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
      message.error("login failed. your email or password is wrong!");
      console.error(error);
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
      message.error("Gagal mengambil data faktur!");
      console.error(error);
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
};
