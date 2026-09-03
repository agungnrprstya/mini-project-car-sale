import { collection, getDocs, addDoc, doc, deleteDoc, query, where, serverTimestamp } from "firebase/firestore";
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
      return invoices;
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Failed to get invoice data!",
        showConfirmButton: false,
        timer: 1500,
      });
      console.error(error);
      throw error;
    }
  },

  getInvoiceByUid: async (uid) => {
    try {
      const invoicesRef = collection(db, "invoices");
      const q = query(invoicesRef, where("uid", "==", uid));
      const querySnapshot = await getDocs(q);
      const invoices = [];
      querySnapshot.forEach((doc) => {
        invoices.push({
          ...doc.data(),
          id: doc.id,
        });
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
      throw error;
    }
  },

  addInvoice: async (invoice) => {
    try {
const docRef = await addDoc(collection(db, "invoices"), { ...invoice, createdAt: serverTimestamp() });
      return docRef;
    } catch (e) {
      console.error("Error adding document: ", e);
      throw e;
    }
  },

  deleteInvoice: async (id) => {
    try {
      const invoiceRef = doc(db, "invoices", id);
      await deleteDoc(invoiceRef);
      return "Successfully deleted invoices!";
    } catch (e) {
      console.error("Error deleting document: ", e);
      throw e;
    }
  },
};
