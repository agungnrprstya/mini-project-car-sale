import { collection, getDocs, addDoc, query, where } from "firebase/firestore";
import { db } from "../configs/firebase";
import { message } from "antd";

export const APIInvoices = {
  getInvoices: async () => {
    try {
      const result = await getDocs(collection(db, "invoices"));
      const invoices = result.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      console.log(invoices);
      return invoices;
    } catch (error) {
      message.error("login failed. your email or password is wrong!");
      console.error(error);
    }
  },

  getInvoiceByUid: async (uid) => {
    try {
      const invoicesRef = collection(db, "invoices");
      const q = query(invoicesRef, where("uid", "==", uid));
      const querySnapshot = await getDocs(q);
      const invoices = [];
      querySnapshot.forEach((doc) => {
        invoices.push(doc.data());
      });
      return invoices;
    } catch (error) {
      message.error("Gagal mengambil data faktur!");
      console.error(error);
    }
  },

  addInvoice: async (invoice) => {
    try {
      const docRef = await addDoc(collection(db, "invoices"), invoice);
      console.log("Document written with ID: ", docRef.id);
      return docRef;
    } catch (e) {
      console.error("Error adding document: ", e);
      throw new Error(e);
    }
  },
};
