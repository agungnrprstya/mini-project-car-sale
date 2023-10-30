import { collection, doc, getDocs, getDoc, addDoc, deleteDoc, updateDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { db, storage } from "../configs/firebase";
import Swal from "sweetalert2";

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
      throw new Error(error);
    }
  },

  getProductById: async (id) => {
    try {
      const result = await getDoc(doc(db, "products", id));
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
      throw new Error(error);
    }
  },

  addProduct: async (product) => {
    try {
      // Get the file name from the product.carImage property
      const fileName = product.carImage.name;

      // Upload the image to Firebase Storage
      const imageRef = ref(storage, `carImage/${fileName}`);
      const uploadTask = uploadBytes(imageRef, product.carImage);

      await uploadTask;

      const downloadURL = await getDownloadURL(imageRef);

      // Update the product object with the download URL
      product.carImage = downloadURL;

      // Add the product data to Firestore
      const docRef = await addDoc(collection(db, "products"), product);
      console.log("Document written with ID: ", docRef.id);
      return docRef;
    } catch (e) {
      console.error("Error adding document: ", e);
      throw new Error(e);
    }
  },

  deleteProduct: async (id) => {
    try {
      console.log(id);
      const productRef = doc(db, "products", id);
      await deleteDoc(productRef);
      return "Successfully deleted product!";
    } catch (e) {
      console.error("Error deleting document: ", e);
      throw new Error(e);
    }
  },

  editProduct: async (id, product) => {
    try {
      const productRef = doc(db, "products", id);

      // Get the file name from the new image
      const fileName = product.carImage.name;

      // Upload the new image to Firebase Storage
      const imageRef = ref(storage, `carImage/${fileName}`);
      const uploadTask = uploadBytes(imageRef, product.carImage);

      await uploadTask;

      const downloadURL = await getDownloadURL(imageRef);

      // Update the product object with the new download URL
      product.carImage = downloadURL;

      // Remove the carImage property from the product to prevent overwriting the image
      const { ...updatedProduct } = product;

      await updateDoc(productRef, updatedProduct);

      return "Successfully updated product!";
    } catch (e) {
      console.error("Error updating document: ", e);
      throw new Error(e);
    }
  },
};
