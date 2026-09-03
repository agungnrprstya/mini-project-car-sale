import { collection, doc, getDocs, getDoc, addDoc, deleteDoc, updateDoc } from "firebase/firestore";
import { db } from "../configs/firebase";
import Swal from "sweetalert2";
import { uploadImageToCloudinary } from "../utils/cloudinary";

export const APIProducts = {
  getProducts: async () => {
    try {
      const result = await getDocs(collection(db, "products"));
      const products = result.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      return products;
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Failed to get product data!",
        showConfirmButton: false,
        timer: 1500,
      });
      console.error(error);
      throw error;
    }
  },

  getProductById: async (id) => {
    try {
      const result = await getDoc(doc(db, "products", id));
      if (!result.exists()) {
        throw new Error("Product not found");
      }
      const product = result.data();
      return product;
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Failed to get product data!",
        showConfirmButton: false,
        timer: 1500,
      });
      console.error(error);
      throw error;
    }
  },

  addProduct: async (product) => {
    try {
      // Upload the image to Cloudinary and store the resulting URL
      product.carImage = await uploadImageToCloudinary(product.carImage);

      // Add the product data to Firestore
      const docRef = await addDoc(collection(db, "products"), product);
      return docRef;
    } catch (e) {
      console.error("Error adding document: ", e);
      throw e;
    }
  },

  deleteProduct: async (id) => {
    try {
      const productRef = doc(db, "products", id);
      await deleteDoc(productRef);
      return "Successfully deleted product!";
    } catch (e) {
      console.error("Error deleting document: ", e);
      throw e;
    }
  },

  editProduct: async (id, product) => {
    try {
      const productRef = doc(db, "products", id);

      // Only upload when the admin picked a new file. If carImage is still
      // the existing URL string, keep it untouched so editing other fields
      // does not blank out or re-upload the image.
      if (product.carImage instanceof File || product.carImage instanceof Blob) {
        product.carImage = await uploadImageToCloudinary(product.carImage);
      }

      await updateDoc(productRef, product);

      return "Successfully updated product!";
    } catch (e) {
      console.error("Error updating document: ", e);
      throw e;
    }
  },
};
