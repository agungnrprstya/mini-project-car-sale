import { collection, getDocs, addDoc, doc, deleteDoc, query, where } from "firebase/firestore";
import { db } from "../configs/firebase";
import Swal from "sweetalert2";

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
      Swal.fire({
        icon: "error",
        title: "Failed to get invoice data!",
        showConfirmButton: false,
        timer: 1500,
      });
      console.error(error);
      throw new Error(error);
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
      Swal.fire({
        icon: "error",
        title: "Failed to get invoice data!",
        showConfirmButton: false,
        timer: 1500,
      });
      console.error(error);
      throw new Error(error);
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

  deleteInvoice: async (id) => {
    try {
      console.log(id);
      const invoiceRef = doc(db, "invoices", id);
      await deleteDoc(invoiceRef);
      return "Successfully deleted invoices!";
    } catch (e) {
      console.error("Error deleting document: ", e);
      throw new Error(e);
    }
  },
};
